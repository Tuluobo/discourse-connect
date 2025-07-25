import Link from "next/link";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  searchParams: {
    error?: string;
    error_description?: string;
    client_id?: string;
    state?: string;
  };
}

const errorMessages: Record<
  string,
  { title: string; description: string; action?: string }
> = {
  invalid_request: {
    title: "请求参数无效",
    description: "授权请求包含无效或缺失的参数。请联系应用开发者检查授权链接。",
    action: "检查授权链接",
  },
  invalid_client: {
    title: "应用不存在",
    description: "请求的应用未在系统中注册或已被禁用。请联系应用开发者。",
    action: "联系开发者",
  },
  access_denied: {
    title: "拒绝授权",
    description: "您已拒绝授权该应用访问您的账户。",
    action: "返回应用",
  },
  server_error: {
    title: "服务器错误",
    description: "服务器处理请求时发生内部错误。请稍后重试。",
    action: "重试",
  },
  temporarily_unavailable: {
    title: "服务暂时不可用",
    description: "认证服务暂时不可用，请稍后重试。",
    action: "稍后重试",
  },
  invalid_scope: {
    title: "权限范围无效",
    description: "请求的权限范围无效或不被支持。请联系应用开发者。",
    action: "联系开发者",
  },
};

export default function OAuthErrorPage({ searchParams }: Props) {
  const { error, error_description, client_id, state } = searchParams;

  const errorInfo = error ? errorMessages[error] : null;
  const defaultError = {
    title: "未知错误",
    description: error_description || "发生了未知错误，请稍后重试。",
    action: "重试",
  };

  const currentError = errorInfo || defaultError;

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      {/* 错误图标和标题 */}
      <div className="flex flex-col space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">授权失败</h1>
          <p className="text-muted-foreground text-sm">无法完成授权请求</p>
        </div>
      </div>

      {/* 错误详情 */}
      <div className="space-y-4 rounded-lg border p-6">
        <div className="space-y-2">
          <h3 className="font-medium text-red-800 dark:text-red-200">
            {currentError.title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {currentError.description}
          </p>
        </div>

        {/* 错误代码显示 */}
        {error && (
          <div className="bg-muted rounded-md p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">错误代码:</span>
              <code className="bg-background rounded px-2 py-1 font-mono">
                {error}
              </code>
            </div>
            {state && (
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="font-medium">状态参数:</span>
                <code className="bg-background rounded px-2 py-1 font-mono text-xs">
                  {state}
                </code>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col space-y-3">
        {error === "server_error" || error === "temporarily_unavailable" ? (
          <Button onClick={() => window.location.reload()} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            重新尝试
          </Button>
        ) : (
          <Button onClick={() => window.history.back()} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回上一页
          </Button>
        )}

        <Button variant="outline" asChild className="w-full">
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            返回首页
          </Link>
        </Button>
      </div>

      {/* 帮助信息 */}
      <div className="text-muted-foreground space-y-2 text-center text-xs">
        <p>如果问题持续存在，请联系应用开发者或系统管理员。</p>
        {client_id && (
          <p>
            应用 ID:{" "}
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              {client_id}
            </code>
          </p>
        )}
      </div>
    </div>
  );
}
