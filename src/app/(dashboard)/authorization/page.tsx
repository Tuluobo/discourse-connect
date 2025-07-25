import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

import LoadingSpinner from "@/components/dashboard/loading-spinner";

import { AuthorizationsClient } from "./authorizations-client";

export const metadata: Metadata = {
  title: "应用授权管理",
  description: "管理您已授权的第三方应用",
};

export default async function AuthorizationManagementPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">应用授权管理</h1>
          <p className="text-muted-foreground">
            查看和管理您已授权的第三方应用程序
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center p-8">
              <LoadingSpinner />
            </div>
          }
        >
          <AuthorizationsClient />
        </Suspense>
      </div>
    </div>
  );
}
