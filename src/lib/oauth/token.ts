import { randomBytes } from "crypto";

import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

import {
  OAUTH_ERRORS,
  SCOPE_VALUES,
  TOKEN_TYPES,
  type TokenRequest,
  type TokenResponse,
  type TokenValidationResult,
} from "./types";
import {
  validateAuthorizationCode,
  validateClientId,
  validateClientSecret,
  validateCodeVerifier,
  validateGrantType,
  validateRedirectUri,
  validateRefreshToken,
  validateScope,
} from "./validation-utils";

// Re-export types for backwards compatibility
export type {
  TokenRequest,
  TokenResponse,
  OAuthError as TokenError,
} from "./types";
export { OAUTH_ERRORS as TOKEN_ERRORS } from "./types";

export function generateAccessToken(): string {
  return randomBytes(32).toString("base64url");
}

export function generateRefreshToken(): string {
  return randomBytes(32).toString("base64url");
}

export async function validateAuthorizationCodeGrant(
  request: TokenRequest,
): Promise<TokenValidationResult> {
  logger.debug("Validating authorization code grant", {
    grant_type: request.grant_type,
    client_id: request.client_id,
    has_code: !!request.code,
    has_code_verifier: !!request.code_verifier,
  });

  // Validate grant_type
  const grantTypeResult = validateGrantType(request.grant_type);
  if (!grantTypeResult.valid) {
    return { valid: false, error: grantTypeResult.error };
  }

  // Validate client_id
  const clientIdResult = validateClientId(request.client_id);
  if (!clientIdResult.valid) {
    return { valid: false, error: clientIdResult.error };
  }

  // Validate authorization code
  const codeResult = validateAuthorizationCode(request.code || "");
  if (!codeResult.valid) {
    return { valid: false, error: codeResult.error };
  }

  // Validate redirect_uri
  const redirectUriResult = validateRedirectUri(request.redirect_uri || "");
  if (!redirectUriResult.valid) {
    return { valid: false, error: redirectUriResult.error };
  }

  // Validate client_secret if provided
  if (request.client_secret) {
    const clientSecretResult = validateClientSecret(request.client_secret);
    if (!clientSecretResult.valid) {
      return { valid: false, error: clientSecretResult.error };
    }
  }

  // Find and validate the authorization code
  const codeRecord = await prisma.code.findUnique({
    where: { code: codeResult.data },
    include: {
      application: true,
      user: true,
    },
  });

  if (!codeRecord) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: "Invalid authorization code",
      },
    };
  }

  logger.debug("Code record found", {
    hasCodeChallenge: !!codeRecord.codeChallenge,
    codeChallengeMethod: codeRecord.codeChallengeMethod,
  });

  // Check if code has expired
  if (codeRecord.expiresAt < new Date()) {
    await prisma.code.delete({ where: { code: codeResult.data } });
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: "Authorization code expired",
      },
    };
  }

  // Verify client_id matches
  if (codeRecord.application.clientId !== clientIdResult.data) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_CLIENT,
        error_description: "Invalid client_id",
      },
    };
  }

  // RFC 7636: PKCE validation
  if (codeRecord.codeChallenge) {
    logger.debug("PKCE validation required");

    // Validate code_verifier
    const codeVerifierResult = validateCodeVerifier(
      request.code_verifier || "",
    );
    if (!codeVerifierResult.valid) {
      return { valid: false, error: codeVerifierResult.error };
    }

    // Validate code_verifier against code_challenge
    const isValidPKCE = await validateCodeVerifierAgainstChallenge(
      codeVerifierResult.data!,
      codeRecord.codeChallenge,
      codeRecord.codeChallengeMethod || "S256",
    );

    if (!isValidPKCE) {
      return {
        valid: false,
        error: {
          error: OAUTH_ERRORS.INVALID_GRANT,
          error_description: "Invalid code_verifier",
        },
      };
    }

    logger.debug("PKCE validation successful");
  } else if (request.code_verifier) {
    // Code verifier provided but no challenge was stored - this is suspicious
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "Unexpected code_verifier",
      },
    };
  }

  // For confidential clients (those with client_secret), validate it
  if (codeRecord.application.clientSecret) {
    if (!request.client_secret) {
      return {
        valid: false,
        error: {
          error: OAUTH_ERRORS.INVALID_CLIENT,
          error_description: "Missing client_secret for confidential client",
        },
      };
    }

    if (codeRecord.application.clientSecret !== request.client_secret) {
      return {
        valid: false,
        error: {
          error: OAUTH_ERRORS.INVALID_CLIENT,
          error_description: "Invalid client_secret",
        },
      };
    }
  }

  // Validate redirect_uri matches the one used in authorization request
  if (!codeRecord.application.redirectUris.includes(redirectUriResult.data!)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: "Invalid redirect_uri",
      },
    };
  }

  // Delete the code after successful validation (one-time use)
  await prisma.code.delete({ where: { code: codeResult.data } });

  // Default scopes for backward compatibility
  const scopes = ["read", "email"]; // Use 'read' as default

  return {
    valid: true,
    userId: codeRecord.userId,
    applicationId: codeRecord.applicationId,
    scopes,
  };
}

// RFC 7636: Code verifier validation function
async function validateCodeVerifierAgainstChallenge(
  codeVerifier: string,
  codeChallenge: string,
  codeChallengeMethod: string,
): Promise<boolean> {
  try {
    logger.debug("Validating PKCE code verifier", {
      codeChallengeMethod,
      verifier_length: codeVerifier.length,
    });

    let computedChallenge: string;

    if (codeChallengeMethod === "S256") {
      // SHA256 hash and base64url encode
      const crypto = await import("crypto");
      const hash = crypto.createHash("sha256").update(codeVerifier).digest();
      computedChallenge = hash.toString("base64url");
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

export async function validateRefreshTokenGrant(
  request: TokenRequest,
): Promise<TokenValidationResult> {
  logger.debug("Validating refresh token grant", {
    client_id: request.client_id,
    has_refresh_token: !!request.refresh_token,
    has_scope: !!request.scope,
  });

  // Validate grant_type
  const grantTypeResult = validateGrantType(request.grant_type);
  if (!grantTypeResult.valid) {
    return { valid: false, error: grantTypeResult.error };
  }

  // Validate client_id
  const clientIdResult = validateClientId(request.client_id);
  if (!clientIdResult.valid) {
    return { valid: false, error: clientIdResult.error };
  }

  // Validate refresh_token
  const refreshTokenResult = validateRefreshToken(request.refresh_token || "");
  if (!refreshTokenResult.valid) {
    return { valid: false, error: refreshTokenResult.error };
  }

  // Validate client_secret if provided
  if (request.client_secret) {
    const clientSecretResult = validateClientSecret(request.client_secret);
    if (!clientSecretResult.valid) {
      return { valid: false, error: clientSecretResult.error };
    }
  }

  // Find the refresh token
  const tokenRecord = await prisma.accessToken.findUnique({
    where: { refreshToken: refreshTokenResult.data },
    include: {
      application: true,
      user: true,
      authorization: true,
    },
  });

  if (!tokenRecord) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_GRANT,
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
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: "Refresh token expired",
      },
    };
  }

  // Validate client_id
  if (tokenRecord.application.clientId !== clientIdResult.data) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_CLIENT,
        error_description: "Invalid client_id",
      },
    };
  }

  // Validate client_secret for confidential clients
  if (
    tokenRecord.application.clientSecret &&
    tokenRecord.application.clientSecret !== request.client_secret
  ) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_CLIENT,
        error_description: "Invalid client_secret",
      },
    };
  }

  // Validate scope (if provided, must be subset of original scopes)
  let validatedScopes = tokenRecord.scopes;
  if (request.scope) {
    const scopeResult = validateScope(request.scope);
    if (!scopeResult.valid) {
      return { valid: false, error: scopeResult.error };
    }

    const requestedScopes = scopeResult.data!;
    const invalidScopes = requestedScopes.filter(
      (s) => !tokenRecord.scopes.includes(s),
    );

    if (invalidScopes.length > 0) {
      return {
        valid: false,
        error: {
          error: OAUTH_ERRORS.INVALID_SCOPE,
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
  await prisma.accessToken.create({
    data: {
      token: accessToken,
      expiresAt,
      refreshToken,
      refreshTokenExpiresAt,
      scopes,
      userId,
      applicationId,
      authorizationId,
    },
  });

  const response: TokenResponse = {
    access_token: accessToken,
    token_type: TOKEN_TYPES.BEARER,
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
