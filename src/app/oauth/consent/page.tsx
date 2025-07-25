import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";
import { ApplicationLogo } from "@/components/oauth/application-logo";
import { ConsentForm } from "@/components/oauth/consent-form";
import { LoadingScreen } from "@/components/oauth/loading-screen";
import { ScopePermissions } from "@/components/oauth/scope-permissions";

interface Props {
  searchParams: {
    client_id?: string;
    redirect_uri?: string;
    scope?: string;
    state?: string;
    code_challenge?: string;
    code_challenge_method?: string;
  };
}

export default async function ConsentPage({ searchParams }: Props) {
  const {
    client_id,
    redirect_uri,
    scope,
    state,
    code_challenge,
    code_challenge_method,
  } = searchParams;

  if (!client_id || !redirect_uri) {
    redirect("/");
  }

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  // 获取应用信息
  const application = await prisma.application.findUnique({
    where: { clientId: client_id },
    include: { user: true },
  });

  if (!application) {
    const baseUrl = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";
    const errorUrl = new URL("/oauth/error", baseUrl);
    errorUrl.searchParams.set("error", "invalid_client");
    errorUrl.searchParams.set("error_description", "应用不存在或已被禁用");
    errorUrl.searchParams.set("client_id", client_id);
    if (state) {
      errorUrl.searchParams.set("state", state);
    }
    redirect(errorUrl.toString());
  }

  const scopes = scope ? scope.split(" ").filter(Boolean) : [];

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">授权确认</h1>
        <p className="text-muted-foreground text-sm">
          应用正在请求访问您的账户
        </p>
      </div>

      <div className="space-y-4 rounded-lg border p-6">
        <div className="flex items-center space-x-3">
          <ApplicationLogo
            src={application.logoUri}
            alt={application.name}
            size="md"
          />
          <div>
            <h3 className="font-medium">{application.name}</h3>
            <p className="text-muted-foreground text-sm">
              由 {application.user.name || application.user.username} 开发
            </p>
          </div>
        </div>

        {application.description && (
          <p className="text-muted-foreground text-sm">
            {application.description}
          </p>
        )}

        <ScopePermissions scopes={scopes} />
      </div>

      <Suspense
        fallback={
          <LoadingScreen
            message="准备授权..."
            submessage="正在处理应用信息，请稍候"
          />
        }
      >
        <ConsentForm
          clientId={client_id}
          redirectUri={redirect_uri}
          scope={scope || ""}
          state={state}
          codeChallenge={code_challenge}
          codeChallengeMethod={code_challenge_method}
        />
      </Suspense>

      <div className="text-muted-foreground text-center text-xs">
        点击&quot;授权&quot;即表示您同意该应用访问您的账户信息
      </div>
    </div>
  );
}
