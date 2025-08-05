export const LOCALES = ["en", "zh-cn"];
export const DEFAULT_LOCALE = "en";
export const LOCALE_MAPS: Record<string, string> = {
  en: "English",
  "zh-cn": "中文",
};

export type Locale = (typeof LOCALES)[number];
