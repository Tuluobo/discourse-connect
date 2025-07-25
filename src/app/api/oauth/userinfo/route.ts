import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // 从请求头中获取 Authorization
    const authorization = request.headers.get("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "invalid_token",
          error_description: "缺少或无效的访问令牌",
        },
        { status: 401 },
      );
    }

    const accessToken = authorization.substring(7); // 移除 "Bearer " 前缀

    // 验证访问令牌
    const tokenRecord = await prisma.accessToken.findUnique({
      where: { token: accessToken },
      include: {
        user: true,
        application: true,
      },
    });

    if (!tokenRecord) {
      return NextResponse.json(
        {
          error: "invalid_token",
          error_description: "无效的访问令牌",
        },
        { status: 401 },
      );
    }

    // 检查令牌是否过期
    if (tokenRecord.expiresAt < new Date()) {
      // 删除过期的令牌
      await prisma.accessToken.delete({ where: { id: tokenRecord.id } });
      return NextResponse.json(
        {
          error: "invalid_token",
          error_description: "访问令牌已过期",
        },
        { status: 401 },
      );
    }

    // 根据 scopes 返回相应的用户信息
    const { user } = tokenRecord;
    const scopes = tokenRecord.scopes;

    // 基础信息（总是包含）
    const userInfo: Record<string, unknown> = {
      id: user.id,
      username: user.username,
    };

    // 根据 scope 添加额外信息
    if (scopes.includes("read") || scopes.includes("profile")) {
      userInfo.name = user.name;
      userInfo.email = user.email;
      userInfo.avatar_url = user.avatarUrl;
      userInfo.created_at = user.createdAt;
      userInfo.updated_at = user.updatedAt;
    }

    if (scopes.includes("admin") && user.role === "ADMIN") {
      userInfo.admin = true;
      userInfo.role = user.role;
    } else {
      userInfo.admin = false;
    }

    // 添加额外的 Discourse 相关信息
    if (user.externalId) {
      userInfo.external_id = user.externalId;
    }

    // 更新令牌的最后使用时间（可选）
    await prisma.accessToken.update({
      where: { id: tokenRecord.id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(userInfo);
  } catch (error) {
    console.error("User info error:", error);
    return NextResponse.json(
      {
        error: "server_error",
        error_description: "服务器内部错误",
      },
      { status: 500 },
    );
  }
}
