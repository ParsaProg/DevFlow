"use client";

import Header from "@/src/components/header/Header";
import NavigationProgress from "@/src/components/ui/NavigationProgress";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import "./nprogress.css";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        enableSystem
        disableTransitionOnChange={false}
        defaultTheme={"system"}
      >
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <Header />
        {children}
      </ThemeProvider>
    </div>
  );
}
