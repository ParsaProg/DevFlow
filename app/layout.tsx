import ClientLayout from "./ClientLayout";
import type { Metadata } from "next";
import "./globals.css";
import "./loader-spinner.css";
import LenisProvider from "@/src/components/providers/lenis-provider";
import ToastProvider from "@/src/components/providers/ToaterProvider";
import {
  SidebarContext,
  SidebarProvider,
} from "@/src/context/DashBoardTabCollapseContext";

const title: string = "DevFlow | Home";
const description: string =
  "DevFlow - Modern Developer Collaboration Platform | Structured issue tracking, clean task management, and collaborative workspaces for developer teams.";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: { title: title, description: description },
  twitter: {
    title: title,
    description: description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`inter transition-colors duration-500 bg-background text-for-default antialiased`}
      >
        <SidebarProvider>
          <ClientLayout>
            <LenisProvider>
              <ToastProvider />
              {children}
            </LenisProvider>
          </ClientLayout>
        </SidebarProvider>
      </body>
    </html>
  );
}
