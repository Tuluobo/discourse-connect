import Link from "next/link";
import { useTranslations } from "next-intl";

import DynamicLogo from "../shared/dynamic-logo";
import { Icons } from "../shared/icons";

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-background/95 w-full border-t backdrop-blur-sm">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 max-w-md space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <DynamicLogo />
              <span>{t("brand")}</span>
            </Link>
            <p className="text-muted-foreground text-sm">{t("description")}</p>
            <div className="flex gap-4">
              <a
                href="https://github.com/Tuluobo/discourse-connect"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icons.github className="size-5" />
                <span className="sr-only">{t("social.github")}</span>
              </a>
              <a
                href="https://x.com/Tuluobo"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icons.twitter className="size-5" />
                <span className="sr-only">{t("social.twitter")}</span>
              </a>
              <a
                href="https://shuzimumin.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icons.discord className="size-5" />
                <span className="sr-only">{t("social.community")}</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">{t("sections.products")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://shuzimumin.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("links.community")}
                </a>
              </li>
              <li>
                <a
                  href="https://lian.to"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("links.lianTo")}
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">{t("sections.resources")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/Tuluobo/discourse-connect"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("links.github")}
                </a>
              </li>
              <li>
                <a
                  href="http://shuzimumin.com/u/evil"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("links.contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border/40 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
          <p className="text-muted-foreground text-xs">
            <Link href="/privacy-policy">{t("privacyPolicy")}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
