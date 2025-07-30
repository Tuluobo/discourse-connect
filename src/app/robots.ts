import { MetadataRoute } from "next";

import { env } from "@/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXT_PUBLIC_HOST_URL || "https://connect.shuzimumin.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/oauth2/",
        "/authorize/",
        "/sign-in/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
