import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { generateRandomKey } from "@/utils/format";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const consentSchema = z.object({
  client_id: z.string().min(1),
  redirect_uri: z.string().url(),
  scope: z.string(),
  state: z.string().optional(),
  approved: z.boolean(),
  code_challenge: z.string().optional(),
  code_challenge_method: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      client_id,
      redirect_uri,
      scope,
      state,
      approved,
      code_challenge,
      code_challenge_method,
    } = consentSchema.parse(body);

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    // 验证客户端应用
    const application = await prisma.application.findUnique({
      where: { clientId: client_id },
    });

    if (!application) {
      return NextResponse.json({ error: "客户端应用不存在" }, { status: 400 });
    }

    // 验证重定向 URI
    if (!application.redirectUris.includes(redirect_uri)) {
      return NextResponse.json({ error: "无效的重定向 URI" }, { status: 400 });
    }

    if (!approved) {
      // 用户拒绝授权
      const redirectUrl = new URL(redirect_uri);
      redirectUrl.searchParams.set("error", "access_denied");
      redirectUrl.searchParams.set("error_description", "用户拒绝了授权请求");
      if (state) {
        redirectUrl.searchParams.set("state", state);
      }

      return NextResponse.json({
        redirect_uri: redirectUrl.toString(),
      });
    }

    // 用户同意授权，记录授权信息
    await prisma.authorization.upsert({
      where: {
        userId_applicationId: {
          userId: session.user.id,
          applicationId: application.id,
        },
      },
      update: {
        scopes: scope.split(" ").filter(Boolean),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1年后过期
      },
      create: {
        userId: session.user.id,
        applicationId: application.id,
        scopes: scope.split(" ").filter(Boolean),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1年后过期
      },
    });

    // 生成授权码
    const code = `ac_${generateRandomKey()}`;
    const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10分钟后过期

    await prisma.code.create({
      data: {
        code,
        userId: session.user.id,
        applicationId: application.id,
        redirectUri: redirect_uri,
        scopes: scope.split(" ").filter(Boolean),
        expiresAt: codeExpiresAt,
        codeChallenge: code_challenge,
        codeChallengeMethod: code_challenge_method,
      },
    });

    // 返回授权码重定向
    const redirectUrl = new URL(redirect_uri);
    redirectUrl.searchParams.set("code", code);
    if (state) {
      redirectUrl.searchParams.set("state", state);
    }

    return NextResponse.json({
      redirect_uri: redirectUrl.toString(),
    });
  } catch (error) {
    console.error("Consent error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "请求参数无效", details: error.errors },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
