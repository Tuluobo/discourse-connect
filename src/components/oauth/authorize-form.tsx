"use client";

import { useState } from "react";
import Image from "next/image";
import { Application } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  const handleAuthorize = async () => {
    setIsLoading(true);
    try {
      await onAuthorize();
    } finally {
      setIsLoading(false);
    }
  };

  const getScopeDescription = (scope: string) => {
    switch (scope) {
      case "read:user":
        return "读取您的账户信息";
      default:
        return scope;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-200">
            {application.logoUri ? (
              <Image
                className="rounded-lg object-cover"
                src={application.logoUri}
                alt={application.name}
                width={48}
                height={48}
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 font-semibold text-white">
                {application.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <CardTitle className="text-xl">授权访问</CardTitle>
          <CardDescription>
            <strong>{application.name}</strong> 请求访问您的账户
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-900">
              此应用程序将能够：
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
              <strong>应用描述：</strong> {application.description}
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              onClick={handleAuthorize}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "处理中..." : "授权"}
            </Button>
            <Button
              variant="outline"
              onClick={onDeny}
              disabled={isLoading}
              className="flex-1"
            >
              拒绝
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500">
            授权后，您将被重定向到 {application.name}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
