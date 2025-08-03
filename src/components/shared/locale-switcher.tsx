"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { Locale, useLocale } from "next-intl";

export default function LocaleSwitcher() {
  return (
    <div className="flex gap-3 py-5">
      <LocaleLink locale="en" />
      <LocaleLink locale="zh-cn" />
    </div>
  );
}

function LocaleLink({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const isActive = useLocale() === locale;

  return (
    <Link
      className={isActive ? "underline" : undefined}
      href={pathname}
      locale={locale}
    >
      {locale.toUpperCase()}
    </Link>
  );
}
