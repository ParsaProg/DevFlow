import type { Metadata } from "next";

const title = "DevFlow | Register";
const desc =
  "Register or create an account in devflow, for manage you'r projects";

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
