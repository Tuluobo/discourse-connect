import { Code as InnerCode, Prisma as PrismaType } from "@prisma/client";

import { logger } from "../logger";
import { prisma } from "../prisma";

export type Code = InnerCode;

export type CodeWithRelations = PrismaType.CodeGetPayload<{
  include: {
    user: true;
    application: true;
  };
}>;

export interface CreateCodeData {
  code: string;
  redirectUri: string;
  scopes: string[];
  expiresAt: Date;
  challenge?: string;
  challengeMethod?: string;
  userId: string;
  applicationId: string;
}

export const findCodeByCode = async (
  code: string,
): Promise<CodeWithRelations | null> => {
  try {
    const codeRecord = await prisma.code.findUnique({
      where: { code },
      include: {
        user: true,
        application: true,
      },
    });
    return codeRecord;
  } catch (error) {
    logger.error("findCodeByCode error", error);
    return null;
  }
};

export const createCode = async (
  data: CreateCodeData,
): Promise<Code | null> => {
  try {
    const codeRecord = await prisma.code.create({
      data: {
        code: data.code,
        redirectUri: data.redirectUri,
        scopes: data.scopes,
        expiresAt: data.expiresAt,
        challenge: data.challenge,
        challengeMethod: data.challengeMethod,
        userId: data.userId,
        applicationId: data.applicationId,
      },
    });
    return codeRecord;
  } catch (error) {
    logger.error("createCode error", error);
    return null;
  }
};

export const deleteCode = async (code: string): Promise<boolean> => {
  try {
    await prisma.code.delete({
      where: { code },
    });
    return true;
  } catch (error) {
    logger.error("deleteCode error", error);
    return false;
  }
};

export const deleteCodeById = async (id: string): Promise<boolean> => {
  try {
    await prisma.code.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    logger.error("deleteCodeById error", error);
    return false;
  }
};

export const cleanupExpiredCodes = async (): Promise<number> => {
  try {
    const result = await prisma.code.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    return result.count;
  } catch (error) {
    logger.error("cleanupExpiredCodes error", error);
    return 0;
  }
};

export const findCodesByUser = async (
  userId: string,
): Promise<CodeWithRelations[]> => {
  try {
    const codes = await prisma.code.findMany({
      where: { userId },
      include: {
        user: true,
        application: true,
      },
    });
    return codes;
  } catch (error) {
    logger.error("findCodesByUser error", error);
    return [];
  }
};

export const findCodesByApplication = async (
  applicationId: string,
): Promise<CodeWithRelations[]> => {
  try {
    const codes = await prisma.code.findMany({
      where: { applicationId },
      include: {
        user: true,
        application: true,
      },
    });
    return codes;
  } catch (error) {
    logger.error("findCodesByApplication error", error);
    return [];
  }
};
