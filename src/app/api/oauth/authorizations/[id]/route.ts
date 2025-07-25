import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";

interface Context {
  params: {
    id: string;
  };
}

export async function DELETE(request: NextRequest, { params }: Context) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const authorizationId = params.id;

    // 检查授权记录是否存在且属于当前用户
    const authorization = await prisma.authorization.findFirst({
      where: {
        id: authorizationId,
        userId: session.user.id,
      },
    });

    if (!authorization) {
      return NextResponse.json({ error: "授权记录不存在" }, { status: 404 });
    }

    // 删除相关的访问令牌
    await prisma.accessToken.deleteMany({
      where: {
        userId: session.user.id,
        applicationId: authorization.applicationId,
      },
    });

    // 删除相关的未使用授权码
    await prisma.code.deleteMany({
      where: {
        userId: session.user.id,
        applicationId: authorization.applicationId,
        used: false,
      },
    });

    // 删除授权记录
    await prisma.authorization.delete({
      where: {
        id: authorizationId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "授权已撤销",
    });
  } catch (error) {
    console.error("撤销授权失败:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
