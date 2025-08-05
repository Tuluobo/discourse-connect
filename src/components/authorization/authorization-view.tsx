"use client";

import { useState } from "react";
import { CalendarIcon, SearchIcon, ShieldCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { type AuthorizationWithRelations } from "@/lib/dto/authorization";
import { formatRelativeTime } from "@/lib/time";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AuthorizationCard } from "./authorization-card";

interface AuthorizationViewProps {
  initialAuthorizations: AuthorizationWithRelations[];
}

function AuthorizationEmpty() {
  const t = useTranslations("authorization.view");
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="border-border flex size-16 items-center justify-center rounded-full border-2">
        <ShieldCheckIcon className="text-muted-foreground size-8" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">{t("empty.title")}</h2>
        <p className="text-muted-foreground max-w-md text-sm">
          {t("empty.description")}
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
  const t = useTranslations("authorization");

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
              {t("view.title")}
            </h1>
            <p className="text-muted-foreground">{t("view.subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      {authorizations.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">
                {t("view.stats.totalAuthorized")}
              </span>
            </div>
            <p className="mt-1 text-2xl font-bold">{authorizations.length}</p>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">
                {t("view.stats.recentAuthorization")}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium">
              {authorizations.length > 0
                ? formatRelativeTime(
                    new Date(
                      Math.max(
                        ...authorizations.map((auth) =>
                          new Date(auth.createdAt).getTime(),
                        ),
                      ),
                    ),
                    t,
                    "card",
                  )
                : t("view.stats.none")}
            </p>
          </div>
        </div>
      )}

      {/* Search */}
      {authorizations.length > 0 && (
        <div className="relative max-w-md">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder={t("view.search.placeholder")}
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
            {t("view.search.results", {
              filtered: filteredAuthorizations.length,
              total: authorizations.length,
            })}
          </div>
        )}

      {/* Authorization List */}
      {authorizations.length === 0 ? (
        <AuthorizationEmpty />
      ) : filteredAuthorizations.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">{t("view.noResults.message")}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSearchTerm("")}
          >
            {t("view.noResults.clearButton")}
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
