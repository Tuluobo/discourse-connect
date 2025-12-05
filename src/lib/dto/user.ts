import { Prisma, User } from "@/prisma/client";

import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    logger.error("getUserById error", error);
    return null;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    logger.error("getUserByEmail error", error);
    return null;
  }
};

export const getUserByUsername = async (
  username: string,
): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    return user;
  } catch (error) {
    logger.error("getUserByUsername error", error);
    return null;
  }
};

export const updateUser = async (
  userId: string,
  data: Prisma.UserUpdateInput,
): Promise<User | null> => {
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    return user;
  } catch (error) {
    logger.error("updateUser error", error);
    return null;
  }
};

export const createUser = async (
  data: Prisma.UserCreateInput,
): Promise<User | null> => {
  try {
    const user = await prisma.user.create({
      data,
    });
    return user;
  } catch (error) {
    logger.error("createUser error", error);
    return null;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    logger.error("deleteUser error", error);
    return false;
  }
};
