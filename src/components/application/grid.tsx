import { useState } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Application } from "@/lib/dto/application";

import LongText from "../shared/long-text";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CardActions } from "./card-actions";

function SecretField({ value, label }: { value: string; label: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("application.grid");

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("copySuccess", { label }));
    } catch {
      toast.error(t("copyFailed"));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <code className="bg-muted flex-1 rounded px-2 py-1 font-mono text-xs">
        {isVisible ? value : "•".repeat(12)}
      </code>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(!isVisible)}
        className="h-6 w-6 p-0"
      >
        {isVisible ? (
          <EyeOff className="h-3 w-3" />
        ) : (
          <Eye className="h-3 w-3" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => copyToClipboard(value)}
        className="h-6 w-6 p-0"
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}

export default function ApplicationGrid({ data }: { data: Application[] }) {
  const t = useTranslations("application.grid");
  return (
    <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
      {data.map((app) => (
        <li key={app.id} className="rounded-lg border p-4 hover:shadow-md">
          {/* Header with logo and menu */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-muted flex size-10 items-center justify-center rounded-lg p-2">
                {app.logoUri ? (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={app.logoUri} />
                    <AvatarFallback className="rounded-lg">
                      {app.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <span className="text-sm font-medium">
                    {app.name[0].toUpperCase()}
                  </span>
                )}
              </div>
              <Badge variant={app.isActived ? "default" : "secondary"}>
                {app.isActived
                  ? t("status.activated")
                  : t("status.notActivated")}
              </Badge>
            </div>
            <CardActions app={app} />
          </div>

          {/* App info */}
          <div className="space-y-3">
            <div>
              <h2 className="mb-1 font-semibold">
                <LongText className="max-w-xs">{app.name}</LongText>
              </h2>
              {app.description && (
                <LongText className="max-width">{app.description}</LongText>
              )}
            </div>

            {/* App ID */}
            <div>
              <label className="text-muted-foreground text-xs font-medium">
                {t("clientId")}
              </label>
              <SecretField value={app.clientId} label={t("clientId")} />
            </div>

            {/* App Secret */}
            <div>
              <label className="text-muted-foreground text-xs font-medium">
                {t("clientSecret")}
              </label>
              <SecretField value={app.clientSecret} label={t("clientSecret")} />
            </div>

            {/* Website link */}
            {app.home && (
              <div>
                <a
                  href={app.home}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {t("visitWebsite")} →
                </a>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
