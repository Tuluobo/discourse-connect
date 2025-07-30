"use client";

import Script from "next/script";

export function UmamiAnalytics() {
  const umamiScriptUrl =
    typeof window !== "undefined"
      ? window.__ENV__?.NEXT_PUBLIC_UMAMI_SCRIPT
      : process.env.NEXT_PUBLIC_UMAMI_SCRIPT;
  const websiteId =
    typeof window !== "undefined"
      ? window.__ENV__?.NEXT_PUBLIC_UMAMI_WEBSITE_ID
      : process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <>
      {umamiScriptUrl && websiteId ? (
        <Script
          src={umamiScriptUrl}
          data-website-id={websiteId}
          strategy="afterInteractive"
          async
        />
      ) : (
        <></>
      )}
    </>
  );
}
