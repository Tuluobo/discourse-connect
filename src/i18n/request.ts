import { cookies } from "next/headers";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { LOCALE_NAME } from "@/lib/constants";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  let candidate = await requestLocale;

  if (!candidate) {
    // Read from cookie if the user is logged in
    const store = await cookies();
    candidate = store.get(LOCALE_NAME)?.value;
  }

  const locale = hasLocale(routing.locales, candidate)
    ? candidate
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
