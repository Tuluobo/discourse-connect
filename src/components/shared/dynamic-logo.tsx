"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export interface DynamicLogoProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function DynamicLogo({ className, ...props }: DynamicLogoProps) {
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
