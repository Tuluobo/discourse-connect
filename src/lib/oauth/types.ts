// OAuth 2.0 Grant Types (RFC 6749)
export const GRANT_TYPES = {
  AUTHORIZATION_CODE: "authorization_code",
  REFRESH_TOKEN: "refresh_token"
} as const;
export type GrantType = (typeof GRANT_TYPES)[keyof typeof GRANT_TYPES];

// OAuth 2.0 Response Types (RFC 6749)
export const RESPONSE_TYPES = {
  CODE: "code",
} as const;
export type ResponseType = (typeof RESPONSE_TYPES)[keyof typeof RESPONSE_TYPES];

// PKCE Code Challenge Methods (RFC 7636)
export const CODE_CHALLENGE_METHODS = {
  S256: "S256",
} as const;
export type CodeChallengeMethod = (typeof CODE_CHALLENGE_METHODS)[keyof typeof CODE_CHALLENGE_METHODS];

// OAuth 2.0 Token Types (RFC 6749)
export const TOKEN_TYPES = {
  BEARER: "Bearer",
} as const;
export type TokenType = (typeof TOKEN_TYPES)[keyof typeof TOKEN_TYPES];

// OAuth 2.0 Scopes (RFC 6749)
export const SUPPORTED_SCOPES = {
  READ_USER: "read:user",
} as const;
export type SupportedScope = (typeof SUPPORTED_SCOPES)[keyof typeof SUPPORTED_SCOPES];
// Get all scope values as array
export const SCOPE_VALUES = Object.values(SUPPORTED_SCOPES);

// OAuth 2.0 Error Codes (RFC 6749)
export const OAUTH_ERRORS = {
  // Authorization endpoint errors
  INVALID_REQUEST: "invalid_request",
  UNAUTHORIZED_CLIENT: "unauthorized_client",
  ACCESS_DENIED: "access_denied",
  UNSUPPORTED_RESPONSE_TYPE: "unsupported_response_type",
  INVALID_SCOPE: "invalid_scope",
  SERVER_ERROR: "server_error",
  TEMPORARILY_UNAVAILABLE: "temporarily_unavailable",
  // Token endpoint errors
  INVALID_CLIENT: "invalid_client",
  INVALID_GRANT: "invalid_grant",
  UNSUPPORTED_GRANT_TYPE: "unsupported_grant_type",
} as const;
export type OAuthErrorCode = (typeof OAUTH_ERRORS)[keyof typeof OAUTH_ERRORS];

// Standard OAuth 2.0 Error Response (RFC 6749)
export interface OAuthError {
  error: string;
  error_description?: string;
  error_uri?: string;
  state?: string;
}

// Authorization Request Interface
export interface OAuthAuthorizationRequest {
  response_type: ResponseType;
  client_id: string;
  redirect_uri: string;
  scope?: string | null;
  state?: string | null;
  code_challenge?: string | null;
  code_challenge_method?: CodeChallengeMethod | null;
}

// Token Request Interface (RFC 6749)
export interface TokenRequest {
  grant_type: GrantType;
  client_id: string;
  client_secret?: string;
  // Authorization Code Grant specific
  code?: string | null;
  redirect_uri?: string | null;
  code_verifier?: string | null; // PKCE
  // Refresh Token Grant specific
  refresh_token?: string | null;
  scope?: string | null;
}

// Token Response Interface (RFC 6749)
export interface TokenResponse {
  access_token: string;
  token_type: TokenType;
  expires_in?: number | null;
  refresh_token?: string | null;
  scope?: string | null;
}

// Token Revocation Request (RFC 7009)
export interface RevokeRequest {
  token: string;
  token_type_hint?: "access_token" | "refresh_token" | null;
  client_id: string;
  client_secret?: string | null;
}

// UserInfo Response (OpenID Connect)
export interface UserInfoResponse {
  sub: string; // subject identifier (user ID)
  name?: string | null;
  preferred_username?: string;
  email?: string | null;
  email_verified?: boolean;
  picture?: string | null;
  profile?: string | null;
  website?: string | null;
  updated_at?: number | null;
}

// Validation Result Interfaces
export type Result<T> = T | OAuthError;

export interface AuthorizationValidationResult
  extends Result<OAuthAuthorizationRequest> {
  userId?: string;
  applicationId?: string;
  scopes?: string[];
}

export interface TokenValidationResult {
  valid: boolean;
  error?: OAuthError | null;
  userId?: string | null;
  applicationId?: string | null;
  authorizationId?: string | null;
  scopes?: string[] | null;
}

// Bearer Token Validation Result
export interface BearerTokenValidationResult extends Result {
  userId?: string;
  scopes?: string[];
  tokenId?: string;
}

// Input Validation Patterns (RFC compliant)
export const VALIDATION_PATTERNS = {
  CLIENT_ID: /^[a-zA-Z0-9_-]{1,100}$/,
  CLIENT_SECRET: /^[a-zA-Z0-9_\-~.]{8,128}$/,
  AUTHORIZATION_CODE: /^[a-zA-Z0-9_\-~.]{16,128}$/,
  ACCESS_TOKEN: /^[a-zA-Z0-9_\-~.]{16,255}$/,
  REFRESH_TOKEN: /^[a-zA-Z0-9_\-~.]{16,255}$/,
  CODE_VERIFIER: /^[a-zA-Z0-9_\-~.]{43,128}$/,
  CODE_CHALLENGE: /^[a-zA-Z0-9_-]{43,128}$/,
  STATE: /^[a-zA-Z0-9_\-~.]{1,128}$/,
  SCOPE_TOKEN: /^[a-zA-Z0-9_-]+$/,
  REDIRECT_URI: /^https?:\/\/[^\s<>"\\^`{|}]+$/,
} as const;

// Parameter Length Limits
export const PARAM_LIMITS = {
  CLIENT_ID: { min: 1, max: 100 },
  CLIENT_SECRET: { min: 8, max: 128 },
  AUTHORIZATION_CODE: { min: 16, max: 128 },
  ACCESS_TOKEN: { min: 16, max: 255 },
  REFRESH_TOKEN: { min: 16, max: 255 },
  CODE_VERIFIER: { min: 43, max: 128 },
  CODE_CHALLENGE: { min: 43, max: 128 },
  STATE: { min: 1, max: 128 },
  REDIRECT_URI: { min: 1, max: 2048 },
  SCOPE: { min: 1, max: 512 },
} as const;

// Client Types (RFC 6749)
export const CLIENT_TYPES = {
  PUBLIC: "public",
  CONFIDENTIAL: "confidential",
} as const;

export type ClientType = (typeof CLIENT_TYPES)[keyof typeof CLIENT_TYPES];

// Application/Client Configuration
export interface OAuthClient {
  id: string;
  clientId: string;
  clientSecret?: string; // Optional for public clients
  clientType: ClientType;
  redirectUris: string[];
  allowedScopes: SupportedScope[];
  requiresPkce: boolean;
  name: string;
  description?: string;
}

// Database Model Types
export interface AuthorizationCode {
  id: string;
  code: string;
  clientId: string;
  userId: string;
  redirectUri: string;
  scopes: string[];
  codeChallenge?: string;
  codeChallengeMethod?: CodeChallengeMethod;
  expiresAt: Date;
  used: boolean;
}

export interface AccessToken {
  id: string;
  token: string;
  clientId: string;
  userId: string;
  scopes: string[];
  expiresAt: Date;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
}

// Utility Types
export type ScopeString = string; // Space-separated scope values
export type Base64UrlString = string;
export type Timestamp = number; // Unix timestamp

// Request Context (for validation and processing)
export interface RequestContext {
  clientIp: string;
  userAgent: string;
  timestamp: Timestamp;
}
