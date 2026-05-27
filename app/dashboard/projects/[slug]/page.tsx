"use client";

import { useSidebar } from "@/src/context/DashBoardTabCollapseContext";
import { use } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}
export default function ProjectDetailsPage({ params }: PageProps) {
  const { isCollapsed } = useSidebar();
  const { slug } = use(params);
  return (
    <div
      className={`transition-all duration-300 mt-24 ${isCollapsed ? "ml-15" : "ml-60"} px-[12vw] flex flex-col mx-auto gap-y-5`}
    >
      
    </div>
  );
}
