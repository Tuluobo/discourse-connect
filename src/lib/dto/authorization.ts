import {
  Authorization as InnerAuthorization,
  Prisma as PrismaType,
} from "@prisma/client";

import { logger } from "../logger";
import { prisma } from "../prisma";

export type Authorization = InnerAuthorization;

export type AuthorizationWithRelations = PrismaType.AuthorizationGetPayload<{
  include: {
    user: true;
    application: true;
  };
}>;

export interface CreateAuthorizationData {
  userId: string;
  applicationId: string;
  scopes?: string[];
}

export const findAuthorizationByUserAndApplication = async (
  userId: string,
  applicationId: string,
): Promise<AuthorizationWithRelations | null> => {
  try {
    const authorization = await prisma.authorization.findUnique({
      where: {
        userId_applicationId: {
          userId,
          applicationId,
        },
      },
      include: {
        user: true,
        application: true,
      },
    });
    return authorization;
  } catch (error) {
    logger.error("findAuthorizationByUserAndApplication error", error);
    return null;
  }
};

export const createOrUpdateAuthorization = async (
  data: CreateAuthorizationData,
): Promise<Authorization | null> => {
  try {
    const authorization = await prisma.authorization.upsert({
      where: {
        userId_applicationId: {
          userId: data.userId,
          applicationId: data.applicationId,
        },
      },
      create: {
        userId: data.userId,
        applicationId: data.applicationId,
        scopes: data.scopes || [],
      },
      update: {
        updatedAt: new Date(),
        scopes: data.scopes,
      },
    });
    return authorization;
  } catch (error) {
    logger.error("createOrUpdateAuthorization error", error);
    return null;
  }
};

export const createAuthorization = async (
  data: CreateAuthorizationData,
): Promise<Authorization | null> => {
  try {
    const authorization = await prisma.authorization.create({
      data: {
        userId: data.userId,
        applicationId: data.applicationId,
        scopes: data.scopes || [],
      },
    });
    return authorization;
  } catch (error) {
    logger.error("createAuthorization error", error);
    return null;
  }
};

export const updateAuthorization = async (
  id: string,
  data: Partial<PrismaType.AuthorizationUpdateInput>,
): Promise<Authorization | null> => {
  try {
    const authorization = await prisma.authorization.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return authorization;
  } catch (error) {
    logger.error("updateAuthorization error", error);
    return null;
  }
};

export const deleteAuthorization = async (id: string): Promise<boolean> => {
  try {
    await prisma.authorization.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    logger.error("deleteAuthorization error", error);
    return false;
  }
};

export const deleteAuthorizationByUserAndApplication = async (
  userId: string,
  applicationId: string,
): Promise<boolean> => {
  try {
    await prisma.authorization.delete({
      where: {
        userId_applicationId: {
          userId,
          applicationId,
        },
      },
    });
    return true;
  } catch (error) {
    logger.error("deleteAuthorizationByUserAndApplication error", error);
    return false;
  }
};

export const findAuthorizationsByUser = async (
  userId: string,
): Promise<AuthorizationWithRelations[]> => {
  try {
    const authorizations = await prisma.authorization.findMany({
      where: { userId },
      include: {
        user: true,
        application: true,
      },
    });
    return authorizations;
  } catch (error) {
    logger.error("findAuthorizationsByUser error", error);
    return [];
  }
};

export const findAuthorizationsByApplication = async (
  applicationId: string,
): Promise<AuthorizationWithRelations[]> => {
  try {
    const authorizations = await prisma.authorization.findMany({
      where: { applicationId },
      include: {
        user: true,
        application: true,
      },
    });
    return authorizations;
  } catch (error) {
    logger.error("findAuthorizationsByApplication error", error);
    return [];
  }
};
