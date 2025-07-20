"use client";

import { useState } from "react";
import {
  AlignHorizontalJustifyCenterIcon,
  PackageCheckIcon,
  PackagePlusIcon,
  SortAscIcon,
  SortDescIcon,
} from "lucide-react";

import { Application } from "@/lib/dto/application";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ApplicationsProvider, {
  useApplications,
} from "@/components/application/context";
import { ApplicationsDialogs } from "@/components/application/dialog";
import ApplicationGrid from "@/components/application/grid";

const appActivedFilter = [
  { key: "all", value: "All Apps" },
  { key: "isActived", value: "Actived" },
  { key: "notActived", value: "Not Actived" },
];

function CreateApplicationButton() {
  const { setOpen } = useApplications();
  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => {
          setOpen("create");
        }}
      >
        <PackagePlusIcon size={18} /> <span>Create Application</span>
      </Button>
    </div>
  );
}

function ApplicationEmpty() {
  const { setOpen } = useApplications();
  return (
    <div
      className={cn(
        "absolute inset-0 left-full z-50 hidden h-full w-full flex-1 flex-col justify-center rounded-md border shadow-xs transition-all duration-200 sm:static sm:z-auto sm:flex",
      )}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="border-border flex size-16 items-center justify-center rounded-full border-2">
          <PackageCheckIcon className="size-8" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold">Your applications</h1>
          <p className="text-muted-foreground text-sm">
            Create an application to start.
          </p>
        </div>
        <Button
          className="bg-blue-500 px-6 text-white hover:bg-blue-600"
          onClick={() => {
            setOpen("create");
          }}
        >
          Create Application
        </Button>
      </div>
    </div>
  );
}

interface ApplicationViewProps {
  data: Application[];
}

export default function ApplicationView({ data }: ApplicationViewProps) {
  const [sort, setSort] = useState("ascending");
  const [appType, setAppType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApps = data
    .sort((a, b) =>
      sort === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    )
    .filter((app) =>
      appType === "isActived"
        ? app.isActived
        : appType === "notActived"
          ? !app.isActived
          : true,
    )
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <ApplicationsProvider>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
          <p className="text-muted-foreground">
            Manage your applications and their properties here.
          </p>
        </div>
        <CreateApplicationButton />
      </div>
      <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
        <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
          <Input
            placeholder="Filter apps..."
            className="h-9 w-40 lg:w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={appType} onValueChange={setAppType}>
            <SelectTrigger className="w-36">
              <SelectValue>
                {appActivedFilter.find((item) => item.key === appType)?.value}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {appActivedFilter.map((item) => {
                return (
                  <SelectItem key={item.key} value={item.key}>
                    {item.value}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-16">
            <SelectValue>
              <AlignHorizontalJustifyCenterIcon size={18} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="ascending">
              <div className="flex items-center gap-4">
                <SortAscIcon size={16} />
                <span>Ascending</span>
              </div>
            </SelectItem>
            <SelectItem value="descending">
              <div className="flex items-center gap-4">
                <SortDescIcon size={16} />
                <span>Descending</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {data.length === 0 && <ApplicationEmpty />}
      {data.length > 0 && (
        <>
          <Separator className="shadow-sm" />
          <ApplicationGrid data={filteredApps} />
        </>
      )}
      <ApplicationsDialogs />
    </ApplicationsProvider>
  );
}
