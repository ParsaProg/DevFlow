"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const refId = useRef<number | null>(null);
  const lenisRef = useRef<InstanceType<typeof Lenis> | null>(null);

  useEffect(() => {
    if (typeof window === undefined) return;

    // create instance with valid opeiton (no `smooth` property)

    lenisRef.current = new Lenis({
      // either use lerp for continuous smoothing
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      orientation: "vertical",
    });

    const lenis = lenisRef.current;

    const loop = (time: number) => {
      lenis?.raf(time);
      refId.current = requestAnimationFrame(loop);
    };

    refId.current = requestAnimationFrame(loop);

    return () => {
      if (refId.current) cancelAnimationFrame(refId.current);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
