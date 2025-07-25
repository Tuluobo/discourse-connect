import { User } from "@prisma/client";

import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

export interface UserInfoResponse {
  id: string;
  name?: string | null;
  preferred_username?: string | null;
  email?: string;
  email_verified?: boolean;
  picture?: string;
  // Additional standard claims
  profile?: string;
  website?: string;
  updated_at?: number;
}

export interface TokenValidationResult {
  valid: boolean;
  userId?: string;
  scopes?: string[];
  error?: {
    error: string;
    error_description?: string;
  };
}

export const USERINFO_ERRORS = {
  INVALID_REQUEST: "invalid_request",
  INVALID_TOKEN: "invalid_token",
  INSUFFICIENT_SCOPE: "insufficient_scope",
} as const;

export async function validateBearerToken(
  authHeader: string | null,
): Promise<TokenValidationResult> {
  logger.debug("Starting userinfo token validation");

  if (!authHeader) {
    logger.warn("No Authorization header provided");
    return {
      valid: false,
      error: {
        error: USERINFO_ERRORS.INVALID_REQUEST,
        error_description: "Missing Authorization header",
      },
    };
  }

  // Parse Bearer token
  if (!authHeader.startsWith("Bearer ")) {
    logger.warn("Invalid Authorization header format");
    return {
      valid: false,
      error: {
        error: USERINFO_ERRORS.INVALID_REQUEST,
        error_description:
          'Invalid Authorization header format. Expected "Bearer <token>"',
      },
    };
  }

  const accessToken = authHeader.substring(7); // Remove "Bearer " prefix
  logger.debug("Extracted access token");

  if (!accessToken) {
    logger.warn("Empty access token");
    return {
      valid: false,
      error: {
        error: USERINFO_ERRORS.INVALID_TOKEN,
        error_description: "Empty access token",
      },
    };
  }

  // Find the access token in database
  const tokenRecord = await prisma.accessToken.findUnique({
    where: { token: accessToken },
    include: {
      user: true,
      application: true,
      authorization: true,
    },
  });

  if (!tokenRecord) {
    logger.warn("Access token not found in database");
    return {
      valid: false,
      error: {
        error: USERINFO_ERRORS.INVALID_TOKEN,
        error_description: "Invalid access token",
      },
    };
  }

  // Check if token has expired
  if (tokenRecord.expiresAt < new Date()) {
    logger.info("Access token has expired, cleaning up");
    // Clean up expired token
    await prisma.accessToken.delete({ where: { token: accessToken } });
    return {
      valid: false,
      error: {
        error: USERINFO_ERRORS.INVALID_TOKEN,
        error_description: "Access token expired",
      },
    };
  }

  // Check if application is still active
  if (!tokenRecord.application.isActived) {
    logger.warn("Associated application is not active");
    return {
      valid: false,
      error: {
        error: USERINFO_ERRORS.INVALID_TOKEN,
        error_description: "Associated application is not active",
      },
    };
  }

  logger.debug("Token validation successful", {
    userId: tokenRecord.userId,
    scopes: tokenRecord.scopes,
  });

  return {
    valid: true,
    userId: tokenRecord.userId,
    scopes: tokenRecord.scopes,
  };
}

export function buildUserInfoResponse(
  user: User,
  scopes: string[],
): UserInfoResponse {
  logger.debug("Building userinfo response", { scopes });

  // Always include 'sub' (subject identifier)
  const response: UserInfoResponse = {
    id: user.id,
  };

  // Add claims based on requested scopes
  if (scopes.includes("profile")) {
    if (user.name) response.name = user.name;
    if (user.username) response.preferred_username = user.username;
    if (user.avatarUrl) response.picture = user.avatarUrl;

    // Add profile URL if available
    // response.profile = `https://yourapp.com/users/${user.username}`;

    // Add update timestamp
    response.updated_at = Math.floor(new Date(user.updatedAt).getTime() / 1000);
  }

  if (scopes.includes("email")) {
    if (user.email) {
      response.email = user.email;
      // For now, assume email is verified (you may want to add email verification logic)
      response.email_verified = true;
    }
  }

  // Custom scope: 'read' - include basic user info
  if (scopes.includes("read")) {
    response.preferred_username = user.username;
    response.name = user.name;
    if (user.avatarUrl) response.picture = user.avatarUrl;
  }

  logger.debug("Built userinfo response", { fields: Object.keys(response) });
  return response;
}

export function checkScopeAccess(
  scopes: string[],
  requiredScopes: string[],
): boolean {
  // Check if the token has at least one of the required scopes
  return requiredScopes.some((scope) => scopes.includes(scope));
}
