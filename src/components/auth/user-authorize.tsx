"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/actions/sign-in";
import { useTranslations } from "next-intl";

export function UserAuthorize() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | unknown>(null);
  const router = useRouter();
  const t = useTranslations("userAuthorize");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <p className="text-center">{t("loginError")}</p>
      ) : (
        <p className="text-center">{t("verifying")}</p>
      )}
    </div>
  );
}
