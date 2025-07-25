"use client";

import { useState } from "react";
import { Loader2, Shield, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface Props {
  clientId: string;
  redirectUri: string;
  scope: string;
  state?: string;
  codeChallenge?: string;
  codeChallengeMethod?: string;
}

export function ConsentForm({
  clientId,
  redirectUri,
  scope,
  state,
  codeChallenge,
  codeChallengeMethod,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [processingType, setProcessingType] = useState<
    "approve" | "deny" | null
  >(null);

  const handleConsent = async (approved: boolean) => {
    if (isLoading) return;

    setIsLoading(true);
    setProcessingType(approved ? "approve" : "deny");

    try {
      const response = await fetch("/api/oauth/consent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          redirect_uri: redirectUri,
          scope,
          state,
          approved,
          code_challenge: codeChallenge,
          code_challenge_method: codeChallengeMethod,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("操作失败", {
          description: result.error || "请求处理失败",
        });
        return;
      }

      // 显示成功消息并准备重定向
      toast.success(approved ? "授权成功" : "已拒绝授权", {
        description: approved ? "正在重定向到应用..." : "正在返回应用...",
      });

      // 延迟一下再重定向，让用户看到反馈
      setTimeout(() => {
        window.location.href = result.redirect_uri;
      }, 800);
    } catch (error) {
      console.error("Consent error:", error);
      toast.error("操作失败", {
        description: "网络错误，请稍后重试",
      });
      setIsLoading(false);
      setProcessingType(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center space-y-3 py-4">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">
            {processingType === "approve" ? "正在授权..." : "正在拒绝..."}
          </span>
        </div>
        <p className="text-muted-foreground text-center text-xs">
          {processingType === "approve"
            ? "请稍等，我们正在处理您的授权请求"
            : "请稍等，正在返回到应用"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex space-x-3">
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleConsent(false)}
        disabled={isLoading}
      >
        <X className="mr-2 h-4 w-4" />
        拒绝
      </Button>
      <Button
        className="flex-1"
        onClick={() => handleConsent(true)}
        disabled={isLoading}
      >
        <Shield className="mr-2 h-4 w-4" />
        授权
      </Button>
    </div>
  );
}
