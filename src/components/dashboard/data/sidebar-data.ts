import {
  EarthIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  PackageSearchIcon,
  SettingsIcon,
  UserMinusIcon,
} from "lucide-react";

import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Applications",
          url: "/applications",
          icon: PackageSearchIcon,
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: SettingsIcon,
          items: [
            {
              title: "Profile",
              url: "/settings/profile",
              icon: UserMinusIcon,
            },
          ],
        },
        {
          title: "Community",
          url: "https://shuzimumin.com",
          icon: EarthIcon,
        },
        {
          title: "Help Center",
          url: "mailto:service@shuzimumin.com",
          icon: HelpCircleIcon,
        },
      ],
    },
  ],
};
