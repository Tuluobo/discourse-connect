"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

import { createApplication } from "@/lib/dto/application";
import { prisma } from "@/lib/prisma";
import { generateRandomKey, generateSecretWords } from "@/lib/utils";

const createApplicationSchema = z.object({
  name: z.string().min(1, "应用名称是必填项"),
  home: z.string().url("请输入有效的 URL"),
  logoUri: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "请输入有效的 Logo URL",
    }),
  description: z.string().optional(),
  redirectUris: z
    .array(z.string().url("请输入有效的重定向 URL"))
    .min(1, "至少需要一个重定向 URL"),
  scopes: z.array(z.string()).min(1, "至少需要一个权限范围"),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;

export async function createApplicationAction(data: CreateApplicationInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "未登录" };
    }

    const validatedData = createApplicationSchema.parse(data);

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
      return { error: "创建应用失败" };
    }

    revalidatePath("/applications");
    return { success: true, data: application };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "数据验证失败", details: error.errors };
    }
    return { error: "创建应用时发生错误" };
  }
}

const updateApplicationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "应用名称是必填项"),
  home: z.string().url("请输入有效的 URL"),
  logoUri: z
    .string()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "请输入有效的 Logo URL",
    }),
  description: z.string().optional(),
  redirectUris: z
    .array(z.string().url("请输入有效的重定向 URL"))
    .min(1, "至少需要一个重定向 URL"),
  scopes: z.array(z.string()).min(1, "至少需要一个权限范围"),
});

export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;

export async function updateApplicationAction(data: UpdateApplicationInput) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "未登录" };
    }

    const validatedData = updateApplicationSchema.parse(data);
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
    if (error instanceof z.ZodError) {
      return { error: "数据验证失败", details: error.errors };
    }
    return { error: "更新应用时发生错误" };
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

    if (!session?.user?.id) {
      return { error: "未登录" };
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
      return { error: "应用不存在或无权限删除" };
    }

    // 验证确认名称
    if (validatedData.confirmName !== application.name) {
      return { error: "确认名称不匹配" };
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
    if (error instanceof z.ZodError) {
      return { error: "数据验证失败", details: error.errors };
    }
    return { error: "删除应用时发生错误" };
  }
}
