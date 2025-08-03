"use client";

import { CTA } from "@/components/index/cta";
import { Features } from "@/components/index/features";
import { Hero } from "@/components/index/hero";
import { HowItWorks } from "@/components/index/how-it-works";

export default function IndexPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <CTA />
    </>
  );
}
