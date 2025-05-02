import Link from "next/link";

import DynamicLogo from "../shared/dynamic-logo";
import { Icons } from "../shared/icons";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 max-w-md space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <DynamicLogo />
              <span>数字牧民 Connect</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              数字牧民 Connect 是一个基于 Discourse SSO (Single Sign-On)
              用户系统的 OAuth 认证平台。 通过数字牧民
              Connect，您可以让用户使用已有的数字牧民账号登录到您的应用程序，无需创建新账号。
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/Tuluobo/discourse-connect"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icons.github className="size-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://x.com/Tuluobo"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icons.twitter className="size-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://shuzimumin.com"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icons.discord className="size-5" />
                <span className="sr-only">社区</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">产品</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://shuzimumin.com"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  数字牧民社区
                </a>
              </li>
              <li>
                <a
                  href="https://lian.to"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  LIAN.TO
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">资源</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/Tuluobo/discourse-connect"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="http://shuzimumin.com/u/evil"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  联系我们
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} 数字牧民社区. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            <Link href="/privacy-policy">隐私政策</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
