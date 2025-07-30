import { NextResponse } from "next/server";

import { env } from "@/env";

export async function GET() {
  const baseUrl = env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";

  const metadata = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/oauth2/authorize`,
    token_endpoint: `${baseUrl}/oauth2/token`,
    scopes_supported: ["read:user"],
    response_types_supported: ["code"],
    token_endpoint_auth_methods_supported: ["client_secret_post"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    revocation_endpoint: `${baseUrl}/oauth2/revoke`,
    code_challenge_methods_supported: ["S256", "plain"],
  };

  return NextResponse.json(metadata, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
