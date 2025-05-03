"use client";

import Link from "next/link";

import { ExtendedUser } from "@/types/next-auth";
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
import { sidebarData } from "./data/sidebar-data";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: ExtendedUser;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <DynamicLogo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">数字牧民社区</span>
                <span className="truncate text-xs">Connect</span>
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
            "mt-auto truncate pb-3 pt-6 font-mono text-xs text-muted-foreground/70",
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
              className="font-medium text-primary underline underline-offset-2"
            >
              数字牧民社区
            </Link>
          )}
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
