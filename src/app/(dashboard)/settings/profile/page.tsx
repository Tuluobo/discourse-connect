import { Suspense } from "react";
import { getCurrentUser } from "@/actions/user";
import { getTranslations } from "next-intl/server";

import { Skeleton } from "@/components/ui/skeleton";
import { ProfileView } from "@/components/profile/profile-view";

// Force dynamic rendering to avoid static generation issues with auth
export const dynamic = "force-dynamic";

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Profile card skeleton */}
      <div className="space-y-6 rounded-lg border p-6">
        {/* Avatar and basic info */}
        <div className="flex items-start gap-6">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        {/* Info sections */}
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="rounded-lg border p-3">
                    <Skeleton className="mb-1 h-3 w-20" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Status section */}
        <div className="rounded-lg border p-4">
          <Skeleton className="mb-3 h-6 w-32" />
          <Skeleton className="mb-1 h-4 w-24" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </div>
  );
}

async function ProfileContent() {
  const t = await getTranslations("profile.error");

  try {
    const user = await getCurrentUser();
    return <ProfileView user={user} />;
  } catch {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            {t("failedToLoad")}
          </h2>
          <p className="text-muted-foreground mt-2">
            {t("loadErrorDescription")}
          </p>
        </div>
      </div>
    );
  }
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
