import { NextRequest } from "next/server";
import { User } from "@prisma/client";

import {
  deleteAccessToken,
  findAccessTokenByToken,
} from "@/lib/dto/access-token";
import { logger } from "@/lib/logger";

export interface AccessTokenValidationResult {
  success: true;
  user: User;
  scopes: string[];
  tokenRecord: {
    id: string;
    token: string;
    userId: string;
    applicationId: string;
    authorizationId: string;
  };
}

export interface AccessTokenValidationError {
  success: false;
  error: {
    code: string;
    message: string;
    httpStatus: number;
  };
}

export type AccessTokenValidation =
  | AccessTokenValidationResult
  | AccessTokenValidationError;

export const AUTH_ERRORS = {
  MISSING_HEADER: {
    code: "invalid_request",
    message: "Missing Authorization header",
    httpStatus: 400,
  },
  INVALID_FORMAT: {
    code: "invalid_request",
    message: 'Invalid Authorization header format. Expected "Bearer <token>"',
    httpStatus: 400,
  },
  EMPTY_TOKEN: {
    code: "invalid_token",
    message: "Empty access token",
    httpStatus: 401,
  },
  TOKEN_NOT_FOUND: {
    code: "invalid_token",
    message: "Invalid access token",
    httpStatus: 401,
  },
  TOKEN_EXPIRED: {
    code: "invalid_token",
    message: "Access token expired",
    httpStatus: 401,
  },
  APPLICATION_INACTIVE: {
    code: "invalid_token",
    message: "Associated application is not active",
    httpStatus: 401,
  },
  INSUFFICIENT_SCOPE: {
    code: "insufficient_scope",
    message: "Insufficient scope for this resource",
    httpStatus: 403,
  },
} as const;

/**
 * 统一的 AccessToken 验证函数
 * 从 NextRequest 中提取并验证 Bearer token
 */
export async function validateAccessToken(
  request: NextRequest,
): Promise<AccessTokenValidation> {
  logger.debug("Starting access token validation");

  // 1. 提取 Authorization header
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    logger.warn("No Authorization header provided");
    return {
      success: false,
      error: AUTH_ERRORS.MISSING_HEADER,
    };
  }

  // 2. 验证 Bearer token 格式
  if (!authHeader.startsWith("Bearer ")) {
    logger.warn("Invalid Authorization header format");
    return {
      success: false,
      error: AUTH_ERRORS.INVALID_FORMAT,
    };
  }

  const accessToken = authHeader.substring(7); // Remove "Bearer " prefix
  logger.debug("Extracted access token");

  if (!accessToken) {
    logger.warn("Empty access token");
    return {
      success: false,
      error: AUTH_ERRORS.EMPTY_TOKEN,
    };
  }

  // 3. 查找并验证 access token
  const tokenRecord = await findAccessTokenByToken(accessToken, false);

  if (!tokenRecord) {
    logger.warn("Access token not found in database");
    return {
      success: false,
      error: AUTH_ERRORS.TOKEN_NOT_FOUND,
    };
  }

  // 4. 检查 token 是否过期
  if (tokenRecord.expiresAt < new Date()) {
    logger.info("Access token has expired, cleaning up");
    // 清理过期 token
    await deleteAccessToken(accessToken);
    return {
      success: false,
      error: AUTH_ERRORS.TOKEN_EXPIRED,
    };
  }

  // 5. 检查关联的应用是否活跃
  if (!tokenRecord.application.isActived) {
    logger.warn("Associated application is not active");
    return {
      success: false,
      error: AUTH_ERRORS.APPLICATION_INACTIVE,
    };
  }

  logger.debug("Token validation successful", {
    userId: tokenRecord.userId,
    scopes: tokenRecord.scopes,
  });

  return {
    success: true,
    user: tokenRecord.user,
    scopes: tokenRecord.scopes,
    tokenRecord: {
      id: tokenRecord.id,
      token: tokenRecord.token,
      userId: tokenRecord.userId,
      applicationId: tokenRecord.applicationId,
      authorizationId: tokenRecord.authorizationId,
    },
  };
}

/**
 * 检查 token 是否具有所需的权限范围
 */
export function hasRequiredScopes(
  tokenScopes: string[],
  requiredScopes: string[],
): boolean {
  // 检查 token 是否至少拥有其中一个所需权限
  return requiredScopes.some((scope) => tokenScopes.includes(scope));
}

/**
 * 便捷函数：验证 token 并检查权限
 */
export async function validateAccessTokenWithScopes(
  request: NextRequest,
  requiredScopes: string[],
): Promise<AccessTokenValidation> {
  const validation = await validateAccessToken(request);

  if (!validation.success) {
    return validation;
  }

  // 检查权限
  if (!hasRequiredScopes(validation.scopes, requiredScopes)) {
    logger.warn("Insufficient scope for access", {
      tokenScopes: validation.scopes,
      requiredScopes,
    });
    return {
      success: false,
      error: AUTH_ERRORS.INSUFFICIENT_SCOPE,
    };
  }

  return validation;
}
