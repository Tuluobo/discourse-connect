import {
  findAccessTokenByRefreshToken,
  findAccessTokenByToken,
  revokeAccessToken,
  revokeAccessTokensByUserAndApplication,
} from "@/lib/dto/access-token";
import { findApplicationByClientId } from "@/lib/dto/application";
import { logger } from "@/lib/logger";

export interface RevokeRequest {
  token: string;
  token_type_hint?: string;
  client_id: string;
  client_secret?: string;
}

export interface RevokeError {
  error: string;
  error_description?: string;
}

export const REVOKE_ERRORS = {
  INVALID_REQUEST: "invalid_request",
  INVALID_CLIENT: "invalid_client",
  INVALID_TOKEN: "invalid_token",
  UNSUPPORTED_TOKEN_TYPE: "unsupported_token_type",
} as const;

export async function validateRevokeRequest(
  token: string,
  tokenTypeHint: string | undefined,
  clientId: string,
  clientSecret: string | undefined,
): Promise<{ valid: true } | { valid: false; error: RevokeError }> {
  logger.debug("Starting token revocation validation", {
    tokenTypeHint,
    clientId,
    hasClientSecret: !!clientSecret,
  });

  if (!token) {
    return {
      valid: false,
      error: {
        error: REVOKE_ERRORS.INVALID_REQUEST,
        error_description: "Missing token parameter",
      },
    };
  }

  if (!clientId) {
    return {
      valid: false,
      error: {
        error: REVOKE_ERRORS.INVALID_REQUEST,
        error_description: "Missing client_id parameter",
      },
    };
  }

  // Validate token_type_hint if provided
  if (
    tokenTypeHint &&
    !["access_token", "refresh_token"].includes(tokenTypeHint)
  ) {
    return {
      valid: false,
      error: {
        error: REVOKE_ERRORS.UNSUPPORTED_TOKEN_TYPE,
        error_description:
          "Unsupported token_type_hint. Must be access_token or refresh_token",
      },
    };
  }

  logger.debug("Basic request validation passed");
  return { valid: true };
}

export async function revokeToken(
  token: string,
  tokenTypeHint: string | undefined,
  clientId: string,
  clientSecret: string | undefined,
): Promise<{ success: true } | { success: false; error: RevokeError }> {
  logger.debug("Starting token revocation process");

  try {
    // First, try to find the token as an access token
    let tokenRecord = await findAccessTokenByToken(token, true);
    let isRefreshToken = false;

    // If not found as access token, try as refresh token
    if (!tokenRecord) {
      tokenRecord = await findAccessTokenByRefreshToken(token, true);
      isRefreshToken = true;
    }

    // If token not found, RFC 7009 says to return success anyway
    // This prevents token scanning attacks
    if (!tokenRecord) {
      logger.info(
        "Token not found in database - returning success per RFC 7009",
      );
      return { success: true };
    }

    logger.debug("Token found", {
      isRefreshToken,
      applicationId: tokenRecord.applicationId,
      userId: tokenRecord.userId,
    });

    // Validate client_id matches the token's application
    if (tokenRecord.application.clientId !== clientId) {
      logger.warn("Client ID mismatch during token revocation");
      return {
        success: false,
        error: {
          error: REVOKE_ERRORS.INVALID_CLIENT,
          error_description: "Token does not belong to the specified client",
        },
      };
    }

    // Validate client_secret for confidential clients
    if (tokenRecord.application.clientSecret) {
      if (!clientSecret) {
        logger.warn("Missing client_secret for confidential client");
        return {
          success: false,
          error: {
            error: REVOKE_ERRORS.INVALID_CLIENT,
            error_description: "client_secret required for confidential client",
          },
        };
      }

      if (tokenRecord.application.clientSecret !== clientSecret) {
        logger.warn("Invalid client_secret during token revocation");
        return {
          success: false,
          error: {
            error: REVOKE_ERRORS.INVALID_CLIENT,
            error_description: "Invalid client_secret",
          },
        };
      }
    }

    // Revoke the token
    logger.debug("Revoking token from database");

    const revokedAt = new Date();
    await revokeAccessToken(tokenRecord.id, revokedAt);

    if (isRefreshToken) {
      logger.info("Refresh token and associated access token revoked");
    } else {
      logger.info("Access token and associated refresh token revoked");
    }

    logger.debug("Token revocation completed successfully");
    return { success: true };
  } catch (error) {
    logger.error("Error during token revocation", error);
    return {
      success: false,
      error: {
        error: "server_error",
        error_description: "Internal server error during token revocation",
      },
    };
  }
}

export async function revokeAllTokensForClient(
  clientId: string,
  userId: string,
  clientSecret?: string,
): Promise<
  { success: true; count: number } | { success: false; error: RevokeError }
> {
  logger.debug("Revoking all tokens for client", { clientId, userId });

  try {
    // Find the application
    const application = await findApplicationByClientId(clientId);

    if (!application) {
      return {
        success: false,
        error: {
          error: REVOKE_ERRORS.INVALID_CLIENT,
          error_description: "Invalid client_id",
        },
      };
    }

    // Validate client_secret if required
    if (application.clientSecret && application.clientSecret !== clientSecret) {
      return {
        success: false,
        error: {
          error: REVOKE_ERRORS.INVALID_CLIENT,
          error_description: "Invalid client_secret",
        },
      };
    }

    // Revoke all tokens for this user and application
    const count = await revokeAccessTokensByUserAndApplication(
      userId,
      application.id,
    );

    logger.info(`Revoked ${count} tokens for client ${clientId}`);
    return { success: true, count };
  } catch (error) {
    logger.error("Error revoking all tokens", error);
    return {
      success: false,
      error: {
        error: "server_error",
        error_description: "Internal server error",
      },
    };
  }
}
