"use client";

import LandingFeatures from "@/src/components/landing/Features/Features";
import HeroSection from "@/src/components/landing/HeroSection/HeroSection";
import LandingTrustedSection from "@/src/components/landing/Trusted/TrustedSection";

export default function Home() {
  return <div className="w-full">
    <HeroSection />
    <LandingFeatures />
    <LandingTrustedSection /> 
  </div>;
}
