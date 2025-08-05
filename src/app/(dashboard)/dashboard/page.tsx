import { getCurrentUser } from "@/actions/user";
import { auth } from "@/auth";
import {
  CalendarIcon,
  KeyIcon,
  Package2Icon,
  ShieldCheckIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getUserActiveTokenCount } from "@/lib/dto/access-token";
import { getUserApplicationCount } from "@/lib/dto/application";
import { getUserAuthorizationCount } from "@/lib/dto/authorization";
import { formatMemberSince } from "@/lib/time";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  const t = await getTranslations("dashboard");

  if (!session?.user?.id) {
    return (
      <>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        </div>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">{t("signInPrompt")}</p>
        </div>
      </>
    );
  }

  const [user, appCount, authCount, tokenCount] = await Promise.all([
    getCurrentUser(),
    getUserApplicationCount(session.user.id),
    getUserAuthorizationCount(session.user.id),
    getUserActiveTokenCount(session.user.id),
  ]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("welcome", { name: user.name || user.username || "User" })}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.myApplications")}
            </CardTitle>
            <Package2Icon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appCount}</div>
            <p className="text-muted-foreground text-xs">
              {appCount === 0
                ? t("counts.applications.none")
                : appCount === 1
                  ? t("counts.applications.single")
                  : t("counts.applications.multiple", { count: appCount })}
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.authorizedApps")}
            </CardTitle>
            <ShieldCheckIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authCount}</div>
            <p className="text-muted-foreground text-xs">
              {authCount === 0
                ? t("counts.authorizations.none")
                : authCount === 1
                  ? t("counts.authorizations.single")
                  : t("counts.authorizations.multiple", { count: authCount })}
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.activeTokens")}
            </CardTitle>
            <KeyIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tokenCount}</div>
            <p className="text-muted-foreground text-xs">
              {tokenCount === 0
                ? t("counts.tokens.none")
                : tokenCount === 1
                  ? t("counts.tokens.single")
                  : t("counts.tokens.multiple", { count: tokenCount })}
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("stats.memberSince")}
            </CardTitle>
            <CalendarIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMemberSince(new Date(user.createdAt), (key, params) =>
                t(`counts.${key}`, params),
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              {t("stats.accountCreated")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-muted/30 border-border/50 rounded-lg border p-6">
          <h2 className="mb-2 text-lg font-semibold">
            {t("quickStart.title")}
          </h2>
          <p className="text-muted-foreground mb-4 text-sm">
            {t("quickStart.description")}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/applications"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              {t("quickStart.createApp")}
            </a>
            <a
              href="/authorization"
              className="border-border bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
            >
              {t("quickStart.manageAuth")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
