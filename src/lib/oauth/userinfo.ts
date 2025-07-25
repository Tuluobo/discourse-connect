import { User } from "@prisma/client";

import { logger } from "@/lib/logger";

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

export function buildUserInfoResponse(
  user: User,
  scopes: string[],
): UserInfoResponse {
  logger.debug("Building userinfo response", { scopes });

  // Always include 'id' (subject identifier)
  const response: UserInfoResponse = {
    id: user.id,
  };

  // Only support 'read:user' scope for basic user info
  if (scopes.includes("read:user")) {
    response.preferred_username = user.username;
    response.name = user.name;
    if (user.avatarUrl) response.picture = user.avatarUrl;
    if (user.email) {
      response.email = user.email;
      // For now, assume email is verified (you may want to add email verification logic)
      response.email_verified = true;
    }
    response.updated_at = Math.floor(new Date(user.updatedAt).getTime() / 1000);
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
