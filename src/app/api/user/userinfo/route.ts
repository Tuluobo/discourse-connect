import { NextRequest } from "next/server";

import { logger } from "@/lib/logger";
import {
  buildUserInfoResponse,
  checkScopeAccess,
  USERINFO_ERRORS,
  validateBearerToken,
} from "@/lib/oauth/userinfo";
import { prisma } from "@/lib/prisma";
import { SCOPE_VALUES } from "@/lib/oauth/types";

export async function GET(request: NextRequest) {
  logger.debug("Userinfo endpoint request started", {
    url: request.url,
  });

  try {
    // Validate Bearer token
    const authHeader = request.headers.get("authorization");
    const tokenValidation = await validateBearerToken(authHeader);

    if (!tokenValidation.valid) {
      logger.warn(
        "Token validation failed for userinfo",
        tokenValidation.error,
      );
      const statusCode =
        tokenValidation.error?.error === USERINFO_ERRORS.INVALID_TOKEN
          ? 401
          : 400;
      return Response.json(tokenValidation.error, {
        status: statusCode,
        headers: {
          "WWW-Authenticate": 'Bearer realm="userinfo"',
        },
      });
    }

    const { userId, scopes } = tokenValidation;

    if (!checkScopeAccess(scopes!, SCOPE_VALUES)) {
      logger.warn("Insufficient scope for userinfo access", { scopes });
      return Response.json(
        {
          error: USERINFO_ERRORS.INSUFFICIENT_SCOPE,
          error_description:
            "Token does not have required scope for userinfo access",
        },
        {
          status: 403,
          headers: {
            "WWW-Authenticate": `Bearer realm="userinfo", error="insufficient_scope"`,
          },
        },
      );
    }

    // Get full user information
    const user = await prisma.user.findUnique({
      where: { id: userId! },
    });

    if (!user) {
      logger.error("User not found in database", { userId });
      return Response.json(
        {
          error: USERINFO_ERRORS.INVALID_TOKEN,
          error_description: "User associated with token not found",
        },
        {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Bearer realm="userinfo"',
          },
        },
      );
    }

    // Build response based on scopes
    const userInfoResponse = buildUserInfoResponse(user, scopes!);

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
