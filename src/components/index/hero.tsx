import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container relative isolate mx-auto w-full py-20 md:py-32 lg:py-40">
      <div className="relative z-10 px-4 md:px-6">
        <div className="grid items-center gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div>
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition-none"
                variant="secondary"
              >
                <span className="mr-1 text-primary">✦</span> 身份认证
              </Badge>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
              基于 Discourse SSO 的{" "}
              <span className="text-primary">OAuth 2.0</span> 认证平台
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
              让用户使用已有的数字牧民账号登录到您的应用程序，无需创建新账号，提供安全、便捷的身份验证服务。
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-12 cursor-pointer rounded-full px-8 text-base shadow-md transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  开始使用
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <a href="https://shuzimumin.com">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 cursor-pointer rounded-full border-primary/20 px-8 text-base transition-transform duration-300 hover:translate-y-[-2px] hover:border-primary/50"
                >
                  访问数字牧民社区
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-5 text-primary" />
                <span>基于 Discourse SSO</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-5 text-primary" />
                <span>OAuth 2.0 协议</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-5 text-primary" />
                <span>安全可靠</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_30%,var(--muted),transparent_35%)] blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_70%,var(--muted),transparent_10%)] blur-3xl"></div>
    </section>
  );
}
