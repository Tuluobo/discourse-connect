"use client";

import { useState } from "react";
import { deleteApplicationAction } from "@/actions/application";
import { AlertTriangleIcon } from "lucide-react";
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

  const handleDelete = async () => {
    if (value.trim() !== currentApplication.name) return;
    setIsDeleting(true);
    try {
      const result = await deleteApplicationAction({
        id: currentApplication.id,
        confirmName: value.trim(),
      });

      if (result.error) {
        toast.error("删除失败", {
          description: result.error,
        });
        return;
      }

      toast.success("删除成功", {
        description: "应用已成功删除",
      });
    } catch {
      toast.error("删除失败", {
        description: "删除应用时发生未知错误",
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
          删除应用
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2 leading-relaxed break-all">
            Are you sure you want to delete{" "}
            <code className="bg-muted relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold break-all">
              {currentApplication.name}
            </code>
            ?
          </p>
          <p className="mb-2 leading-relaxed break-all">
            This action will permanently remove the application with the name of{" "}
            <span className="inline-block max-w-full font-bold break-all">
              {currentApplication.name.toUpperCase()}
            </span>{" "}
            from the system. This cannot be undone.
          </p>

          <Label className="my-2">
            Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter name to confirm deletion."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={isDeleting ? "删除中..." : "确认删除"}
      destructive
    />
  );
}
