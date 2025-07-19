"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function DynamicLogo({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { resolvedTheme } = useTheme();

  const logoSrc = resolvedTheme === "dark" ? "/logo-dark.png" : "/logo.png";
  return (
    <Image
      className={className}
      {...props}
      src={logoSrc}
      alt="数字牧民 Logo"
      width={48}
      height={48}
    />
  );
}
