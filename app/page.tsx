"use client";

import LandingFeatures from "@/src/components/landing/Features/Features";
import HeroSection from "@/src/components/landing/HeroSection/HeroSection";

export default function Home() {
  return <div className="w-full">
    <HeroSection />
    <LandingFeatures />
    
    <div className="h-2500"></div>
  </div>;
}
