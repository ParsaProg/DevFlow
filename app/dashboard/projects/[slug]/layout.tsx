import type { Metadata } from "next";

const title = "Project Details";
const description = "This project is the ain portfolio of parsa-shaabani";

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
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
