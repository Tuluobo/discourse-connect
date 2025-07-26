"use client";

import { useState } from "react";
import { CalendarIcon, SearchIcon, ShieldCheckIcon } from "lucide-react";

import { type AuthorizationWithRelations } from "@/lib/dto/authorization";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AuthorizationCard } from "./authorization-card";

// Simple time ago formatter
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}

interface AuthorizationViewProps {
  initialAuthorizations: AuthorizationWithRelations[];
}

function AuthorizationEmpty() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="border-border flex size-16 items-center justify-center rounded-full border-2">
        <ShieldCheckIcon className="text-muted-foreground size-8" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">No Authorized Applications</h2>
        <p className="text-muted-foreground max-w-md text-sm">
          You haven&apos;t authorized any applications yet. When you grant
          access to applications, they will appear here and you can manage their
          permissions.
        </p>
      </div>
    </div>
  );
}

export function AuthorizationView({
  initialAuthorizations,
}: AuthorizationViewProps) {
  const [authorizations, setAuthorizations] = useState(initialAuthorizations);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRevoke = (authorizationId: string) => {
    setAuthorizations((prev) =>
      prev.filter((auth) => auth.id !== authorizationId),
    );
  };

  const filteredAuthorizations = authorizations
    .filter((auth) => {
      const matchesSearch =
        auth.application.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        auth.application.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesSearch;
    })
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <ShieldCheckIcon className="text-muted-foreground h-6 w-6" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Authorized Applications
            </h1>
            <p className="text-muted-foreground">
              Manage applications that have access to your account
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      {authorizations.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">Total Authorized</span>
            </div>
            <p className="mt-1 text-2xl font-bold">{authorizations.length}</p>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">Recent Authorization</span>
            </div>
            <p className="mt-1 text-sm font-medium">
              {authorizations.length > 0
                ? formatTimeAgo(
                    new Date(
                      Math.max(
                        ...authorizations.map((auth) =>
                          new Date(auth.createdAt).getTime(),
                        ),
                      ),
                    ),
                  )
                : "None"}
            </p>
          </div>
        </div>
      )}

      {/* Search */}
      {authorizations.length > 0 && (
        <div className="relative max-w-md">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Results count */}
      {authorizations.length > 0 &&
        filteredAuthorizations.length !== authorizations.length && (
          <div className="text-muted-foreground text-sm">
            Showing {filteredAuthorizations.length} of {authorizations.length}{" "}
            applications
          </div>
        )}

      {/* Authorization List */}
      {authorizations.length === 0 ? (
        <AuthorizationEmpty />
      ) : filteredAuthorizations.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No applications match your search criteria.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSearchTerm("")}
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredAuthorizations.map((authorization) => (
            <AuthorizationCard
              key={authorization.id}
              authorization={authorization}
              onRevoke={handleRevoke}
            />
          ))}
        </div>
      )}
    </div>
  );
}
