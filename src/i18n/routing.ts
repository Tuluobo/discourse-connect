import { Locale } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const locales = ["en", "zh-cn"] as const;

export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
});
