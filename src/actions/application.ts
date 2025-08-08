"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

import { createApplication } from "@/lib/dto/application";
import { prisma } from "@/lib/prisma";
import { generateRandomKey, generateSecretWords } from "@/lib/utils";

async function getApplicationErrorMessages() {
  const t = await getTranslations("serverErrors.application");
  return {
    nameRequired: t("nameRequired"),
    validUrl: t("validUrl"),
    validLogoUrl: t("validLogoUrl"),
    validRedirectUrl: t("validRedirectUrl"),
    redirectUrlRequired: t("redirectUrlRequired"),
    scopesRequired: t("scopesRequired"),
    notLoggedIn: t("notLoggedIn"),
    createFailed: t("createFailed"),
    validationFailed: t("validationFailed"),
    createError: t("createError"),
    updateError: t("updateError"),
    notFoundOrNoPermission: t("notFoundOrNoPermission"),
    confirmNameMismatch: t("confirmNameMismatch"),
    deleteError: t("deleteError"),
  };
}

async function createApplicationSchema() {
  const messages = await getApplicationErrorMessages();
  return z.object({
    name: z.string().min(1, messages.nameRequired),
    home: z.string().url(messages.validUrl),
    logoUri: z
      .string()
      .optional()
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: messages.validLogoUrl,
      }),
    description: z.string().optional(),
    redirectUris: z
      .array(z.string().url(messages.validRedirectUrl))
      .min(1, messages.redirectUrlRequired),
    scopes: z.array(z.string()).min(1, messages.scopesRequired),
  });
}

export type CreateApplicationInput = z.infer<
  Awaited<ReturnType<typeof createApplicationSchema>>
>;

export async function createApplicationAction(data: CreateApplicationInput) {
  try {
    const session = await auth();
    const messages = await getApplicationErrorMessages();

    if (!session?.user?.id) {
      return { error: messages.notLoggedIn };
    }

    const schema = await createApplicationSchema();
    const validatedData = schema.parse(data);

    // Generate client credentials
    const clientId = `app_${generateRandomKey()}`;
    const clientSecret = `sk_${generateSecretWords()}`;

    const application = await createApplication({
      ...validatedData,
      clientId,
      clientSecret,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    });

    if (!application) {
      return { error: messages.createFailed };
    }

    revalidatePath("/applications");
    return { success: true, data: application };
  } catch (error) {
    const messages = await getApplicationErrorMessages();
    if (error instanceof z.ZodError) {
      return { error: messages.validationFailed, details: error.errors };
    }
    return { error: messages.createError };
  }
}

async function updateApplicationSchema() {
  const messages = await getApplicationErrorMessages();
  return z.object({
    id: z.string(),
    name: z.string().min(1, messages.nameRequired),
    home: z.string().url(messages.validUrl),
    logoUri: z
      .string()
      .optional()
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: messages.validLogoUrl,
      }),
    description: z.string().optional(),
    redirectUris: z
      .array(z.string().url(messages.validRedirectUrl))
      .min(1, messages.redirectUrlRequired),
    scopes: z.array(z.string()).min(1, messages.scopesRequired),
  });
}

export type UpdateApplicationInput = z.infer<
  Awaited<ReturnType<typeof updateApplicationSchema>>
>;

export async function updateApplicationAction(data: UpdateApplicationInput) {
  try {
    const session = await auth();
    const messages = await getApplicationErrorMessages();
    if (!session?.user?.id) {
      return { error: messages.notLoggedIn };
    }

    const schema = await updateApplicationSchema();
    const validatedData = schema.parse(data);
    const application = await prisma.application.update({
      where: {
        id: validatedData.id,
        userId: session.user.id, // 确保只能编辑自己的应用
      },
      data: {
        name: validatedData.name,
        home: validatedData.home,
        logoUri: validatedData.logoUri,
        description: validatedData.description,
        redirectUris: validatedData.redirectUris,
        scopes: validatedData.scopes,
      },
    });

    revalidatePath("/applications");
    return { success: true, data: application };
  } catch (error) {
    const messages = await getApplicationErrorMessages();
    if (error instanceof z.ZodError) {
      return { error: messages.validationFailed, details: error.errors };
    }
    return { error: messages.updateError };
  }
}

const deleteApplicationSchema = z.object({
  id: z.string(),
  confirmName: z.string(),
});

export type DeleteApplicationInput = z.infer<typeof deleteApplicationSchema>;

export async function deleteApplicationAction(data: DeleteApplicationInput) {
  try {
    const session = await auth();
    const messages = await getApplicationErrorMessages();

    if (!session?.user?.id) {
      return { error: messages.notLoggedIn };
    }

    const validatedData = deleteApplicationSchema.parse(data);

    // 首先获取应用信息来验证名称
    const application = await prisma.application.findFirst({
      where: {
        id: validatedData.id,
        userId: session.user.id, // 确保只能删除自己的应用
      },
    });

    if (!application) {
      return { error: messages.notFoundOrNoPermission };
    }

    // 验证确认名称
    if (validatedData.confirmName !== application.name) {
      return { error: messages.confirmNameMismatch };
    }

    // 删除应用
    await prisma.application.delete({
      where: {
        id: validatedData.id,
        userId: session.user.id,
      },
    });

    revalidatePath("/applications");
    return { success: true };
  } catch (error) {
    const messages = await getApplicationErrorMessages();
    if (error instanceof z.ZodError) {
      return { error: messages.validationFailed, details: error.errors };
    }
    return { error: messages.deleteError };
  }
}
