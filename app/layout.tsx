import ClientLayout from "./ClientLayout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const title: string = "DevFlow | Home";
const description: string =
  "DevFlow - Modern Developer Collaboration Platform | Structured issue tracking, clean task management, and collaborative workspaces for developer teams.";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      <body className={`bg-white dark:bg-black ${inter.variable} antialiased`}>
        
          <ClientLayout>{children}</ClientLayout>
        
      </body>
    </html>
  );
}
