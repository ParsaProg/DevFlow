"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
// Configuration the NProgress

NProgress.configure({
  minimum: 0.08,
  easing: "ease",
  speed: 400,
  showSpinner: false,
});

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const current = pathname + searchParams.toString();

    if (prevPathRef.current === null) {
      prevPathRef.current = current;
      return;
    }
    if (prevPathRef.current !== current) {
      NProgress.done();
      prevPathRef.current = current;
    }
  }, [pathname, searchParams]);
  return null;
}

export function startProgress() {
  NProgress.start();
}
