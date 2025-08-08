import {
  EarthIcon,
  HelpCircleIcon,
  KeySquareIcon,
  LayoutDashboardIcon,
  PackageSearchIcon,
  SettingsIcon,
  UserMinusIcon,
} from "lucide-react";

import { type SidebarData } from "../types";

export function getSidebarData(t: (key: string) => string): SidebarData {
  return {
    navGroups: [
      {
        title: t("sidebar.groups.general"),
        items: [
          {
            title: t("sidebar.items.dashboard"),
            url: "/dashboard",
            icon: LayoutDashboardIcon,
          },
          {
            title: t("sidebar.items.applications"),
            url: "/applications",
            icon: PackageSearchIcon,
          },
          {
            title: t("sidebar.items.authorization"),
            url: "/authorization",
            icon: KeySquareIcon,
          },
        ],
      },
      {
        title: t("sidebar.groups.other"),
        items: [
          {
            title: t("sidebar.items.settings"),
            icon: SettingsIcon,
            items: [
              {
                title: t("sidebar.items.profile"),
                url: "/settings/profile",
                icon: UserMinusIcon,
              },
            ],
          },
          {
            title: t("sidebar.items.community"),
            url: "https://shuzimumin.com",
            icon: EarthIcon,
          },
          {
            title: t("sidebar.items.helpCenter"),
            url: "mailto:service@shuzimumin.com",
            icon: HelpCircleIcon,
          },
        ],
      },
    ],
  };
}
