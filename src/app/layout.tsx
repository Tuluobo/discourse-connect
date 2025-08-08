import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { getTranslations } from "next-intl/server";

import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";

import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { UmamiAnalytics } from "@/components/analytics/umami-analytics";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Tuluobo" }],
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <Suspense>
            <Providers>{children}</Providers>
          </Suspense>
        </NextIntlClientProvider>
        <Toaster />
        <GoogleAnalytics />
        <UmamiAnalytics />
        <script async src="/env.js" />
      </body>
    </html>
  );
}
