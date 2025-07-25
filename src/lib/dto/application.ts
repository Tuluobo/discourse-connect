import {
  Application as InnerApplication,
  Prisma as PrismaType,
} from "@prisma/client";

import { logger } from "../logger";
import { prisma } from "../prisma";

export type Application = InnerApplication;

export const getAllApplications = async (): Promise<Application[]> => {
  try {
    const applications = await prisma.application.findMany();
    return applications;
  } catch (error) {
    logger.error("getAllApplications error", error);
    return [];
  }
};

export const findApplicationById = async (
  id: string,
): Promise<Application | null> => {
  try {
    const application = await prisma.application.findUnique({
      where: { id },
    });
    return application;
  } catch (error) {
    logger.error("findApplicationById error", error);
    return null;
  }
};

export const findApplicationByClientId = async (
  clientId: string,
): Promise<Application | null> => {
  try {
    const application = await prisma.application.findUnique({
      where: { clientId },
    });
    return application;
  } catch (error) {
    logger.error("findApplicationByClientId error", error);
    return null;
  }
};

export const createApplication = async (
  data: PrismaType.ApplicationCreateInput,
): Promise<Application | null> => {
  try {
    const application = await prisma.application.create({
      data,
    });
    return application;
  } catch (error) {
    logger.error("createApplication error", error);
    return null;
  }
};

export const updateApplication = async (
  id: string,
  data: PrismaType.ApplicationUpdateInput,
): Promise<Application | null> => {
  try {
    const application = await prisma.application.update({
      where: { id },
      data,
    });
    return application;
  } catch (error) {
    logger.error("updateApplication error", error);
    return null;
  }
};

export const deleteApplication = async (id: string): Promise<boolean> => {
  try {
    await prisma.application.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    logger.error("deleteApplication error", error);
    return false;
  }
};

export const getUserApplicationCount = async (
  userId: string,
): Promise<number> => {
  try {
    const count = await prisma.application.count({
      where: { userId },
    });
    return count;
  } catch (error) {
    logger.error("getUserApplicationCount error", error);
    return 0;
  }
};

export const findApplicationsByUser = async (
  userId: string,
): Promise<Application[]> => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId },
    });
    return applications;
  } catch (error) {
    logger.error("findApplicationsByUser error", error);
    return [];
  }
};
