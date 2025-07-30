"use client";

import Script from "next/script";

export function GoogleAnalytics() {
  const gaId =
    typeof window !== "undefined"
      ? window.__ENV__?.NEXT_PUBLIC_GA_ID
      : process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              });
            `,
            }}
          />
        </>
      )}
    </>
  );
}
