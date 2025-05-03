import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_TRUST_HOST: z.string().default("true"),
    NEXTAUTH_URL: z.string().url().optional(),
    AUTH_SECRET: z.string().min(16),
    DISCOURSE_HOST: z.string().min(1),
    DISCOURSE_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_HOST_URL: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
  },
});
