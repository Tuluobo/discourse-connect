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
      const redirectTo = await signIn({
        ...searchParamsRecord,
        redirectTo: "/dashboard",
        redirect: false,
      });
      setIsLoading(false);
      router.push(redirectTo);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

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
