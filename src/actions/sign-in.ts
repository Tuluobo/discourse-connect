"use server";

import { signIn as nextSignIn } from "@/auth";

export async function signIn(data: {
  redirectTo?: string;
  redirect?: boolean;
  [key: string]: string | boolean | undefined;
}) {
  return nextSignIn("credentials", data);
}
