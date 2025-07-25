import { NextRequest, NextResponse } from "next/server";
import { generateRandomKey, generateSecretWords } from "@/utils/format";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const tokenSchema = z.object({
  grant_type: z.literal("authorization_code", {
    errorMap: () => ({ message: "只支持 authorization_code 授权类型" }),
  }),
  code: z.string().min(1, "授权码是必需的"),
  redirect_uri: z.string().url("redirect_uri 必须是有效的 URL"),
  client_id: z.string().min(1, "client_id 是必需的"),
  client_secret: z.string().min(1, "client_secret 是必需的"),
  // PKCE 参数
  code_verifier: z.string().optional(),
});

const refreshTokenSchema = z.object({
  grant_type: z.literal("refresh_token"),
  refresh_token: z.string().min(1, "refresh_token 是必需的"),
  client_id: z.string().min(1, "client_id 是必需的"),
  client_secret: z.string().min(1, "client_secret 是必需的"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.grant_type === "refresh_token") {
      return handleRefreshToken(body);
    } else {
      return handleAuthorizationCode(body);
    }
  } catch (error) {
    console.error("Token error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "invalid_request",
          error_description: error.errors[0]?.message || "请求参数无效",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        error: "server_error",
        error_description: "服务器内部错误",
      },
      { status: 500 },
    );
  }
}

async function handleAuthorizationCode(body: unknown) {
  const { code, redirect_uri, client_id, client_secret, code_verifier } =
    tokenSchema.parse(body);

  // 验证客户端凭据
  const application = await prisma.application.findUnique({
    where: { clientId: client_id },
  });

  if (!application || application.clientSecret !== client_secret) {
    return NextResponse.json(
      {
        error: "invalid_client",
        error_description: "客户端认证失败",
      },
      { status: 401 },
    );
  }

  // 验证授权码
  const authCode = await prisma.code.findUnique({
    where: { code },
    include: { user: true, application: true },
  });

  if (!authCode) {
    return NextResponse.json(
      {
        error: "invalid_grant",
        error_description: "无效的授权码",
      },
      { status: 400 },
    );
  }

  // 检查授权码是否过期
  if (authCode.expiresAt < new Date()) {
    // 删除过期的授权码
    await prisma.code.delete({ where: { code } });
    return NextResponse.json(
      {
        error: "invalid_grant",
        error_description: "授权码已过期",
      },
      { status: 400 },
    );
  }

  // 检查授权码是否已被使用
  if (authCode.used) {
    return NextResponse.json(
      {
        error: "invalid_grant",
        error_description: "授权码已被使用",
      },
      { status: 400 },
    );
  }

  // 验证重定向 URI
  if (authCode.redirectUri !== redirect_uri) {
    return NextResponse.json(
      {
        error: "invalid_grant",
        error_description: "重定向 URI 不匹配",
      },
      { status: 400 },
    );
  }

  // 验证客户端 ID
  if (authCode.applicationId !== application.id) {
    return NextResponse.json(
      {
        error: "invalid_grant",
        error_description: "客户端 ID 不匹配",
      },
      { status: 400 },
    );
  }

  // 验证 PKCE code_verifier（如果授权时提供了 code_challenge）
  if (authCode.codeChallenge) {
    if (!code_verifier) {
      return NextResponse.json(
        {
          error: "invalid_grant",
          error_description: "缺少 code_verifier 参数",
        },
        { status: 400 },
      );
    }

    // 验证 code_verifier
    const isValidVerifier = await verifyCodeChallenge(
      code_verifier,
      authCode.codeChallenge,
      authCode.codeChallengeMethod || "S256",
    );

    if (!isValidVerifier) {
      return NextResponse.json(
        {
          error: "invalid_grant",
          error_description: "code_verifier 验证失败",
        },
        { status: 400 },
      );
    }
  }

  // 生成访问令牌和刷新令牌
  const accessToken = `at_${generateRandomKey()}`;
  const refreshToken = `rt_${generateSecretWords()}`;
  const accessTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1小时后过期
  const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30天后过期

  // 存储访问令牌
  await prisma.accessToken.create({
    data: {
      token: accessToken,
      refreshToken,
      userId: authCode.userId,
      applicationId: authCode.applicationId,
      scopes: authCode.scopes,
      expiresAt: accessTokenExpiresAt,
      refreshTokenExpiresAt,
    },
  });

  // 标记授权码已使用
  await prisma.code.update({
    where: { code },
    data: { used: true },
  });

  // 返回标准 OAuth 2.0 token 响应
  return NextResponse.json({
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: 3600, // 1小时
    refresh_token: refreshToken,
    scope: authCode.scopes.join(" "),
  });
}

async function handleRefreshToken(body: unknown) {
  const { refresh_token, client_id, client_secret } =
    refreshTokenSchema.parse(body);

  // 验证客户端凭据
  const application = await prisma.application.findUnique({
    where: { clientId: client_id },
  });

  if (!application || application.clientSecret !== client_secret) {
    return NextResponse.json(
      {
        error: "invalid_client",
        error_description: "客户端认证失败",
      },
      { status: 401 },
    );
  }

  // 查找访问令牌记录
  const tokenRecord = await prisma.accessToken.findUnique({
    where: { refreshToken: refresh_token },
    include: { user: true, application: true },
  });

  if (!tokenRecord || tokenRecord.applicationId !== application.id) {
    return NextResponse.json(
      {
        error: "invalid_grant",
        error_description: "无效的刷新令牌",
      },
      { status: 400 },
    );
  }

  // 检查刷新令牌是否过期
  if (tokenRecord.refreshTokenExpiresAt < new Date()) {
    // 删除过期的令牌
    await prisma.accessToken.delete({ where: { id: tokenRecord.id } });
    return NextResponse.json(
      {
        error: "invalid_grant",
        error_description: "刷新令牌已过期",
      },
      { status: 400 },
    );
  }

  // 生成新的访问令牌
  const newAccessToken = `at_${generateRandomKey()}`;
  const newAccessTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1小时后过期

  // 更新访问令牌
  await prisma.accessToken.update({
    where: { id: tokenRecord.id },
    data: {
      token: newAccessToken,
      expiresAt: newAccessTokenExpiresAt,
    },
  });

  // 返回新的访问令牌
  return NextResponse.json({
    access_token: newAccessToken,
    token_type: "Bearer",
    expires_in: 3600, // 1小时
    refresh_token: refresh_token, // 保持原刷新令牌
    scope: tokenRecord.scopes.join(" "),
  });
}

// PKCE code_verifier 验证函数
async function verifyCodeChallenge(
  codeVerifier: string,
  codeChallenge: string,
  codeChallengeMethod: string,
): Promise<boolean> {
  if (codeChallengeMethod === "plain") {
    // plain 方法：直接比较
    return codeVerifier === codeChallenge;
  } else if (codeChallengeMethod === "S256") {
    // S256 方法：SHA256 hash + base64url 编码
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = new Uint8Array(hashBuffer);

    // 转换为 base64url 编码
    const base64 = btoa(String.fromCharCode(...hashArray));
    const base64url = base64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    return base64url === codeChallenge;
  }

  return false;
}
