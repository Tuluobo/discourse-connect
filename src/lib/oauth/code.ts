import { randomBytes } from "crypto";

import {
  createCode,
  CreateCodeData,
  deleteCode,
  findCodeByCode,
} from "@/lib/dto/code";

export function generateAuthorizationCode(): string {
  return randomBytes(32).toString("base64url");
}

export async function createAuthorizationCode(
  userId: string,
  applicationId: string,
  redirectUri: string,
  scopes: string[],
  state?: string | null,
  challenge?: string | null,
  challengeMethod?: string | null,
): Promise<string> {
  const code = generateAuthorizationCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const codeData: CreateCodeData = {
    code,
    expiresAt,
    userId,
    applicationId,
    redirectUri,
    scopes,
    challenge: challenge || undefined,
    challengeMethod: challengeMethod || undefined,
  };

  await createCode(codeData);

  return code;
}

export async function validateAuthorizationCode(
  code: string,
  clientId: string,
  codeVerifier?: string,
): Promise<{ valid: boolean; userId?: string; applicationId?: string }> {
  const codeRecord = await findCodeByCode(code);

  if (!codeRecord) {
    return { valid: false };
  }

  // Check if code has expired
  if (codeRecord.expiresAt < new Date()) {
    await deleteCode(code);
    return { valid: false };
  }

  // Validate client_id
  if (codeRecord.application.clientId !== clientId) {
    return { valid: false };
  }

  // Note: PKCE validation will be handled in token endpoint
  // This simplified version focuses on basic code validation

  // Delete the code after successful validation (one-time use)
  await deleteCode(code);

  return {
    valid: true,
    userId: codeRecord.userId,
    applicationId: codeRecord.applicationId,
  };
}
