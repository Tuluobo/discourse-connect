"use client";

import { useState } from "react";
import {
  AlignHorizontalJustifyCenterIcon,
  PackageCheckIcon,
  PackagePlusIcon,
  SortAscIcon,
  SortDescIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

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

const getAppActivedFilter = (t: (key: string) => string) => [
  { key: "all", value: t("filter.allApps") },
  { key: "isActived", value: t("filter.activated") },
  { key: "notActived", value: t("filter.notActivated") },
];

function CreateApplicationButton() {
  const { setOpen } = useApplications();
  const t = useTranslations("application.view");
  return (
    <div className="flex gap-2">
      <Button
        className="space-x-1"
        onClick={() => {
          setOpen("create");
        }}
      >
        <PackagePlusIcon size={18} /> <span>{t("createButton")}</span>
      </Button>
    </div>
  );
}

function ApplicationEmpty() {
  const { setOpen } = useApplications();
  const t = useTranslations("application.view");
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
          <h1 className="text-xl font-semibold">{t("empty.title")}</h1>
          <p className="text-muted-foreground text-sm">
            {t("empty.description")}
          </p>
        </div>
        <Button
          className="bg-blue-500 px-6 text-white hover:bg-blue-600"
          onClick={() => {
            setOpen("create");
          }}
        >
          {t("empty.createButton")}
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
  const t = useTranslations("application.view");
  const appActivedFilter = getAppActivedFilter(t);

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
          <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <CreateApplicationButton />
      </div>
      <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
        <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
          <Input
            placeholder={t("filterPlaceholder")}
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
                <span>{t("sort.ascending")}</span>
              </div>
            </SelectItem>
            <SelectItem value="descending">
              <div className="flex items-center gap-4">
                <SortDescIcon size={16} />
                <span>{t("sort.descending")}</span>
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
