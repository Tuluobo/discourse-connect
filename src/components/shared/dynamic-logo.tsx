"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export default function DynamicLogo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { resolvedTheme } = useTheme();
  const t = useTranslations("common.brand");

  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.png" : "/logo.png";
  return (
    <Image
      className={className}
      {...props}
      src={logoSrc}
      alt={t("logoAlt")}
      width={48}
      height={48}
    />
  );
}
