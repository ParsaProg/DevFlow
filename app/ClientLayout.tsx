"use client";

import Header from "@/src/components/header/Header";
import NavigationProgress from "@/src/components/ui/NavigationProgress";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import "./nprogress.css";
import Footer from "@/src/components/footer/Footer";
import DashboardPanelHeader from "@/src/components/dashboard/Header";
import TabComponent from "@/src/components/dashboard/TabComponent";
import { useSidebar } from "@/src/context/DashBoardTabCollapseContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggle, isCollapsed } = useSidebar();

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
        <DashboardPanelHeader collapse={isCollapsed} />
        <TabComponent collapse={isCollapsed} setCollapse={toggle} />
        <div className="h-25"></div>
        {children}
        <div className="h-12.5"></div>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
