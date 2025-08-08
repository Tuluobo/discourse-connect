"use server";

import { auth, signOut } from "@/auth";
import { getTranslations } from "next-intl/server";

import { deleteUser, getUserById } from "@/lib/dto/user";
import { logger } from "@/lib/logger";

export async function getCurrentUser() {
  try {
    const session = await auth();
    const t = await getTranslations("serverErrors.user");

    if (!session?.user?.id) {
      throw new Error(t("notAuthenticated"));
    }

    const user = await getUserById(session.user.id);
    if (!user) {
      throw new Error(t("notFound"));
    }

    return user;
  } catch (error) {
    logger.error("Error fetching current user", error);
    throw error;
  }
}

export async function deleteCurrentUser() {
  try {
    const session = await auth();
    const t = await getTranslations("serverErrors.user");

    if (!session?.user?.id) {
      throw new Error(t("notAuthenticated"));
    }

    const success = await deleteUser(session.user.id);
    if (!success) {
      throw new Error(t("deleteFailed"));
    }

    // Sign out the user after deletion
    await signOut({ redirectTo: "/" });

    return { success: true };
  } catch (error) {
    logger.error("Error deleting current user", error);
    throw error;
  }
}
