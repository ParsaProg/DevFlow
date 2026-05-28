"use client";

import KanbanBoard from "@/src/components/ui/dashboard/projects/ProjectBoardView";
import { useSidebar } from "@/src/context/DashBoardTabCollapseContext";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const { isCollapsed } = useSidebar();
  const { slug } = use(params);
  const router = useRouter();
  const handleGoBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    router.replace("/dashboard/projects");
  };

  return (
    <div className="z-10 absolute top-0 bg-[#05070B] w-full h-screen">
      <div
        className={`transition-all duration-300 mt-24 ${isCollapsed ? "ml-15" : "ml-60"} px-[12vw] flex flex-col mx-auto gap-y-5`}
      >
        <div className="flex items-center gap-x-4">
          <button
            type="button"
            onClick={handleGoBack}
            className="flex items-center justify-center p-2.75 rounded-xl border border-gray-300 dark:border-gray-800 transition-all duration-200 hover:bg-gray-800 text-white cursor-pointer focus:outline-none"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex flex-col items-start gap-y-0.5">
            <h1 className="text-xl font-bold">Auth Provider</h1>
            <h5 className="text-sm font-thin text-neutral-400/90">Board View</h5>
          </div>
        </div>
        <KanbanBoard />
      </div>
    </div>
  );
}
