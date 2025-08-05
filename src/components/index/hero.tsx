import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative isolate container mx-auto w-full py-20 md:py-32 lg:py-40">
      <div className="relative z-10 px-4 md:px-6">
        <div className="grid items-center gap-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div>
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition-none"
                variant="secondary"
              >
                <span className="text-primary mr-1">✦</span> {t("badge")}
              </Badge>
            </div>
            <h1 className="from-foreground via-foreground/90 to-foreground/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
              {t("title.main")}{" "}
              <span className="text-primary">{t("title.highlight")}</span>{" "}
              {t("title.suffix")}
            </h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed md:text-xl">
              {t("description")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="h-12 cursor-pointer rounded-full px-8 text-base shadow-md transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  {t("buttons.getStarted")}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <a href="https://shuzimumin.com">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 hover:border-primary/50 h-12 cursor-pointer rounded-full px-8 text-base transition-transform duration-300 hover:translate-y-[-2px]"
                >
                  {t("buttons.visitCommunity")}
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Check className="text-primary size-5" />
                <span>{t("features.discourseSSO")}</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Check className="text-primary size-5" />
                <span>{t("features.oauth2")}</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Check className="text-primary size-5" />
                <span>{t("features.secure")}</span>
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
