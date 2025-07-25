import { NextRequest } from "next/server";

import { logger } from "@/lib/logger";
import { validateAccessTokenWithScopes } from "@/lib/oauth/auth";
import { buildUserInfoResponse } from "@/lib/oauth/userinfo";

export async function GET(request: NextRequest) {
  try {
    logger.debug("Userinfo endpoint request started", {
      url: request.url,
    });

    // 验证 access token 并检查权限
    const validation = await validateAccessTokenWithScopes(request, [
      "read:user",
    ]);

    if (!validation.success) {
      logger.warn("Token validation failed for userinfo", validation.error);
      return Response.json(
        {
          error: validation.error.code,
          error_description: validation.error.message,
        },
        {
          status: validation.error.httpStatus,
          headers: {
            "WWW-Authenticate": 'Bearer realm="userinfo"',
          },
        },
      );
    }

    const { user, scopes } = validation;

    // 构建用户信息响应
    const userInfoResponse = buildUserInfoResponse(user, scopes);

    logger.info("Userinfo request completed successfully");

    return Response.json(userInfoResponse, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    logger.error("Userinfo endpoint error", error);

    return Response.json(
      {
        error: "server_error",
        error_description: "Internal server error",
      },
      { status: 500 },
    );
  }
}

// Support POST method as well (some clients use POST)
export async function POST(request: NextRequest) {
  return GET(request);
}
