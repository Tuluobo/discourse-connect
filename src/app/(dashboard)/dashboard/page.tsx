import { auth } from "@/auth";
import { Package2Icon } from "lucide-react";

import { getUserApplicationCount } from "@/lib/dto/application";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  const appCount = session?.user?.id
    ? await getUserApplicationCount(session.user.id)
    : 0;

  return (
    <>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">应用数量</CardTitle>
            <Package2Icon className="size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appCount}</div>
            <p className="text-muted-foreground text-xs">
              {appCount === 0 ? "还没有创建应用" : `已创建 ${appCount} 个应用`}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
