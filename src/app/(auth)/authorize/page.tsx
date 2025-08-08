import { Suspense } from "react";
import Link from "next/link";
import { MessageCircleCode } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { UserAuthorize } from "@/components/auth/user-authorize";

export default async function AuthorizePage() {
  const t = await getTranslations("authPage");

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <MessageCircleCode className="mx-auto size-12" />
        <div className="text-2xl font-semibold tracking-tight">
          <span>{t("welcomeTo")}</span>{" "}
          <span style={{ fontFamily: "Bahamas Bold" }}>{t("community")}</span>
        </div>
      </div>
      <div>
        <Suspense>
          <UserAuthorize />
        </Suspense>
      </div>
      <p className="text-muted-foreground px-8 text-center text-sm">
        {t("agreement")}{" "}
        <Link
          href="/terms"
          className="hover:text-brand underline underline-offset-4"
        >
          {t("termsOfService")}
        </Link>{" "}
        {t("and")}{" "}
        <Link
          href="/privacy"
          className="hover:text-brand underline underline-offset-4"
        >
          {t("privacyPolicy")}
        </Link>
        .
      </p>
    </div>
  );
}
