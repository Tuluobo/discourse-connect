import { logger } from "../logger";
import {
  CODE_CHALLENGE_METHODS,
  GRANT_TYPES,
  OAUTH_ERRORS,
  PARAM_LIMITS,
  RESPONSE_TYPES,
  SCOPE_VALUES,
  VALIDATION_PATTERNS,
  type CodeChallengeMethod,
  type GrantType,
  type ResponseType,
  type SupportedScope,
  type ValidationResult,
} from "./types";

// Sanitization utilities
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // Remove control characters
    .substring(0, 1000); // Limit length
}

export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    // Only allow HTTP and HTTPS protocols
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Invalid protocol");
    }
    return parsedUrl.href;
  } catch {
    throw new Error("Invalid URL format");
  }
}

// Individual parameter validators
export function validateClientId(clientId: string): ValidationResult<string> {
  if (!clientId) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "client_id parameter is required",
      },
    };
  }

  const sanitized = sanitizeString(clientId);

  if (
    sanitized.length < PARAM_LIMITS.CLIENT_ID.min ||
    sanitized.length > PARAM_LIMITS.CLIENT_ID.max
  ) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: `client_id must be between ${PARAM_LIMITS.CLIENT_ID.min} and ${PARAM_LIMITS.CLIENT_ID.max} characters`,
      },
    };
  }

  if (!VALIDATION_PATTERNS.CLIENT_ID.test(sanitized)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description:
          "client_id contains invalid characters (allowed: a-z, A-Z, 0-9, _, -)",
      },
    };
  }

  return { valid: true, data: sanitized };
}

export function validateClientSecret(
  clientSecret: string,
): ValidationResult<string> {
  if (!clientSecret) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_CLIENT,
        error_description: "client_secret parameter is required",
      },
    };
  }

  const sanitized = sanitizeString(clientSecret);

  if (
    sanitized.length < PARAM_LIMITS.CLIENT_SECRET.min ||
    sanitized.length > PARAM_LIMITS.CLIENT_SECRET.max
  ) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_CLIENT,
        error_description: `client_secret must be between ${PARAM_LIMITS.CLIENT_SECRET.min} and ${PARAM_LIMITS.CLIENT_SECRET.max} characters`,
      },
    };
  }

  if (!VALIDATION_PATTERNS.CLIENT_SECRET.test(sanitized)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_CLIENT,
        error_description: "client_secret contains invalid characters",
      },
    };
  }

  return { valid: true, data: sanitized };
}

export function validateResponseType(
  responseType: string,
): ValidationResult<ResponseType> {
  if (!responseType) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "response_type parameter is required",
      },
    };
  }

  const sanitized = sanitizeString(responseType);

  if (!Object.values(RESPONSE_TYPES).includes(sanitized as ResponseType)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.UNSUPPORTED_RESPONSE_TYPE,
        error_description: `Unsupported response_type. Supported values: ${Object.values(RESPONSE_TYPES).join(", ")}`,
      },
    };
  }

  return { valid: true, data: sanitized as ResponseType };
}

export function validateGrantType(
  grantType: string,
): ValidationResult<GrantType> {
  if (!grantType) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "grant_type parameter is required",
      },
    };
  }

  const sanitized = sanitizeString(grantType);

  if (!Object.values(GRANT_TYPES).includes(sanitized as GrantType)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.UNSUPPORTED_GRANT_TYPE,
        error_description: `Unsupported grant_type. Supported values: ${Object.values(GRANT_TYPES).join(", ")}`,
      },
    };
  }

  return { valid: true, data: sanitized as GrantType };
}

export function validateRedirectUri(
  redirectUri: string,
): ValidationResult<string> {
  if (!redirectUri) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "redirect_uri parameter is required",
      },
    };
  }

  try {
    const sanitized = sanitizeUrl(redirectUri);

    if (sanitized.length > PARAM_LIMITS.REDIRECT_URI.max) {
      return {
        valid: false,
        error: {
          error: OAUTH_ERRORS.INVALID_REQUEST,
          error_description: `redirect_uri too long (max ${PARAM_LIMITS.REDIRECT_URI.max} characters)`,
        },
      };
    }

    if (!VALIDATION_PATTERNS.REDIRECT_URI.test(sanitized)) {
      return {
        valid: false,
        error: {
          error: OAUTH_ERRORS.INVALID_REQUEST,
          error_description: "redirect_uri must be a valid HTTP or HTTPS URL",
        },
      };
    }

    return { valid: true, data: sanitized };
  } catch (error) {
    logger.error(`error: ${error}`);
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "redirect_uri must be a valid URL",
      },
    };
  }
}

export function validateScope(scope: string): ValidationResult<string[]> {
  if (!scope) {
    // Empty scope is valid - will use default scope
    return { valid: true, data: [] };
  }

  const sanitized = sanitizeString(scope);

  if (sanitized.length > PARAM_LIMITS.SCOPE.max) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: `scope parameter too long (max ${PARAM_LIMITS.SCOPE.max} characters)`,
      },
    };
  }

  // Split and validate individual scope tokens
  const scopeTokens = sanitized
    .split(/\s+/)
    .filter((token) => token.length > 0);

  if (scopeTokens.length === 0) {
    return { valid: true, data: [] };
  }

  // Validate each scope token format
  for (const token of scopeTokens) {
    if (!VALIDATION_PATTERNS.SCOPE_TOKEN.test(token)) {
      return {
        valid: false,
        error: {
          error: OAUTH_ERRORS.INVALID_SCOPE,
          error_description: `Invalid scope token: ${token}. Scope tokens must contain only letters, numbers, underscore, and dash.`,
        },
      };
    }
  }

  // Check if all requested scopes are supported
  const unsupportedScopes = scopeTokens.filter(
    (token) => !SCOPE_VALUES.includes(token as SupportedScope),
  );

  if (unsupportedScopes.length > 0) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_SCOPE,
        error_description: `Unsupported scopes: ${unsupportedScopes.join(", ")}. Supported scopes: ${SCOPE_VALUES.join(", ")}`,
      },
    };
  }

  return { valid: true, data: scopeTokens };
}

export function validateState(state: string): ValidationResult<string> {
  if (!state) {
    // State is optional
    return { valid: true, data: "" };
  }

  const sanitized = sanitizeString(state);

  if (sanitized.length > PARAM_LIMITS.STATE.max) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: `state parameter too long (max ${PARAM_LIMITS.STATE.max} characters)`,
      },
    };
  }

  if (!VALIDATION_PATTERNS.STATE.test(sanitized)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "state parameter contains invalid characters",
      },
    };
  }

  return { valid: true, data: sanitized };
}

export function validateAuthorizationCode(
  code: string,
): ValidationResult<string> {
  if (!code) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "code parameter is required",
      },
    };
  }

  const sanitized = sanitizeString(code);

  if (
    sanitized.length < PARAM_LIMITS.AUTHORIZATION_CODE.min ||
    sanitized.length > PARAM_LIMITS.AUTHORIZATION_CODE.max
  ) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: "Invalid authorization code format",
      },
    };
  }

  if (!VALIDATION_PATTERNS.AUTHORIZATION_CODE.test(sanitized)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: "Invalid authorization code format",
      },
    };
  }

  return { valid: true, data: sanitized };
}

export function validateAccessToken(token: string): ValidationResult<string> {
  if (!token) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_TOKEN,
        error_description: "Access token is required",
      },
    };
  }

  const sanitized = sanitizeString(token);

  if (
    sanitized.length < PARAM_LIMITS.ACCESS_TOKEN.min ||
    sanitized.length > PARAM_LIMITS.ACCESS_TOKEN.max
  ) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_TOKEN,
        error_description: "Invalid access token format",
      },
    };
  }

  if (!VALIDATION_PATTERNS.ACCESS_TOKEN.test(sanitized)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_TOKEN,
        error_description: "Invalid access token format",
      },
    };
  }

  return { valid: true, data: sanitized };
}

export function validateRefreshToken(token: string): ValidationResult<string> {
  if (!token) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "refresh_token parameter is required",
      },
    };
  }

  const sanitized = sanitizeString(token);

  if (
    sanitized.length < PARAM_LIMITS.REFRESH_TOKEN.min ||
    sanitized.length > PARAM_LIMITS.REFRESH_TOKEN.max
  ) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: "Invalid refresh token format",
      },
    };
  }

  if (!VALIDATION_PATTERNS.REFRESH_TOKEN.test(sanitized)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_GRANT,
        error_description: "Invalid refresh token format",
      },
    };
  }

  return { valid: true, data: sanitized };
}

export function validateCodeVerifier(
  codeVerifier: string,
): ValidationResult<string> {
  if (!codeVerifier) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description:
          "code_verifier parameter is required when code_challenge was used",
      },
    };
  }

  const sanitized = sanitizeString(codeVerifier);

  if (
    sanitized.length < PARAM_LIMITS.CODE_VERIFIER.min ||
    sanitized.length > PARAM_LIMITS.CODE_VERIFIER.max
  ) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: `code_verifier must be between ${PARAM_LIMITS.CODE_VERIFIER.min} and ${PARAM_LIMITS.CODE_VERIFIER.max} characters (RFC 7636)`,
      },
    };
  }

  if (!VALIDATION_PATTERNS.CODE_VERIFIER.test(sanitized)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description:
          "code_verifier contains invalid characters (RFC 7636: unreserved characters only)",
      },
    };
  }

  return { valid: true, data: sanitized };
}

export function validateCodeChallenge(
  codeChallenge: string,
): ValidationResult<string> {
  if (!codeChallenge) {
    // code_challenge is optional
    return { valid: true, data: "" };
  }

  const sanitized = sanitizeString(codeChallenge);

  if (
    sanitized.length < PARAM_LIMITS.CODE_CHALLENGE.min ||
    sanitized.length > PARAM_LIMITS.CODE_CHALLENGE.max
  ) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: `code_challenge must be between ${PARAM_LIMITS.CODE_CHALLENGE.min} and ${PARAM_LIMITS.CODE_CHALLENGE.max} characters`,
      },
    };
  }

  if (!VALIDATION_PATTERNS.CODE_CHALLENGE.test(sanitized)) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description:
          "code_challenge contains invalid characters (base64url encoded string expected)",
      },
    };
  }

  return { valid: true, data: sanitized };
}

export function validateCodeChallengeMethod(
  method: string,
): ValidationResult<CodeChallengeMethod> {
  if (!method) {
    // Default to S256 if not specified (RFC 7636)
    return { valid: true, data: CODE_CHALLENGE_METHODS.S256 };
  }

  const sanitized = sanitizeString(method);

  if (
    !Object.values(CODE_CHALLENGE_METHODS).includes(
      sanitized as CodeChallengeMethod,
    )
  ) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: `Unsupported code_challenge_method. Supported values: ${Object.values(CODE_CHALLENGE_METHODS).join(", ")}`,
      },
    };
  }

  return { valid: true, data: sanitized as CodeChallengeMethod };
}

// Comprehensive validation functions for common request types
export interface AuthorizationRequestValidation {
  response_type: ResponseType;
  client_id: string;
  redirect_uri: string;
  scope: string[];
  state?: string;
  code_challenge?: string;
  code_challenge_method?: CodeChallengeMethod;
}

export function validateAuthorizationRequestParams(params: {
  response_type?: string;
  client_id?: string;
  redirect_uri?: string;
  scope?: string;
  state?: string;
  code_challenge?: string;
  code_challenge_method?: string;
}): ValidationResult<AuthorizationRequestValidation> {
  const errors: string[] = [];
  const validatedData: Partial<AuthorizationRequestValidation> = {};

  // Validate response_type
  const responseTypeResult = validateResponseType(params.response_type || "");
  if (!responseTypeResult.valid) {
    errors.push(
      responseTypeResult.error?.error_description || "Invalid response_type",
    );
  } else {
    validatedData.response_type = responseTypeResult.data;
  }

  // Validate client_id
  const clientIdResult = validateClientId(params.client_id || "");
  if (!clientIdResult.valid) {
    errors.push(clientIdResult.error?.error_description || "Invalid client_id");
  } else {
    validatedData.client_id = clientIdResult.data;
  }

  // Validate redirect_uri
  const redirectUriResult = validateRedirectUri(params.redirect_uri || "");
  if (!redirectUriResult.valid) {
    errors.push(
      redirectUriResult.error?.error_description || "Invalid redirect_uri",
    );
  } else {
    validatedData.redirect_uri = redirectUriResult.data;
  }

  // Validate scope
  const scopeResult = validateScope(params.scope || "");
  if (!scopeResult.valid) {
    errors.push(scopeResult.error?.error_description || "Invalid scope");
  } else {
    validatedData.scope = scopeResult.data;
  }

  // Validate state (optional)
  const stateResult = validateState(params.state || "");
  if (!stateResult.valid) {
    errors.push(stateResult.error?.error_description || "Invalid state");
  } else if (stateResult.data) {
    validatedData.state = stateResult.data;
  }

  // Validate PKCE parameters (optional)
  const codeChallengeResult = validateCodeChallenge(
    params.code_challenge || "",
  );
  if (!codeChallengeResult.valid) {
    errors.push(
      codeChallengeResult.error?.error_description || "Invalid code_challenge",
    );
  } else if (codeChallengeResult.data) {
    validatedData.code_challenge = codeChallengeResult.data;

    // If code_challenge is present, validate code_challenge_method
    const methodResult = validateCodeChallengeMethod(
      params.code_challenge_method || "",
    );
    if (!methodResult.valid) {
      errors.push(
        methodResult.error?.error_description ||
          "Invalid code_challenge_method",
      );
    } else {
      validatedData.code_challenge_method = methodResult.data;
    }
  }

  if (errors.length > 0) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: errors.join("; "),
      },
    };
  }

  return {
    valid: true,
    data: validatedData as AuthorizationRequestValidation,
  };
}
