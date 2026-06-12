import DashboardClientGuard from "@/src/providers/DashboardClientGuard";
import type { Metadata } from "next";
import { ReactNode } from "react";

const title = "DevFlow | Notifications";
const desc = "";

export const metadata: Metadata = {
  title: title,
  description: desc,
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <DashboardClientGuard route="Notifications">{children}</DashboardClientGuard>;
}
