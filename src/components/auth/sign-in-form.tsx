"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, MessageCircleCode } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface DiscourseData {
  sso_url: string;
}

export function SignInForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("signIn.form");

  const signIn = () => {
    React.startTransition(async () => {
      const response = await fetch("/api/auth/discourse", { method: "POST" });
      if (!response.ok || response.status !== 200) {
        setIsLoading(false);
        toast.error(t("errorTitle"), {
          description: response.statusText,
        });
      } else {
        const data: DiscourseData = await response.json();
        router.push(data.sso_url);
      }
    });
  };

  return (
    <div className={cn("grid gap-3", className)} {...props}>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsLoading(true);
          signIn();
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <MessageCircleCode className="mr-2 size-4" />
        )}{" "}
        {t("buttonText")}
      </button>
    </div>
  );
}
