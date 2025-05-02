import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { discourseCallbackVerify } from "./lib/discourse/verify";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      name: "Discourse Connect",
      credentials: {
        sso: {},
        sig: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.sso || !credentials?.sig) {
          return null;
        }

        const sso = credentials.sso as string;
        const sig = credentials.sig as string;
        const user = await discourseCallbackVerify(sso, sig);
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
