import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { UmamiAnalytics } from "@/components/analytics/umami-analytics";

import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "数字牧民 Connect | 基于 Discourse SSO 的 OAuth 2.0 认证平台",
  description:
    "一个基于 Discourse SSO 的身份认证系统，支持 OAuth 2.0 协议，让用户使用已有的数字牧民账号登录到您的应用程序。",
  keywords: "Discourse, SSO, OAuth, 认证, 授权, 身份验证, 数字牧民",
  authors: [{ name: "Tuluobo" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider>
          <Suspense>
            <Providers>{children}</Providers>
          </Suspense>
          <Toaster />
        </NextIntlClientProvider>
        <GoogleAnalytics />
        <UmamiAnalytics />
        <script async src="/env.js" />
      </body>
    </html>
  );
}
