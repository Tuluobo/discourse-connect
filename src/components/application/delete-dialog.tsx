"use client";

import { useState } from "react";
import { AlertTriangleIcon } from "lucide-react";

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

  const handleDelete = () => {
    if (value.trim() !== currentApplication.id) return;

    onOpenChange(false);
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentApplication.id}
      title={
        <span className="text-destructive">
          <AlertTriangleIcon
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Delete User
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{" "}
            <span className="font-bold">{currentApplication.id}</span>?
            <br />
            This action will permanently remove the application with the name of{" "}
            <span className="font-bold">
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
      confirmText="Delete"
      destructive
    />
  );
}
