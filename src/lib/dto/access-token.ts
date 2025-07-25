import {
  AccessToken as InnerAccessToken,
  Prisma as PrismaType,
} from "@prisma/client";

import { logger } from "../logger";
import { prisma } from "../prisma";

export type AccessToken = InnerAccessToken;

export type AccessTokenWithRelations = PrismaType.AccessTokenGetPayload<{
  include: {
    user: true;
    application: true;
    authorization: true;
  };
}>;

export interface CreateAccessTokenData {
  token: string;
  tokenType?: string;
  expiresAt: Date;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
  scopes: string[];
  isRevoked?: boolean;
  userId: string;
  applicationId: string;
  authorizationId: string;
}

export const findAccessTokenByToken = async (
  token: string,
  includeRevoked: boolean = false,
): Promise<AccessTokenWithRelations | null> => {
  try {
    const accessToken = await prisma.accessToken.findFirst({
      where: {
        token,
        ...(includeRevoked ? {} : { isRevoked: false }),
      },
      include: {
        user: true,
        application: true,
        authorization: true,
      },
    });
    return accessToken;
  } catch (error) {
    logger.error("findAccessTokenByToken error", error);
    return null;
  }
};

export const findAccessTokenByRefreshToken = async (
  refreshToken: string,
  includeRevoked: boolean = false,
): Promise<AccessTokenWithRelations | null> => {
  try {
    const accessToken = await prisma.accessToken.findFirst({
      where: {
        refreshToken,
        ...(includeRevoked ? {} : { isRevoked: false }),
      },
      include: {
        user: true,
        application: true,
        authorization: true,
      },
    });
    return accessToken;
  } catch (error) {
    logger.error("findAccessTokenByRefreshToken error", error);
    return null;
  }
};

export const createAccessToken = async (
  data: CreateAccessTokenData,
): Promise<AccessToken | null> => {
  try {
    const accessToken = await prisma.accessToken.create({
      data: {
        token: data.token,
        tokenType: data.tokenType || "bearer",
        expiresAt: data.expiresAt,
        refreshToken: data.refreshToken,
        refreshTokenExpiresAt: data.refreshTokenExpiresAt,
        scopes: data.scopes,
        isRevoked: data.isRevoked || false,
        userId: data.userId,
        applicationId: data.applicationId,
        authorizationId: data.authorizationId,
      },
    });
    return accessToken;
  } catch (error) {
    logger.error("createAccessToken error", error);
    return null;
  }
};

export const deleteAccessToken = async (token: string): Promise<boolean> => {
  try {
    await prisma.accessToken.delete({
      where: { token },
    });
    return true;
  } catch (error) {
    logger.error("deleteAccessToken error", error);
    return false;
  }
};

export const deleteAccessTokensByRefreshToken = async (
  refreshToken: string,
): Promise<number> => {
  try {
    const result = await prisma.accessToken.deleteMany({
      where: { refreshToken },
    });
    return result.count;
  } catch (error) {
    logger.error("deleteAccessTokensByRefreshToken error", error);
    return 0;
  }
};

export const revokeAccessToken = async (
  tokenId: string,
  revokedAt?: Date,
): Promise<AccessToken | null> => {
  try {
    const accessToken = await prisma.accessToken.update({
      where: { id: tokenId },
      data: {
        isRevoked: true,
        revokedAt: revokedAt || new Date(),
      },
    });
    return accessToken;
  } catch (error) {
    logger.error("revokeAccessToken error", error);
    return null;
  }
};

export const revokeAccessTokensByUserAndApplication = async (
  userId: string,
  applicationId: string,
): Promise<number> => {
  try {
    const result = await prisma.accessToken.updateMany({
      where: {
        userId,
        applicationId,
        isRevoked: false,
      },
      data: {
        isRevoked: true,
        revokedAt: new Date(),
      },
    });
    return result.count;
  } catch (error) {
    logger.error("revokeAccessTokensByUserAndApplication error", error);
    return 0;
  }
};

export const cleanupExpiredTokens = async (): Promise<number> => {
  try {
    const result = await prisma.accessToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    return result.count;
  } catch (error) {
    logger.error("cleanupExpiredTokens error", error);
    return 0;
  }
};
