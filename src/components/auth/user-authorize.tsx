"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/actions/sign-in";

export function UserAuthorize() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchParamsRecord = Object.fromEntries([
    ...searchParams.entries(),
  ]) as Record<string, string>;

  const signInCallback = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      // 检查是否是 OAuth 重定向
      const oauthRedirect = searchParams.get("oauth_redirect");
      const oauthParams = searchParams.get("oauth_params");

      let redirectTo = "/dashboard";

      if (oauthRedirect === "1" && oauthParams) {
        // 解析 OAuth 参数并重定向到 OAuth 授权流程
        try {
          const params = JSON.parse(decodeURIComponent(oauthParams));
          const oauthUrl = new URL("/oauth/authorize", window.location.origin);
          Object.keys(params).forEach((key) => {
            oauthUrl.searchParams.set(key, params[key]);
          });
          redirectTo = oauthUrl.toString();
        } catch (e) {
          console.error("Failed to parse OAuth params:", e);
          redirectTo = "/dashboard";
        }
      }

      await signIn({
        ...searchParamsRecord,
        redirectTo,
        redirect: false,
      });

      setIsLoading(false);
      router.push(redirectTo);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [searchParams, router, isLoading, searchParamsRecord]);

  useEffect(() => {
    const timer = setTimeout(signInCallback, 5);
    return () => {
      clearTimeout(timer);
    };
  }, [signInCallback]);

  return (
    <div className="{className}">
      {error ? (
        <p className="text-center">登录异常，授权失败！</p>
      ) : (
        <p className="text-center">账号信息验证中，准备跳转中，请稍等...</p>
      )}
    </div>
  );
}
