import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { generateRandomKey } from "@/utils/format";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const authorizeSchema = z.object({
  response_type: z.literal("code", {
    errorMap: () => ({ message: "只支持 authorization code 授权类型" }),
  }),
  client_id: z.string().min(1, "client_id 是必需的"),
  redirect_uri: z.string().url("redirect_uri 必须是有效的 URL"),
  scope: z.string().optional(),
  state: z.string().optional(),
  // PKCE 参数
  code_challenge: z.string().optional(),
  code_challenge_method: z.enum(["S256", "plain"]).optional().default("S256"),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    // 验证请求参数
    const validatedParams = authorizeSchema.parse(params);

    // 检查用户是否已登录
    const session = await auth();
    if (!session?.user?.id) {
      // 用户未登录，重定向到登录页面，并保存 OAuth 参数
      const loginUrl = new URL("/sign-in", request.url);
      loginUrl.searchParams.set(
        "oauth_params",
        encodeURIComponent(JSON.stringify(validatedParams)),
      );
      return NextResponse.redirect(loginUrl);
    }

    // 验证客户端应用是否存在
    const application = await prisma.application.findUnique({
      where: { clientId: validatedParams.client_id },
    });

    if (!application) {
      return createErrorResponse(
        validatedParams.redirect_uri,
        "invalid_client",
        "客户端应用不存在",
        validatedParams.state,
      );
    }

    // 验证重定向 URI 是否在白名单中
    if (!application.redirectUris.includes(validatedParams.redirect_uri)) {
      return createErrorResponse(
        validatedParams.redirect_uri,
        "invalid_request",
        "redirect_uri 不在允许列表中",
        validatedParams.state,
      );
    }

    // 检查是否已经有有效的授权
    const existingAuthorization = await prisma.authorization.findFirst({
      where: {
        userId: session.user.id,
        applicationId: application.id,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (existingAuthorization) {
      // 用户已经授权过，直接生成授权码
      return await generateAuthorizationCode(
        session.user.id,
        application.id,
        validatedParams.redirect_uri,
        validatedParams.scope || "",
        validatedParams.state,
        validatedParams.code_challenge,
        validatedParams.code_challenge_method,
      );
    }

    // 重定向到授权确认页面
    const consentUrl = new URL("/oauth/consent", request.url);
    consentUrl.searchParams.set("client_id", validatedParams.client_id);
    consentUrl.searchParams.set("redirect_uri", validatedParams.redirect_uri);
    consentUrl.searchParams.set("scope", validatedParams.scope || "");
    if (validatedParams.state) {
      consentUrl.searchParams.set("state", validatedParams.state);
    }
    if (validatedParams.code_challenge) {
      consentUrl.searchParams.set(
        "code_challenge",
        validatedParams.code_challenge,
      );
      consentUrl.searchParams.set(
        "code_challenge_method",
        validatedParams.code_challenge_method,
      );
    }

    return NextResponse.redirect(consentUrl);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const { searchParams } = new URL(request.url);
      const redirectUri = searchParams.get("redirect_uri");
      if (redirectUri) {
        return createErrorResponse(
          redirectUri,
          "invalid_request",
          error.errors[0]?.message || "请求参数无效",
          searchParams.get("state"),
        );
      } else {
        // 如果没有有效的重定向 URI，重定向到错误页面
        const errorUrl = new URL("/oauth/error", request.url);
        errorUrl.searchParams.set("error", "invalid_request");
        errorUrl.searchParams.set(
          "error_description",
          error.errors[0]?.message || "请求参数无效",
        );
        const clientId = searchParams.get("client_id");
        if (clientId) {
          errorUrl.searchParams.set("client_id", clientId);
        }
        const state = searchParams.get("state");
        if (state) {
          errorUrl.searchParams.set("state", state);
        }
        return NextResponse.redirect(errorUrl);
      }
    }

    // 对于其他错误，也重定向到错误页面
    const errorUrl = new URL("/oauth/error", request.url);
    errorUrl.searchParams.set("error", "server_error");
    errorUrl.searchParams.set("error_description", "服务器内部错误");
    return NextResponse.redirect(errorUrl);
  }
}

async function generateAuthorizationCode(
  userId: string,
  applicationId: string,
  redirectUri: string,
  scope: string,
  state?: string,
  codeChallenge?: string,
  codeChallengeMethod?: string,
) {
  // 生成授权码
  const code = `ac_${generateRandomKey()}`;
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10分钟后过期

  // 存储授权码
  await prisma.code.create({
    data: {
      code,
      userId,
      applicationId,
      redirectUri,
      scopes: scope.split(" ").filter(Boolean),
      expiresAt,
      codeChallenge,
      codeChallengeMethod,
    },
  });

  // 重定向回客户端应用
  const redirectUrl = new URL(redirectUri);
  redirectUrl.searchParams.set("code", code);
  if (state) {
    redirectUrl.searchParams.set("state", state);
  }

  return NextResponse.redirect(redirectUrl.toString());
}

function createErrorResponse(
  redirectUri: string,
  error: string,
  errorDescription: string,
  state?: string | null,
) {
  const redirectUrl = new URL(redirectUri);
  redirectUrl.searchParams.set("error", error);
  redirectUrl.searchParams.set("error_description", errorDescription);
  if (state) {
    redirectUrl.searchParams.set("state", state);
  }
  return NextResponse.redirect(redirectUrl.toString());
}
