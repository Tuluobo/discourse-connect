"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  AlertTriangle,
  Calendar,
  Clock,
  Eye,
  MoreHorizontal,
  RefreshCw,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSpinner from "@/components/dashboard/loading-spinner";
import { ApplicationLogo } from "@/components/oauth/application-logo";
import { ScopePermissions } from "@/components/oauth/scope-permissions";

interface Authorization {
  id: string;
  scopes: string[];
  createdAt: string;
  expiresAt: string;
  lastUsed?: string;
  application: {
    id: string;
    name: string;
    logoUri?: string;
    description?: string;
    user: {
      name?: string;
      username: string;
    };
  };
}

export function AuthorizationsClient() {
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [selectedAuth, setSelectedAuth] = useState<Authorization | null>(null);

  const fetchAuthorizations = async () => {
    try {
      const response = await fetch("/api/oauth/authorizations");
      if (!response.ok) {
        throw new Error("获取授权列表失败");
      }
      const data = await response.json();
      setAuthorizations(data.authorizations || []);
    } catch (error) {
      console.error("获取授权列表失败:", error);
      toast.error("获取授权列表失败", {
        description: "请刷新页面重试",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorizations();
  }, []);

  const revokeAuthorization = async (authId: string) => {
    setRevoking(authId);
    try {
      const response = await fetch(`/api/oauth/authorizations/${authId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "撤销授权失败");
      }

      setAuthorizations((prev) => prev.filter((auth) => auth.id !== authId));
      toast.success("授权已撤销", {
        description: "该应用将无法再访问您的账户信息",
      });
    } catch (error) {
      console.error("撤销授权失败:", error);
      toast.error("撤销授权失败", {
        description: error instanceof Error ? error.message : "请稍后重试",
      });
    } finally {
      setRevoking(null);
      setSelectedAuth(null);
    }
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) <= new Date();
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (authorizations.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Shield className="text-muted-foreground mb-4 h-16 w-16" />
          <h3 className="mb-2 text-lg font-medium">暂无授权应用</h3>
          <p className="text-muted-foreground text-center">
            您还没有授权任何第三方应用访问您的账户
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          共 {authorizations.length} 个已授权的应用
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchAuthorizations}
          disabled={loading}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          刷新
        </Button>
      </div>

      {authorizations.map((auth) => (
        <Card
          key={auth.id}
          className={
            isExpired(auth.expiresAt) ? "border-muted bg-muted/20" : ""
          }
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-1 items-center space-x-3">
                <ApplicationLogo
                  src={auth.application.logoUri}
                  alt={auth.application.name}
                  size="md"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">
                      {auth.application.name}
                    </CardTitle>
                    {isExpired(auth.expiresAt) && (
                      <Badge variant="secondary" className="text-xs">
                        已过期
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mt-1 flex items-center">
                    <User className="mr-1 h-3 w-3" />由{" "}
                    {auth.application.user.name ||
                      auth.application.user.username}{" "}
                    开发
                  </CardDescription>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedAuth(auth)}>
                    <Eye className="mr-2 h-4 w-4" />
                    查看详情
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setSelectedAuth(auth)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    撤销授权
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {auth.application.description && (
              <p className="text-muted-foreground text-sm">
                {auth.application.description}
              </p>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-medium">已授权权限:</h4>
              <ScopePermissions scopes={auth.scopes} showTitle={false} />
            </div>

            <div className="text-muted-foreground grid grid-cols-1 gap-4 text-xs md:grid-cols-3">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                授权时间:{" "}
                {format(new Date(auth.createdAt), "yyyy年MM月dd日", {
                  locale: zhCN,
                })}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                过期时间:{" "}
                {format(new Date(auth.expiresAt), "yyyy年MM月dd日", {
                  locale: zhCN,
                })}
              </div>
              {auth.lastUsed && (
                <div className="flex items-center">
                  <Eye className="mr-1 h-3 w-3" />
                  最后使用:{" "}
                  {format(new Date(auth.lastUsed), "yyyy年MM月dd日", {
                    locale: zhCN,
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* 撤销授权确认对话框 */}
      <AlertDialog
        open={!!selectedAuth}
        onOpenChange={() => setSelectedAuth(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="text-destructive mr-2 h-5 w-5" />
              撤销应用授权
            </AlertDialogTitle>
            <AlertDialogDescription>
              您确定要撤销对 <strong>{selectedAuth?.application.name}</strong>{" "}
              的授权吗？
              <br />
              <br />
              撤销后，该应用将无法再访问您的账户信息，您需要重新授权才能继续使用。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                selectedAuth && revokeAuthorization(selectedAuth.id)
              }
              disabled={!!revoking}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {revoking === selectedAuth?.id ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  撤销中...
                </>
              ) : (
                "确认撤销"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
