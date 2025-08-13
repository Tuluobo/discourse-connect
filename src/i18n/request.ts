import { getRequestConfig } from "next-intl/server";

import { getUserLocale } from "./locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: {
      ...(await import(`../../messages/${locale}/public.json`)).default,
      ...(await import(`../../messages/${locale}/dashboard.json`)).default,
      ...(await import(`../../messages/${locale}/privacy.json`)).default,
      ...(await import(`../../messages/${locale}/terms.json`)).default,
    },
  };
});
