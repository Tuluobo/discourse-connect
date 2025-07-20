"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

import { createApplication } from "@/lib/dto/application";

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
    const clientId = `app_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const clientSecret = `secret_${Math.random().toString(36).substring(2, 30)}_${Date.now()}`;

    const application = await createApplication({
      ...validatedData,
      clientId,
      clientSecret,
      userId: session.user.id,
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
