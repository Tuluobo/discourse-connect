import { randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

export function generateAuthorizationCode(): string {
  return randomBytes(32).toString("base64url");
}

export async function createAuthorizationCode(
  userId: string,
  applicationId: string,
  codeChallenge?: string | null,
  codeChallengeMethod?: string | null,
): Promise<string> {
  const code = generateAuthorizationCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.code.create({
    data: {
      code,
      expiresAt,
      userId,
      applicationId,
      codeChallenge,
      codeChallengeMethod,
    },
  });

  return code;
}

export async function validateAuthorizationCode(
  code: string,
  clientId: string,
  codeVerifier?: string,
): Promise<{ valid: boolean; userId?: string; applicationId?: string }> {
  const codeRecord = await prisma.code.findUnique({
    where: { code },
    include: { application: true },
  });

  if (!codeRecord) {
    return { valid: false };
  }

  // Check if code has expired
  if (codeRecord.expiresAt < new Date()) {
    await prisma.code.delete({ where: { code } });
    return { valid: false };
  }

  // Validate client_id
  if (codeRecord.application.clientId !== clientId) {
    return { valid: false };
  }

  // Note: PKCE validation will be handled in token endpoint
  // This simplified version focuses on basic code validation

  // Delete the code after successful validation (one-time use)
  await prisma.code.delete({ where: { code } });

  return {
    valid: true,
    userId: codeRecord.userId,
    applicationId: codeRecord.applicationId,
  };
}
