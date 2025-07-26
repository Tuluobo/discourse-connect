"use server";

import { auth, signOut } from "@/auth";

import { deleteUser, getUserById } from "@/lib/dto/user";
import { logger } from "@/lib/logger";

export async function getCurrentUser() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const user = await getUserById(session.user.id);
    if (!user) {
      throw new Error("User not found");
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

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const success = await deleteUser(session.user.id);
    if (!success) {
      throw new Error("Failed to delete user");
    }

    // Sign out the user after deletion
    await signOut({ redirectTo: "/" });

    return { success: true };
  } catch (error) {
    logger.error("Error deleting current user", error);
    throw error;
  }
}
