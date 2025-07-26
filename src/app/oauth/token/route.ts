import { NextRequest } from "next/server";

import { logger } from "@/lib/logger";
import {
  createAccessToken,
  TOKEN_ERRORS,
  TokenError,
  TokenRequest,
  validateAuthorizationCodeGrant,
  validateRefreshTokenGrant,
} from "@/lib/oauth/token";
import { GrantType } from "@/lib/oauth/types";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    logger.debug("Token endpoint request started");

    // Parse HTTP Basic Authentication from Authorization header
    let clientCredentials: { client_id?: string; client_secret?: string } = {};
    const authHeader = request.headers.get("authorization");

    if (authHeader && authHeader.startsWith("Basic ")) {
      try {
        const base64Credentials = authHeader.substring(6);
        const credentials = Buffer.from(base64Credentials, "base64").toString(
          "utf-8",
        );
        const [client_id, client_secret] = credentials.split(":");
        clientCredentials = { client_id, client_secret };
        logger.debug("Basic Auth credentials parsed");
      } catch (error) {
        logger.debug("Failed to parse Basic Auth header", error);
      }
    }

    // Try to parse both form data and JSON
    let tokenRequest: TokenRequest;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/x-www-form-urlencoded")) {
      logger.debug("Parsing as form data");
      const body = await request.formData();

      tokenRequest = {
        grant_type: body.get("grant_type") as GrantType,
        code: body.get("code") as string,
        redirect_uri: body.get("redirect_uri") as string,
        // Client credentials from Basic Auth take precedence over form data
        client_id:
          clientCredentials.client_id || (body.get("client_id") as string),
        client_secret:
          clientCredentials.client_secret ||
          (body.get("client_secret") as string),
        code_verifier: body.get("code_verifier") as string,
        refresh_token: body.get("refresh_token") as string,
        scope: body.get("scope") as string,
      };
    } else if (contentType.includes("application/json")) {
      logger.debug("Parsing as JSON");
      const jsonBody = await request.json();

      tokenRequest = {
        grant_type: jsonBody.grant_type,
        code: jsonBody.code || undefined,
        redirect_uri: jsonBody.redirect_uri || undefined,
        // Client credentials from Basic Auth take precedence over JSON body
        client_id: clientCredentials.client_id || jsonBody.client_id,
        client_secret:
          clientCredentials.client_secret ||
          jsonBody.client_secret ||
          undefined,
        code_verifier: jsonBody.code_verifier || undefined,
        refresh_token: jsonBody.refresh_token || undefined,
        scope: jsonBody.scope || undefined,
      };
    } else {
      logger.debug("Unknown content type, trying form data as fallback");
      const body = await request.formData();

      tokenRequest = {
        grant_type: body.get("grant_type") as GrantType,
        code: body.get("code") as string,
        redirect_uri: body.get("redirect_uri") as string,
        // Client credentials from Basic Auth take precedence over form data
        client_id:
          clientCredentials.client_id || (body.get("client_id") as string),
        client_secret:
          clientCredentials.client_secret ||
          (body.get("client_secret") as string),
        code_verifier: body.get("code_verifier") as string,
        refresh_token: body.get("refresh_token") as string,
        scope: body.get("scope") as string,
      };
    }

    logger.debug("Token request parsed successfully");

    // Validate required parameters
    if (!tokenRequest.grant_type) {
      const error = {
        error: TOKEN_ERRORS.INVALID_REQUEST,
        error_description: "Missing grant_type parameter",
      } as TokenError;
      return Response.json(error, { status: 400 });
    }

    if (!tokenRequest.client_id) {
      const error = {
        error: TOKEN_ERRORS.INVALID_REQUEST,
        error_description: "Missing client_id parameter",
      } as TokenError;
      return Response.json(error, { status: 400 });
    }

    // Handle different grant types
    switch (tokenRequest.grant_type) {
      case "authorization_code": {
        logger.debug("Processing authorization_code grant");
        const validation = await validateAuthorizationCodeGrant(tokenRequest);
        logger.debug(`validation: ${JSON.stringify(validation)}`)

        if (!validation.valid) {
          logger.warn("Authorization code validation failed", validation.error);
          const statusCode =
            validation.error?.error === TOKEN_ERRORS.INVALID_CLIENT ? 401 : 400;
          return Response.json(validation.error, { status: statusCode });
        }

        // Type guard to ensure required fields are present
        if (!validation.userId || !validation.applicationId) {
          logger.error("Validation succeeded but missing required fields");
          return Response.json(
            {
              error: TOKEN_ERRORS.SERVER_ERROR,
              error_description: "Internal server error",
            },
            { status: 500 },
          );
        }

        // Get or create authorization record
        const authorization = await prisma.authorization.upsert({
          where: {
            userId_applicationId: {
              userId: validation.userId,
              applicationId: validation.applicationId,
            },
          },
          create: {
            userId: validation.userId,
            applicationId: validation.applicationId,
          },
          update: {
            updatedAt: new Date(),
          },
        });

        // Create access token
        const tokenResponse = await createAccessToken(
          validation.userId,
          validation.applicationId,
          authorization.id,
          validation.scopes || ["read"],
        );

        logger.info("Access token created successfully");
        return Response.json(tokenResponse);
      }

      case "refresh_token": {
        logger.debug("Processing refresh_token grant");
        const validation = await validateRefreshTokenGrant(tokenRequest);

        if (!validation.valid) {
          logger.warn("Refresh token validation failed", validation.error);
          const statusCode =
            validation.error?.error === TOKEN_ERRORS.INVALID_CLIENT ? 401 : 400;
          return Response.json(validation.error, { status: statusCode });
        }

        // Type guard to ensure required fields are present
        if (
          !validation.userId ||
          !validation.applicationId ||
          !validation.authorizationId
        ) {
          logger.error("Validation succeeded but missing required fields");
          return Response.json(
            {
              error: TOKEN_ERRORS.SERVER_ERROR,
              error_description: "Internal server error",
            },
            { status: 500 },
          );
        }

        // Revoke the old access token
        await prisma.accessToken.deleteMany({
          where: {
            refreshToken: tokenRequest.refresh_token,
          },
        });

        // Create new access token
        const tokenResponse = await createAccessToken(
          validation.userId,
          validation.applicationId,
          validation.authorizationId,
          validation.scopes || ["read"],
        );

        logger.info("Refresh token processed successfully");
        return Response.json(tokenResponse);
      }

      default:
        logger.warn("Unsupported grant_type", {
          grantType: tokenRequest.grant_type,
        });
        const error = {
          error: TOKEN_ERRORS.UNSUPPORTED_GRANT_TYPE,
          error_description: `Unsupported grant_type: ${tokenRequest.grant_type}`,
        } as TokenError;
        return Response.json(error, { status: 400 });
    }
  } catch (error) {
    logger.error("Token endpoint error", error);

    return Response.json(
      {
        error: "server_error",
        error_description: "Internal server error",
      } as TokenError,
      { status: 500 },
    );
  }
}
