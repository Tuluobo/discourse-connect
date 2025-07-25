import { randomBytes } from "crypto";

import {
  CreateAccessTokenData,
  createAccessToken as createAccessTokenRecord,
  findAccessTokenByRefreshToken,
} from "@/lib/dto/access-token";
import { deleteCode, findCodeByCode } from "@/lib/dto/code";
import { logger } from "@/lib/logger";

export interface TokenRequest {
  grant_type: string;
  code?: string;
  redirect_uri?: string;
  client_id: string;
  client_secret?: string;
  code_verifier?: string;
  refresh_token?: string;
  scope?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

export interface TokenError {
  error: string;
  error_description?: string;
}

export const TOKEN_ERRORS = {
  INVALID_REQUEST: "invalid_request",
  INVALID_CLIENT: "invalid_client",
  INVALID_GRANT: "invalid_grant",
  UNAUTHORIZED_CLIENT: "unauthorized_client",
  UNSUPPORTED_GRANT_TYPE: "unsupported_grant_type",
  INVALID_SCOPE: "invalid_scope",
} as const;

export function generateAccessToken(): string {
  return randomBytes(32).toString("base64url");
}

export function generateRefreshToken(): string {
  return randomBytes(32).toString("base64url");
}

export async function validateAuthorizationCodeGrant(
  request: TokenRequest,
): Promise<
  | { valid: true; userId: string; applicationId: string; scopes: string[] }
  | { valid: false; error: TokenError }
> {
  const { code, redirect_uri, client_id, client_secret, code_verifier } =
    request;

  logger.debug("Validating authorization code grant", {
    has_code_verifier: !!code_verifier,
  });

  if (!code) {
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_REQUEST,
        error_description: "Missing authorization code",
      },
    };
  }

  if (!redirect_uri) {
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_REQUEST,
        error_description: "Missing redirect_uri",
      },
    };
  }

  // Find and validate the authorization code
  const codeRecord = await findCodeByCode(code);

  if (!codeRecord) {
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_GRANT,
        error_description: "Invalid authorization code",
      },
    };
  }

  logger.debug("Code record found", {
    hasCodeChallenge: !!codeRecord.challenge,
    codeChallengeMethod: codeRecord.challengeMethod,
  });

  // Check if code has expired
  if (codeRecord.expiresAt < new Date()) {
    await deleteCode(code);
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_GRANT,
        error_description: "Authorization code expired",
      },
    };
  }

  // Validate client_id
  if (codeRecord.application.clientId !== client_id) {
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_CLIENT,
        error_description: "Invalid client_id",
      },
    };
  }

  // RFC 7636: PKCE validation
  if (codeRecord.challenge) {
    logger.debug("PKCE validation required");

    // If code_challenge was provided in auth request, code_verifier is required
    if (!code_verifier) {
      return {
        valid: false,
        error: {
          error: TOKEN_ERRORS.INVALID_REQUEST,
          error_description: "Missing code_verifier for PKCE",
        },
      };
    }

    // Validate code_verifier against code_challenge
    const isValidPKCE = await validateCodeVerifier(
      code_verifier,
      codeRecord.challenge,
      codeRecord.challengeMethod || "S256",
    );

    if (!isValidPKCE) {
      return {
        valid: false,
        error: {
          error: TOKEN_ERRORS.INVALID_GRANT,
          error_description: "Invalid code_verifier",
        },
      };
    }

    logger.debug("PKCE validation successful");
  } else if (code_verifier) {
    // Code verifier provided but no challenge was stored - this is suspicious
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_REQUEST,
        error_description: "Unexpected code_verifier",
      },
    };
  }

  // For confidential clients (those with client_secret), validate it
  // Note: PKCE can be used by both public and confidential clients
  if (codeRecord.application.clientSecret) {
    if (!client_secret) {
      return {
        valid: false,
        error: {
          error: TOKEN_ERRORS.INVALID_CLIENT,
          error_description: "Missing client_secret for confidential client",
        },
      };
    }

    if (codeRecord.application.clientSecret !== client_secret) {
      return {
        valid: false,
        error: {
          error: TOKEN_ERRORS.INVALID_CLIENT,
          error_description: "Invalid client_secret",
        },
      };
    }
  }

  // Validate redirect_uri matches exactly the one used in authorization request (RFC 6749 §4.1.3)
  if (codeRecord.redirectUri !== redirect_uri) {
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_GRANT,
        error_description: `Invalid redirect_uri. Expected: ${codeRecord.redirectUri}, Got: ${redirect_uri}`,
      },
    };
  }

  // Delete the code after successful validation (one-time use)
  await deleteCode(code);

  // Use the scopes from authorization code
  const scopes = codeRecord.scopes;

  return {
    valid: true,
    userId: codeRecord.userId,
    applicationId: codeRecord.applicationId,
    scopes,
  };
}

// RFC 7636: Code verifier validation function
async function validateCodeVerifier(
  codeVerifier: string,
  codeChallenge: string,
  codeChallengeMethod: string,
): Promise<boolean> {
  try {
    logger.debug("Validating PKCE code verifier", {
      codeChallengeMethod,
      verifier_length: codeVerifier.length,
    });

    // RFC 7636: code_verifier must be between 43 and 128 characters
    if (codeVerifier.length < 43 || codeVerifier.length > 128) {
      logger.warn("Invalid code_verifier length", {
        length: codeVerifier.length,
      });
      return false;
    }

    // RFC 7636: code_verifier must match [A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~"
    const codeVerifierRegex = /^[A-Za-z0-9\-._~]+$/;
    if (!codeVerifierRegex.test(codeVerifier)) {
      logger.warn("Invalid code_verifier format");
      return false;
    }

    let computedChallenge: string;

    if (codeChallengeMethod === "S256") {
      // SHA256 hash and base64url encode
      const crypto = await import("crypto");
      const hash = crypto.createHash("sha256").update(codeVerifier).digest();
      computedChallenge = hash.toString("base64url");
    } else if (codeChallengeMethod === "plain") {
      // Plain text (not recommended but allowed by spec)
      computedChallenge = codeVerifier;
    } else {
      logger.warn("Unsupported code_challenge_method", { codeChallengeMethod });
      return false;
    }

    const isValid = computedChallenge === codeChallenge;
    logger.debug("PKCE validation result", { isValid });

    return isValid;
  } catch (error) {
    logger.error("Error validating code verifier", error);
    return false;
  }
}

export async function validateRefreshTokenGrant(request: TokenRequest): Promise<
  | {
      valid: true;
      userId: string;
      applicationId: string;
      authorizationId: string;
      scopes: string[];
    }
  | { valid: false; error: TokenError }
> {
  const { refresh_token, client_id, client_secret, scope } = request;

  if (!refresh_token) {
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_REQUEST,
        error_description: "Missing refresh_token",
      },
    };
  }

  // Find the refresh token
  const tokenRecord = await findAccessTokenByRefreshToken(refresh_token, false);

  if (!tokenRecord) {
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_GRANT,
        error_description: "Invalid refresh_token",
      },
    };
  }

  // Check if refresh token has expired
  if (
    tokenRecord.refreshTokenExpiresAt &&
    tokenRecord.refreshTokenExpiresAt < new Date()
  ) {
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_GRANT,
        error_description: "Refresh token expired",
      },
    };
  }

  // Validate client_id
  if (tokenRecord.application.clientId !== client_id) {
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_CLIENT,
        error_description: "Invalid client_id",
      },
    };
  }

  // Validate client_secret for confidential clients
  if (
    tokenRecord.application.clientSecret &&
    tokenRecord.application.clientSecret !== client_secret
  ) {
    return {
      valid: false,
      error: {
        error: TOKEN_ERRORS.INVALID_CLIENT,
        error_description: "Invalid client_secret",
      },
    };
  }

  // Validate scope (if provided, must be subset of original scopes)
  let validatedScopes = tokenRecord.scopes;
  if (scope) {
    const requestedScopes = scope.split(" ");
    const invalidScopes = requestedScopes.filter(
      (s) => !tokenRecord.scopes.includes(s),
    );

    if (invalidScopes.length > 0) {
      return {
        valid: false,
        error: {
          error: TOKEN_ERRORS.INVALID_SCOPE,
          error_description: `Requested scopes exceed original grant: ${invalidScopes.join(", ")}`,
        },
      };
    }
    validatedScopes = requestedScopes;
  }

  return {
    valid: true,
    userId: tokenRecord.userId,
    applicationId: tokenRecord.applicationId,
    authorizationId: tokenRecord.authorizationId,
    scopes: validatedScopes,
  };
}

export async function createAccessToken(
  userId: string,
  applicationId: string,
  authorizationId: string,
  scopes: string[],
  includeRefreshToken: boolean = true,
): Promise<TokenResponse> {
  const accessToken = generateAccessToken();
  const expiresIn = 3600; // 1 hour
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  let refreshToken: string | undefined;
  let refreshTokenExpiresAt: Date | undefined;

  if (includeRefreshToken) {
    refreshToken = generateRefreshToken();
    refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  }

  // Store the access token in database
  const tokenData: CreateAccessTokenData = {
    token: accessToken,
    tokenType: "bearer",
    expiresAt,
    refreshToken,
    refreshTokenExpiresAt,
    scopes,
    isRevoked: false,
    userId,
    applicationId,
    authorizationId,
  };

  await createAccessTokenRecord(tokenData);

  const response: TokenResponse = {
    access_token: accessToken,
    token_type: "bearer",
    expires_in: expiresIn,
  };

  if (refreshToken) {
    response.refresh_token = refreshToken;
  }

  if (scopes.length > 0) {
    response.scope = scopes.join(" ");
  }

  return response;
}
