import { EditIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Application } from "@/lib/dto/application";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useApplications } from "./context";

interface CardActionsProps {
  app: Application;
}

export function CardActions({ app }: CardActionsProps) {
  const { setOpen, setCurrentApplication } = useApplications();
  const t = useTranslations("application.cardActions");

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <MoreVerticalIcon className="h-4 w-4" />
            <span className="sr-only">{t("openMenu")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => {
              setCurrentApplication(app);
              setOpen("edit");
            }}
          >
            <EditIcon className="mr-2 h-4 w-4" />
            {t("edit")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentApplication(app);
              setOpen("delete");
            }}
            className="text-red-500!"
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
