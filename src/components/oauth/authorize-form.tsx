"use client";

import { useState } from "react";
import { Application } from "@prisma/client";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AuthorizeFormProps {
  application: Application;
  scopes: string[];
  onAuthorize: () => void;
  onDeny: () => void;
}

export function AuthorizeForm({
  application,
  scopes,
  onAuthorize,
  onDeny,
}: AuthorizeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("authorize");

  const handleAuthorize = async () => {
    setIsLoading(true);
    try {
      await onAuthorize();
    } finally {
      setIsLoading(false);
    }
  };

  const getScopeDescription = (scope: string) => {
    const scopeKey = `scopes.${scope}`;
    const translated = t(scopeKey);
    // If translation key doesn't exist, return the scope as is
    return translated === scopeKey ? scope : translated;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200">
            {application.logoUri ? (
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarImage src={application.logoUri} alt={application.name} />
                <AvatarFallback className="rounded-lg">
                  {application.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 font-semibold text-white">
                {application.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <CardTitle className="text-xl">{t("title")}</CardTitle>
          <CardDescription>
            {t("requestAccess", { appName: application.name })}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">
              {t("permissions")}
            </h3>
            <ul className="space-y-2">
              {scopes.map((scope) => (
                <li key={scope} className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {scope}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {getScopeDescription(scope)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {application.description && (
            <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-600">
              <strong>{t("appDescription")}</strong> {application.description}
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              onClick={handleAuthorize}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? t("buttons.processing") : t("buttons.authorize")}
            </Button>
            <Button
              variant="outline"
              onClick={onDeny}
              disabled={isLoading}
              className="flex-1"
            >
              {t("buttons.deny")}
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500">
            {t("redirectNotice", { appName: application.name })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
