"use client";

import Header from "@/src/components/header/Header";
import { ThemeProvider } from "next-themes";

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
        <Header />
        {children}
      </ThemeProvider>
    </div>
  );
}
