import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { logger } from "./lib/logger";
import LogIDGenerator from "./lib/logid";

const { auth } = NextAuth(authConfig);

const generator = new LogIDGenerator();

export default auth((req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const logid = generator.logid();
  logger.trace(`Path: ${path}, Logid: ${logid}`);

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
