"use client";

import { useState } from "react";
import { deleteCurrentUser } from "@/actions/user";
import {
  AlertTriangleIcon,
  CalendarIcon,
  CrownIcon,
  MailIcon,
  ShieldIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { type User } from "@/lib/dto/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

// Simple time formatter
function formatDate(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale || "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getRoleIcon(role: string) {
  switch (role) {
    case "ADMIN":
      return <CrownIcon className="h-4 w-4" />;
    case "USER":
    default:
      return <ShieldIcon className="h-4 w-4" />;
  }
}

function getRoleColor(role: string) {
  switch (role) {
    case "ADMIN":
      return "bg-orange-500/10 text-orange-700 border-orange-500/20";
    case "USER":
    default:
      return "bg-blue-500/10 text-blue-700 border-blue-500/20";
  }
}

interface ProfileViewProps {
  user: User;
}

export function ProfileView({ user }: ProfileViewProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteCurrentUser();
      toast.success(t("toast.deleteSuccess"));
    } catch (error) {
      toast.error(t("toast.deleteFailed"));
      console.error("Error deleting account:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <UserIcon className="text-muted-foreground h-6 w-6" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="from-background to-muted/20 relative overflow-hidden border-0 bg-gradient-to-br shadow-sm">
        <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-50" />

        <CardHeader className="relative pb-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="ring-background h-20 w-20 shadow-lg ring-4">
                <AvatarImage
                  src={user.avatarUrl || undefined}
                  alt={user.name || t("unknownUser")}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : user.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="bg-background absolute -right-1 -bottom-1 rounded-full p-1 shadow-sm">
                {getRoleIcon(user.role)}
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl font-bold">
                  {user.name || t("unknownUser")}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={`font-medium ${getRoleColor(user.role)}`}
                >
                  {tCommon(`roles.${user.role}`)}
                </Badge>
              </div>
              <div className="space-y-1">
                <CardDescription className="text-base font-medium">
                  @{user.username || user.email?.split("@")[0] || "user"}
                </CardDescription>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MailIcon className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6">
          {/* User Information */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                {t("sections.accountDetails")}
              </h3>

              <div className="space-y-3">
                <div className="bg-muted/30 border-border/50 flex items-center gap-3 rounded-lg border p-3">
                  <CalendarIcon className="text-muted-foreground h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      {t("fields.memberSince")}
                    </p>
                    <p className="font-medium">
                      {formatDate(new Date(user.createdAt))}
                    </p>
                  </div>
                </div>

                {user.updatedAt !== user.createdAt && (
                  <div className="bg-muted/30 border-border/50 flex items-center gap-3 rounded-lg border p-3">
                    <CalendarIcon className="text-muted-foreground h-4 w-4" />
                    <div>
                      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                        {t("fields.lastUpdated")}
                      </p>
                      <p className="font-medium">
                        {formatDate(new Date(user.updatedAt))}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                {t("sections.additionalInfo")}
              </h3>

              <div className="space-y-3">
                <div className="bg-muted/30 border-border/50 flex items-center gap-3 rounded-lg border p-3">
                  <ShieldIcon className="text-muted-foreground h-4 w-4" />
                  <div>
                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      {t("fields.moderatorStatus")}
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${user.moderator ? "bg-green-500" : "bg-gray-400"}`}
                      ></div>
                      <p className="font-medium">
                        {user.moderator
                          ? t("status.moderator")
                          : t("status.regularUser")}
                      </p>
                    </div>
                  </div>
                </div>

                {user.groups && user.groups.length > 0 && (
                  <div className="bg-muted/30 border-border/50 flex items-start gap-3 rounded-lg border p-3">
                    <UsersIcon className="text-muted-foreground mt-0.5 h-4 w-4" />
                    <div className="min-w-0 flex-1">
                      <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                        {t("fields.groups")}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {user.groups.map((group) => (
                          <Badge
                            key={group}
                            variant="outline"
                            className="bg-background/80 border-0 text-xs font-medium shadow-sm"
                          >
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-muted/30 border-border/50 rounded-lg border p-4">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <div className="bg-primary h-1.5 w-1.5 rounded-full" />
              {t("sections.accountStatus")}
            </h3>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-green-700">
                {t("status.activeAccount")}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              {t("status.activeDescription")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-destructive/10 flex h-8 w-8 items-center justify-center rounded-lg">
              <AlertTriangleIcon className="text-destructive h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-destructive text-lg font-semibold">
                {t("dangerZone.title")}
              </CardTitle>
              <CardDescription>{t("dangerZone.subtitle")}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="border-destructive/20 bg-background space-y-4 rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-destructive font-medium">
                  {t("dangerZone.deleteAccount.title")}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {t("dangerZone.deleteAccount.description")}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="ml-4 shrink-0"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                {t("dangerZone.deleteAccount.button")}
              </Button>
            </div>

            <div className="bg-muted/50 border-muted rounded-md border p-3">
              <p className="text-muted-foreground mb-2 text-xs font-medium">
                {t("dangerZone.deleteAccount.willDelete")}
              </p>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>{t("dangerZone.deleteAccount.items.profile")}</li>
                <li>{t("dangerZone.deleteAccount.items.authorizations")}</li>
                <li>{t("dangerZone.deleteAccount.items.tokens")}</li>
                <li>{t("dangerZone.deleteAccount.items.applications")}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title={t("deleteDialog.title")}
        desc={t("deleteDialog.description")}
        confirmText={t("deleteDialog.confirmText")}
        cancelBtnText={t("deleteDialog.cancelText")}
        handleConfirm={handleDeleteAccount}
        isLoading={isDeleting}
        destructive={true}
      />
    </div>
  );
}
