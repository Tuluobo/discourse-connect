"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/dashboard/nav-group";

import DynamicLogo from "../shared/dynamic-logo";
import { getSidebarData } from "./data/sidebar-data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  const t = useTranslations("common");

  const sidebarData = getSidebarData(t);

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <DynamicLogo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {t("brand.name")}
                </span>
                <span className="truncate text-xs">{t("brand.connect")}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter className="">
        <p
          className={cn(
            "text-muted-foreground/70 mt-auto truncate pt-6 pb-3 font-mono text-xs",
            open ? "mx-3" : "",
          )}
        >
          <span className={cn("inline-block", open ? "" : "scale-75")}>
            &copy;{new Date().getFullYear()}
          </span>{" "}
          {open && (
            <Link
              href="https://shuzimumin.com"
              target="_blank"
              rel="noreferrer"
              className="text-primary font-medium underline underline-offset-2"
            >
              {t("brand.name")}
            </Link>
          )}
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
