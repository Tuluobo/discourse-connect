import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().optional(),
    AUTH_TRUST_HOST: z.string().default("true"),
    NEXTAUTH_URL: z.string().url().optional(),
    AUTH_SECRET: z.string().optional(),
    DISCOURSE_HOST: z.string().optional(),
    DISCOURSE_SECRET: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_HOST_URL: z.string().optional(),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
    NEXT_PUBLIC_UMAMI_SCRIPT: z.string().optional(),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_UMAMI_SCRIPT: process.env.NEXT_PUBLIC_UMAMI_SCRIPT,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
  },
});
