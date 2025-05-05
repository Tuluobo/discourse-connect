import {
  Application as InnerApplication,
  Prisma as PrismaType,
} from "@prisma/client";

import { prisma } from "../prisma";

export type Application = InnerApplication;

export const getAllApplications = async () => {
  try {
    const applications = await prisma.application.findMany();
    return applications;
  } catch {
    return null;
  }
};

export const createApplication = async (
  data: PrismaType.ApplicationCreateInput,
) => {
  try {
    const application = await prisma.application.create({
      data,
    });
    return application;
  } catch (error) {
    return null;
  }
};
