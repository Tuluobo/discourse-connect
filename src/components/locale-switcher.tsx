"use client";

import { useEffect, useState, useTransition } from "react";
import { LOCALE_MAPS, LOCALES } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";
import { Globe } from "lucide-react";
import { Locale, useLocale } from "next-intl";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const [, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState("locale");
  const isMobile = useIsMobile();

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale, setCurrentLocale]);

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      setUserLocale(nextLocale);
    });
  }

  return (
    <Select
      defaultValue={locale}
      value={currentLocale}
      onValueChange={onSelectChange}
    >
      <SelectTrigger className="w-fit" showChevronDown={!isMobile}>
        <Globe className="mr-1 h-4 w-4" />
        {!isMobile && <SelectValue placeholder="Language" />}
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((cur) => (
          <SelectItem key={cur} value={cur}>
            {LOCALE_MAPS[cur]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
