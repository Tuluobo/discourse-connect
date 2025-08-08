"use client";

import { EarthIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ComingSoon() {
  const t = useTranslations("comingSoon");

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        <EarthIcon size={72} />
        <h1 className="text-4xl leading-tight font-bold">{t("title")}</h1>
        <p className="text-muted-foreground text-center">
          {t("description")} <br />
          {t("stayTuned")}
        </p>
      </div>
    </div>
  );
}
