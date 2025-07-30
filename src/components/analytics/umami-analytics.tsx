"use client";

import Script from "next/script";

import { env } from "@/env";

export function UmamiAnalytics() {
  const umamiScriptUrl = env.NEXT_PUBLIC_UMAMI_SCRIPT;
  const websiteId = env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

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
