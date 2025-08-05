import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { SearchProvider } from "@/hooks/use-search";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Header } from "@/components/dashboard/header";
import { Main } from "@/components/dashboard/main";
import LocaleSwitcher from "@/components/locale-switcher";
import { ProfileDropdown } from "@/components/shared/profile-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <SearchProvider>
      <SidebarProvider>
        <AppSidebar />
        <div
          id="content"
          className={cn(
            "ml-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "sm:transition-[width] sm:duration-200 sm:ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
          )}
        >
          <Header>
            <div className="ml-auto flex items-center space-x-4">
              <LocaleSwitcher />
              <ThemeToggle />
              <ProfileDropdown user={user} />
            </div>
          </Header>
          <Main>{children}</Main>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
