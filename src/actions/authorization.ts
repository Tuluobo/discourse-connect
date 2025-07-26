"use server";

import { auth } from "@/auth";

import {
  deleteAuthorizationByUserAndApplication,
  findAuthorizationsByUser,
} from "@/lib/dto/authorization";
import { logger } from "@/lib/logger";

export async function getUserAuthorizations() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const authorizations = await findAuthorizationsByUser(session.user.id);
    return authorizations;
  } catch (error) {
    logger.error("Error fetching user authorizations", error);
    throw error;
  }
}

export async function revokeUserAuthorization(applicationId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const success = await deleteAuthorizationByUserAndApplication(
      session.user.id,
      applicationId,
    );

    if (!success) {
      throw new Error("Failed to revoke authorization");
    }

    return { success: true };
  } catch (error) {
    logger.error("Error revoking user authorization", error);
    throw error;
  }
}
