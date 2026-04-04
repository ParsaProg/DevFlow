import type { Metadata } from "next";

const title = "DevFlow | Sign In";
const desc =
  "Sign In to devflow and ship faster you'r projects and manage thats!";

export const metadata: Metadata = {
  title: title,
  description: desc,
  openGraph: { title: title, description: desc },
  twitter: {
    title: title,
    description: desc,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
