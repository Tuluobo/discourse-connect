import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const revokeSchema = z.object({
  token: z.string().min(1, "token 是必需的"),
  token_type_hint: z.enum(["access_token", "refresh_token"]).optional(),
  client_id: z.string().min(1, "client_id 是必需的"),
  client_secret: z.string().min(1, "client_secret 是必需的"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, token_type_hint, client_id, client_secret } =
      revokeSchema.parse(body);

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

    // 尝试撤销令牌
    let tokenRevoked = false;

    if (!token_type_hint || token_type_hint === "access_token") {
      // 尝试作为访问令牌撤销
      const accessTokenRecord = await prisma.accessToken.findFirst({
        where: {
          token,
          applicationId: application.id,
        },
      });

      if (accessTokenRecord) {
        await prisma.accessToken.delete({
          where: { id: accessTokenRecord.id },
        });
        tokenRevoked = true;
      }
    }

    if (
      !tokenRevoked &&
      (!token_type_hint || token_type_hint === "refresh_token")
    ) {
      // 尝试作为刷新令牌撤销
      const refreshTokenRecord = await prisma.accessToken.findFirst({
        where: {
          refreshToken: token,
          applicationId: application.id,
        },
      });

      if (refreshTokenRecord) {
        await prisma.accessToken.delete({
          where: { id: refreshTokenRecord.id },
        });
        tokenRevoked = true;
      }
    }

    // 根据 RFC 7009，即使令牌不存在也应该返回 200
    // 这是为了防止令牌扫描攻击
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Revoke error:", error);
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
