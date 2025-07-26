import { getCurrentUser } from "@/actions/user";
import { auth } from "@/auth";
import {
  CalendarIcon,
  KeyIcon,
  Package2Icon,
  ShieldCheckIcon,
} from "lucide-react";

import { getUserActiveTokenCount } from "@/lib/dto/access-token";
import { getUserApplicationCount } from "@/lib/dto/application";
import { getUserAuthorizationCount } from "@/lib/dto/authorization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simple time formatter
function formatMemberSince(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return `${diffInDays} days`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months > 1 ? "s" : ""}`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years > 1 ? "s" : ""}`;
  }
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            Please sign in to view your dashboard.
          </p>
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
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user.name || user.username || "User"}!
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              My Applications
            </CardTitle>
            <Package2Icon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appCount}</div>
            <p className="text-muted-foreground text-xs">
              {appCount === 0
                ? "No applications created yet"
                : `${appCount} application${appCount > 1 ? "s" : ""} created`}
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Authorized Apps
            </CardTitle>
            <ShieldCheckIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authCount}</div>
            <p className="text-muted-foreground text-xs">
              {authCount === 0
                ? "No authorized applications"
                : `${authCount} app${authCount > 1 ? "s" : ""} authorized`}
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tokens</CardTitle>
            <KeyIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tokenCount}</div>
            <p className="text-muted-foreground text-xs">
              {tokenCount === 0
                ? "No active tokens"
                : `${tokenCount} token${tokenCount > 1 ? "s" : ""} active`}
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            <CalendarIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatMemberSince(new Date(user.createdAt))}
            </div>
            <p className="text-muted-foreground text-xs">Account created</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-muted/30 border-border/50 rounded-lg border p-6">
          <h2 className="mb-2 text-lg font-semibold">Quick Start</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Get started with OAuth 2.0 by creating your first application or
            managing your authorized apps.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/dashboard/applications/new"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              Create Application
            </a>
            <a
              href="/dashboard/authorization"
              className="border-border bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
            >
              Manage Authorizations
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
