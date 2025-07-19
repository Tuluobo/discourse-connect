import React, { useState } from "react";

import { Application } from "@/lib/dto/application";
import useDialogState from "@/hooks/use-dialog-state";

type ApplicationsDialogType = "create" | "edit" | "delete";

interface ApplicationsContextType {
  open: ApplicationsDialogType | null;
  setOpen: (str: ApplicationsDialogType | null) => void;
  currentApplication: Application | null;
  setCurrentApplication: React.Dispatch<
    React.SetStateAction<Application | null>
  >;
}

const ApplicationsContext = React.createContext<ApplicationsContextType | null>(
  null,
);

interface Props {
  children: React.ReactNode;
}

export default function ApplicationsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ApplicationsDialogType>(null);
  const [currentApplication, setCurrentApplication] =
    useState<Application | null>(null);

  return (
    <ApplicationsContext
      value={{ open, setOpen, currentApplication, setCurrentApplication }}
    >
      {children}
    </ApplicationsContext>
  );
}

export const useApplications = () => {
  const context = React.useContext(ApplicationsContext);

  if (!context) {
    throw new Error(
      "useApplications has to be used within <ApplicationsContext>",
    );
  }

  return context;
};
