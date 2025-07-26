"use client";

import { useState } from "react";
import { revokeUserAuthorization } from "@/actions/authorization";
import { CalendarIcon, ExternalLinkIcon, ShieldIcon } from "lucide-react";
import { toast } from "sonner";

import { type AuthorizationWithRelations } from "@/lib/dto/authorization";
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

interface AuthorizationCardProps {
  authorization: AuthorizationWithRelations;
  onRevoke?: (authorizationId: string) => void;
}

export function AuthorizationCard({
  authorization,
  onRevoke,
}: AuthorizationCardProps) {
  const [isRevoking, setIsRevoking] = useState(false);
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);

  const handleRevoke = async () => {
    setIsRevoking(true);
    try {
      await revokeUserAuthorization(authorization.applicationId);
      toast.success("Authorization revoked successfully");
      onRevoke?.(authorization.id);
      setShowRevokeDialog(false);
    } catch (error) {
      toast.error("Failed to revoke authorization");
      console.error("Error revoking authorization:", error);
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <>
      <Card className="group from-background to-muted/20 hover:shadow-primary/5 relative overflow-hidden border-0 bg-gradient-to-br shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <div className="bg-primary/10 ring-primary/20 group-hover:bg-primary/15 flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-all duration-200 group-hover:scale-105">
                <ShieldIcon className="text-primary h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="mb-1 text-base leading-tight font-semibold">
                  {authorization.application.home ? (
                    <a
                      href={authorization.application.home}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link hover:text-primary inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span className="truncate">
                        {authorization.application.name}
                      </span>
                      <ExternalLinkIcon className="h-3.5 w-3.5 opacity-60 transition-all group-hover/link:translate-x-0.5 group-hover/link:opacity-100" />
                    </a>
                  ) : (
                    <span className="truncate">
                      {authorization.application.name}
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2 text-sm">
                  {authorization.application.description ||
                    "No description provided"}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRevokeDialog(true)}
              className="border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground ml-3 shrink-0 transition-all duration-200"
            >
              Revoke
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative pt-0">
          <div className="space-y-3">
            {/* Scopes */}
            {authorization.scopes && authorization.scopes.length > 0 && (
              <div className="bg-muted/30 ring-border/50 rounded-lg p-3 ring-1">
                <div className="mb-2 flex items-center gap-2">
                  <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                  <h4 className="text-foreground/80 text-xs font-medium tracking-wide uppercase">
                    Permissions
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {authorization.scopes.map((scope) => (
                    <Badge
                      key={scope}
                      variant="secondary"
                      className="bg-background/80 border-0 text-xs font-medium shadow-sm"
                    >
                      {scope}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="border-border/50 text-muted-foreground flex items-center justify-between border-t pt-3 text-xs">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="h-3 w-3" />
                <span>
                  Authorized {formatTimeAgo(new Date(authorization.createdAt))}
                </span>
              </div>
              {authorization.updatedAt !== authorization.createdAt && (
                <span>
                  Updated {formatTimeAgo(new Date(authorization.updatedAt))}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showRevokeDialog}
        onOpenChange={setShowRevokeDialog}
        title="Revoke Authorization"
        desc={`Are you sure you want to revoke access for "${authorization.application.name}"? This will remove all permissions and the application will no longer be able to access your account.`}
        confirmText="Revoke Access"
        cancelBtnText="Cancel"
        handleConfirm={handleRevoke}
        isLoading={isRevoking}
        destructive={true}
      />
    </>
  );
}
