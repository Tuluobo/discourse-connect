"use client";

import { useState } from "react";
import { deleteApplicationAction } from "@/actions/application";
import { AlertTriangleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Application } from "@/lib/dto/application";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentApplication: Application;
}

export function ApplicationsDeleteDialog({
  open,
  onOpenChange,
  currentApplication,
}: Props) {
  const [value, setValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const t = useTranslations("application.deleteDialog");

  const handleDelete = async () => {
    if (value.trim() !== currentApplication.name) return;
    setIsDeleting(true);
    try {
      const result = await deleteApplicationAction({
        id: currentApplication.id,
        confirmName: value.trim(),
      });

      if (result.error) {
        toast.error(t("toast.deleteFailed"), {
          description: result.error,
        });
        return;
      }

      toast.success(t("toast.deleteSuccess"), {
        description: t("toast.deleteSuccessDesc"),
      });
    } catch {
      toast.error(t("toast.deleteFailed"), {
        description: t("toast.unknownError"),
      });
    } finally {
      setValue("");
      setIsDeleting(false);
      onOpenChange(false);
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(open) => {
        if (!isDeleting) {
          setValue("");
          onOpenChange(open);
        }
      }}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentApplication.name || isDeleting}
      title={
        <span className="text-destructive">
          <AlertTriangleIcon
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />{" "}
          {t("title")}
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2 leading-relaxed break-all">
            {t("description.confirm")}{" "}
            <code className="bg-muted relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold break-all">
              {currentApplication.name}
            </code>
            ?
          </p>
          <p className="mb-2 leading-relaxed break-all">
            {t("description.warning")}{" "}
            <span className="inline-block max-w-full font-bold break-all">
              {currentApplication.name.toUpperCase()}
            </span>{" "}
            {t("description.cannotUndo")}
          </p>

          <Label className="my-2">
            {t("nameLabel")}:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t("namePlaceholder")}
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>{t("warning.title")}</AlertTitle>
            <AlertDescription>{t("warning.description")}</AlertDescription>
          </Alert>
        </div>
      }
      confirmText={
        isDeleting ? t("buttons.deleting") : t("buttons.confirmDelete")
      }
      destructive
    />
  );
}
