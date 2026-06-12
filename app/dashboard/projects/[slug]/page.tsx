"use client";

import ProjectBoardLoader from "@/src/components/ui/dashboard/loadings/ProjectDetailsLoading";
import KanbanBoard from "@/src/components/ui/dashboard/projects/ProjectBoardView";
import { BACKEND_BASE_URL } from "@/src/constants/backendBaseUrl";
import { useSidebar } from "@/src/context/DashBoardTabCollapseContext";
import { ArrowLeft, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InviteContributorModal from "@/src/components/ui/modals/InviteContributorModal";
import toast from "react-hot-toast";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const { isCollapsed } = useSidebar();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = use(params);
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${BACKEND_BASE_URL}/api/v1/projects/${slug}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Project not found");
          }
          throw new Error("Failed to fetch project data");
        }

        const data = await response.json();
        console.log(data);
        setProject(data);
        document.title = `${data?.["name"]} Project`;
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        toast.error(err.message);
        setTimeout(() => {
          router.replace("/dashboard/projects");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProjectDetails();
    }
  }, [slug]);
  const handleGoBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    router.replace("/dashboard/projects");
  };

  return !loading ? (
    <div className="z-10 absolute top-0 bg-[#05070B] w-full h-screen">
      <div
        className={`transition-all duration-300 mt-24 ${isCollapsed ? "ml-15" : "ml-60"} px-[12vw] flex flex-col mx-auto gap-y-5`}
      >
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              onClick={handleGoBack}
              className="flex items-center justify-center p-2.75 rounded-xl border border-gray-300 dark:border-gray-800 transition-all duration-200 hover:bg-gray-800 text-white cursor-pointer focus:outline-none"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex flex-col items-start gap-y-0.5">
              <h1 className="text-xl font-bold">{project?.["name"]}</h1>
              <h5 className="text-sm font-thin text-neutral-400/90">
                Board View
              </h5>
            </div>
          </div>
          <motion.div onClick={toggleModal} whileTap={{ scale: 0.95 }}>
            <button className="tranisition-all duration-200 text-sm hover:bg-gray-800 flex items-center justify-center gap-x-2 px-4 py-2 rounded-xl border dark:border-gray-800">
              <UserRoundPlus size={15} />
              Invite Contributor
            </button>
          </motion.div>
        </div>
        <KanbanBoard />
      </div>
      <AnimatePresence>
        {showModal && (
          <InviteContributorModal
            toggleModal={toggleModal}
            projectId={project?.["id"]}
            onMemberAdded={() => {}}
          />
        )}
      </AnimatePresence>
    </div>
  ) : (
    <ProjectBoardLoader />
  );
}
