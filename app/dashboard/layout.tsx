import DashboardClientGuard from "@/src/providers/DashboardClientGuard";
import type { Metadata } from "next";
import { ReactNode } from "react";

const title = "DevFlow | Dashboard";
const desc = "DevFlow dashboard page, main project managing system route!";

export const metadata: Metadata = {
  title: title,
  description: desc,
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardClientGuard route="Dashboard">{children}</DashboardClientGuard>
  );
}
