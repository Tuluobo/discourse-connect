import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

import {
  OAUTH_ERRORS,
  OAuthAuthorizationRequest,
  OAuthError,
  SUPPORTED_SCOPES,
  SupportedScope,
} from "./types";

export async function validateAuthorizationRequest(
  params: URLSearchParams,
): Promise<
  | { valid: true; request: OAuthAuthorizationRequest }
  | { valid: false; error: OAuthError }
> {
  // Extract parameters
  const response_type = params.get("response_type");
  const client_id = params.get("client_id");
  const redirect_uri = params.get("redirect_uri");
  const scope = params.get("scope");
  const state = params.get("state");
  const code_challenge = params.get("code_challenge");
  const code_challenge_method = params.get("code_challenge_method");

  // Validate required parameters
  if (!response_type) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "Missing response_type parameter",
        state,
      },
    };
  }

  if (!client_id) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "Missing client_id parameter",
        state,
      },
    };
  }

  if (!redirect_uri) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "Missing redirect_uri parameter",
        state,
      },
    };
  }

  // Validate response_type
  if (response_type !== "code") {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.UNSUPPORTED_RESPONSE_TYPE,
        error_description: "Only authorization code flow is supported",
        state,
      },
    };
  }

  // Validate client application
  const application = await prisma.application.findUnique({
    where: { clientId: client_id },
  });

  if (!application) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.UNAUTHORIZED_CLIENT,
        error_description: "Invalid client_id",
        state,
      },
    };
  }

  if (!application.isActived) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.UNAUTHORIZED_CLIENT,
        error_description: "Client application is not active",
        state,
      },
    };
  }

  // Validate redirect_uri
  logger.debug("Validating redirect_uri", {
    redirect_uri,
    stored_count: application.redirectUris.length,
  });

  // Enhanced redirect_uri validation with URL normalization
  let isValidRedirectUri = false;

  // First try exact string match
  if (application.redirectUris.includes(redirect_uri)) {
    isValidRedirectUri = true;
  } else {
    // Try URL normalization for comparison
    try {
      const normalizedRedirectUri = new URL(redirect_uri).href;
      const normalizedStoredUris = application.redirectUris.map((uri) => {
        try {
          return new URL(uri).href;
        } catch (e) {
          logger.debug("URL normalization failed for redirect_uri", {
            uri,
            error: e,
          });
          return uri; // Keep original if normalization fails
        }
      });

      if (normalizedStoredUris.includes(normalizedRedirectUri)) {
        isValidRedirectUri = true;
      }
    } catch (e) {
      logger.debug("URL normalization failed for redirect_uri", {
        redirect_uri,
        error: e,
      });
    }
  }

  if (!isValidRedirectUri) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: `Invalid redirect_uri: ${redirect_uri}. Allowed URIs: ${application.redirectUris.join(", ")}`,
        state,
      },
    };
  }

  // Validate scope
  if (scope) {
    const requestedScopes = scope.split(" ");
    const invalidScopes = requestedScopes.filter(
      (s) => !SUPPORTED_SCOPES.includes(s as SupportedScope),
    );

    if (invalidScopes.length > 0) {
      return {
        valid: false,
        error: {
          error: OAUTH_ERRORS.INVALID_SCOPE,
          error_description: `Unsupported scopes: ${invalidScopes.join(", ")}`,
          state,
        },
      };
    }
  }

  // Validate PKCE parameters
  if (
    code_challenge &&
    code_challenge_method &&
    code_challenge_method !== "S256"
  ) {
    return {
      valid: false,
      error: {
        error: OAUTH_ERRORS.INVALID_REQUEST,
        error_description: "Only S256 code_challenge_method is supported",
        state,
      },
    };
  }

  return {
    valid: true,
    request: {
      response_type,
      client_id,
      redirect_uri,
      scope,
      state,
      code_challenge,
      code_challenge_method,
    },
  };
}
