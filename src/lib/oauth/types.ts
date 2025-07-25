export interface OAuthAuthorizationRequest {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  scope?: string | null;
  state?: string | null;
  code_challenge?: string | null;
  code_challenge_method?: string | null;
}

export interface OAuthError {
  error: string;
  error_description?: string | null;
  error_uri?: string | null;
  state?: string | null;
}

export const OAUTH_ERRORS = {
  INVALID_REQUEST: "invalid_request",
  UNAUTHORIZED_CLIENT: "unauthorized_client",
  ACCESS_DENIED: "access_denied",
  UNSUPPORTED_RESPONSE_TYPE: "unsupported_response_type",
  INVALID_SCOPE: "invalid_scope",
  SERVER_ERROR: "server_error",
  TEMPORARILY_UNAVAILABLE: "temporarily_unavailable",
} as const;

export const SUPPORTED_SCOPES = ["read:user"] as const;
export type SupportedScope = (typeof SUPPORTED_SCOPES)[number];
