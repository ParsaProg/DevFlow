import ClientLayout from "./ClientLayout";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/src/utils/lenis-provider";

const title: string = "DevFlow | Home";
const description: string =
  "DevFlow - Modern Developer Collaboration Platform | Structured issue tracking, clean task management, and collaborative workspaces for developer teams.";

const geist_mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
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
        className={`transition-colors duration-500 bg-background text-for-default ${geist_mono.variable} antialiased`}
      >
        <ClientLayout>
          <LenisProvider>{children}</LenisProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
