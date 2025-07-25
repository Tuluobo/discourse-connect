import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    // 获取用户的所有授权记录
    const authorizations = await prisma.authorization.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        application: {
          include: {
            user: {
              select: {
                name: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 格式化返回数据
    const formattedAuthorizations = authorizations.map((auth) => ({
      id: auth.id,
      scopes: auth.scopes,
      createdAt: auth.createdAt.toISOString(),
      expiresAt: auth.expiresAt.toISOString(),
      lastUsed: auth.lastUsed?.toISOString(),
      application: {
        id: auth.application.id,
        name: auth.application.name,
        logoUri: auth.application.logoUri,
        description: auth.application.description,
        user: auth.application.user,
      },
    }));

    return NextResponse.json({
      authorizations: formattedAuthorizations,
    });
  } catch (error) {
    console.error("获取授权列表失败:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
