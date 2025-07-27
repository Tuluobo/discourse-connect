import { Suspense } from "react";
import { getUserAuthorizations } from "@/actions/authorization";

import { Skeleton } from "@/components/ui/skeleton";
import { AuthorizationView } from "@/components/authorization/authorization-view";

// Force dynamic rendering to avoid static generation issues with auth
export const dynamic = "force-dynamic";

function AuthorizationSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg border p-4">
            <Skeleton className="mb-2 h-4 w-32" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* Search skeleton */}
      <div className="max-w-md">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-8 w-8" />
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function AuthorizationContent() {
  try {
    const authorizations = await getUserAuthorizations();
    return <AuthorizationView initialAuthorizations={authorizations} />;
  } catch {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Failed to Load Authorizations
          </h2>
          <p className="text-muted-foreground mt-2">
            There was an error loading your authorized applications. Please try
            refreshing the page.
          </p>
        </div>
      </div>
    );
  }
}

export default function AuthorizationPage() {
  return (
    <Suspense fallback={<AuthorizationSkeleton />}>
      <AuthorizationContent />
    </Suspense>
  );
}
