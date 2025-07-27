import { NextRequest } from "next/server";

import { logger } from "@/lib/logger";
import {
  REVOKE_ERRORS,
  RevokeError,
  RevokeRequest,
  revokeToken,
  validateRevokeRequest,
} from "@/lib/oauth/revoke";

export async function POST(request: NextRequest) {
  try {
    logger.debug("Token revocation endpoint request started", {
      url: request.url,
    });

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
        logger.security("Basic Auth credentials parsed for revocation", {
          client_id,
          client_secret,
        });
      } catch (error) {
        logger.warn("Failed to parse Basic Auth header", error);
      }
    }

    // Parse request body
    let revokeRequest: RevokeRequest;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/x-www-form-urlencoded")) {
      logger.debug("Parsing revoke request as form data");
      const body = await request.formData();

      revokeRequest = {
        token: body.get("token") as string,
        token_type_hint: (body.get("token_type_hint") as string) || undefined,
        // Client credentials from Basic Auth take precedence
        client_id:
          clientCredentials.client_id || (body.get("client_id") as string),
        client_secret:
          clientCredentials.client_secret ||
          (body.get("client_secret") as string) ||
          undefined,
      };
    } else if (contentType.includes("application/json")) {
      logger.debug("Parsing revoke request as JSON");
      const jsonBody = await request.json();

      revokeRequest = {
        token: jsonBody.token,
        token_type_hint: jsonBody.token_type_hint,
        // Client credentials from Basic Auth take precedence
        client_id: clientCredentials.client_id || jsonBody.client_id,
        client_secret:
          clientCredentials.client_secret || jsonBody.client_secret,
      };
    } else {
      logger.debug("Unsupported content type, defaulting to form data");
      const body = await request.formData();

      revokeRequest = {
        token: body.get("token") as string,
        token_type_hint: (body.get("token_type_hint") as string) || undefined,
        client_id:
          clientCredentials.client_id || (body.get("client_id") as string),
        client_secret:
          clientCredentials.client_secret ||
          (body.get("client_secret") as string) ||
          undefined,
      };
    }

    logger.security("Parsed revoke request", revokeRequest);

    // Validate request parameters
    const validation = await validateRevokeRequest(
      revokeRequest.token,
      revokeRequest.token_type_hint,
      revokeRequest.client_id,
      revokeRequest.client_secret,
    );

    if (!validation.valid) {
      logger.warn("Revoke request validation failed", validation.error);
      return Response.json(validation.error, { status: 400 });
    }

    // Perform token revocation
    const result = await revokeToken(
      revokeRequest.token,
      revokeRequest.token_type_hint,
      revokeRequest.client_id,
      revokeRequest.client_secret,
    );

    if (!result.success) {
      logger.warn("Token revocation failed", result.error);
      const statusCode =
        result.error.error === REVOKE_ERRORS.INVALID_CLIENT ? 401 : 400;
      return Response.json(result.error, { status: statusCode });
    }

    logger.info("Token revocation completed successfully");

    // RFC 7009: The authorization server responds with HTTP status code 200
    // if the revocation is successful or if the client submitted an invalid token
    return new Response(null, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    logger.error("Token revocation endpoint error", error);

    return Response.json(
      {
        error: "server_error",
        error_description: "Internal server error",
      } as RevokeError,
      { status: 500 },
    );
  }
}
