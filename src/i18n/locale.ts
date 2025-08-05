"use server";

import { cookies } from "next/headers";

import { LOCALE_NAME } from "@/lib/constants";

import { DEFAULT_LOCALE, Locale } from "./config";

export async function getUserLocale() {
  return (await cookies()).get(LOCALE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(LOCALE_NAME, locale);
}
