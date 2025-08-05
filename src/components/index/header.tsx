"use client";

import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { cn, formatCompactNumber } from "@/lib/utils";
import { useGithubStars } from "@/hooks/use-github-stars";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

import LocaleSwitcher from "../locale-switcher";
import DynamicLogo from "../shared/dynamic-logo";
import { Icons } from "../shared/icons";
import { ProfileDropdown } from "../shared/profile-dropdown";

interface HeaderProps {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Header({
  isScrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const { stargazersCount } = useGithubStars("tuluobo", "discourse-connect");
  const t = useTranslations("header");

  const navItems = [
    { id: "features", label: t("nav.features"), href: "#features" },
    { id: "how-it-works", label: t("nav.howItWorks"), href: "#how-it-works" },
    {
      id: "community",
      label: t("nav.community"),
      href: "https://shuzimumin.com",
    },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    if (href.startsWith("https://")) {
      window.open(href, "_blank");
      return;
    }

    const targetId = href?.slice(1);
    if (!targetId) return;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-lg",
        isScrolled
          ? "border-border/20 bg-background/90 border-b shadow-xs"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/">
          <div className="flex items-center gap-2 font-bold">
            <DynamicLogo />
            <span>{t("brand")}</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-4 md:flex lg:gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              href={item.href}
              onClick={handleScrollToSection}
              className="group text-muted-foreground hover:text-foreground relative text-xs font-medium transition-colors lg:text-sm"
            >
              {item.label}
              <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
        </nav>
        <div className="hidden cursor-pointer items-center gap-4 md:flex">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <Button variant="ghost" asChild>
              <a
                href="https://github.com/Tuluobo/discourse-connect"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                <Icons.github className="size-5" />
                {stargazersCount > 0 && formatCompactNumber(stargazersCount)}
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <LocaleSwitcher />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              <Link href="/sign-in" prefetch>
                <Button className="cursor-pointer rounded-full font-medium transition-transform hover:scale-105">
                  {t("signIn")}
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">{t("toggleMenu")}</span>
          </Button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-background/95 absolute inset-x-0 top-16 border-b backdrop-blur-lg md:hidden"
        >
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {navItems.map((item, i) => (
              <motion.a
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                href={item.href}
                onClick={(e) => {
                  handleScrollToSection(e);
                  setMobileMenuOpen(false);
                }}
                className="group relative overflow-hidden py-2 text-sm font-medium"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="border-border/30 mt-2 border-t pt-2"
            >
              <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-full">
                  {t("signIn")}
                  <ChevronRight className="ml-2 size-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
