import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";

import authConfig from "./auth.config";
import { routing } from "./i18n/routing";
import { logger } from "./lib/logger";
import LogIDGenerator from "./lib/logid";

const { auth } = NextAuth(authConfig);
const handleI18nRouting = createMiddleware(routing);

const publicPages = [
  "/",
  "/login",
  // (/secret requires auth)
];

const generator = new LogIDGenerator();

export default auth((req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const logid = generator.logid();
  logger.trace(`Path: ${path}, Logid: ${logid}`);

  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    const resp = handleI18nRouting(req);
    resp.headers.set("X-Log-Id", logid);
    return resp;
  }

  return NextResponse.next({
    headers: {
      "X-Log-Id": logid,
    },
  });
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
