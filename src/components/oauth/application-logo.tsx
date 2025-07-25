"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";

interface ApplicationLogoProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const iconSizes = {
  sm: 16,
  md: 24,
  lg: 32,
};

export function ApplicationLogo({
  src,
  alt,
  size = "md",
  className = "",
}: ApplicationLogoProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (imageError || !src) {
    return (
      <div
        className={` ${sizeClasses[size]} ${className} bg-muted flex items-center justify-center rounded-lg`}
      >
        <Building2 size={iconSizes[size]} className="text-muted-foreground" />
      </div>
    );
  }

  return (
    <div
      className={`relative ${sizeClasses[size]} ${className} overflow-hidden rounded-lg`}
    >
      {isLoading && (
        <div className="bg-muted absolute inset-0 animate-pulse rounded-lg" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={size === "lg" ? "64px" : size === "md" ? "48px" : "32px"}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}
