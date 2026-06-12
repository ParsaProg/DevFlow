"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "@/src/context/DashBoardTabCollapseContext";
import { Plus, RefreshCw } from "lucide-react";
import ProjectsContainer from "@/src/components/ui/dashboard/projects/ProjectsContainer";
import CreateProjectPortal from "@/src/components/ui/dashboard/projects/CreateProjectPortal";
import { useEffect, useState } from "react";
import { GetUserProjects } from "@/src/services/handleGetUserProjects";
import { Scroll } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// Explicit TypeScript shape for state balance
interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: any[];
  _count: {
    issues: number;
  };
}

const DashboardPage = () => {
  const [userProjectData, setUserProjectsData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ⚡ FIX 1: Explicit loading flag
  const [showProjectPortal, setShowProjectPortal] = useState<boolean>(false);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const resData = await GetUserProjects();
      console.log("Fetched Data:", resData);

      if (resData && resData.projects) {
        setUserProjectsData(resData.projects);
      }
    } catch (error) {
      console.error("Error setting project state context:", error);
    } finally {
      setIsLoading(false); // Drop loading barrier regardless of response success
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddNewProjectToState = () => {
    fetchDashboardData();
  };

  const toggleProjectCreationPortal = () => {
    setShowProjectPortal(!showProjectPortal);
  };

  const { isCollapsed } = useSidebar();

  return (
    <div className="z-10 absolute top-0 bg-[#05070B] w-full h-screen overflow-y-auto">
      <AnimatePresence>
        {showProjectPortal && (
          <CreateProjectPortal
            toggleProjectCreationPortal={toggleProjectCreationPortal}
            // Make sure to add this prop to your actual portal component call!
            onProjectCreated={handleAddNewProjectToState}
          />
        )}
      </AnimatePresence>

      <div
        className={`transition-all duration-300 mt-24 ${isCollapsed ? "ml-15" : "ml-60"} px-[12vw] flex flex-col mx-auto gap-y-5 pb-10`}
      >
        <div className="flex w-full items-center justify-between">
          <section>
            <h1 className="text-white font-bold text-2xl">Projects</h1>
            <h3 className="text-gray-500 font-thin text-[17px] mt-1">
              {isLoading
                ? "Fetching data..."
                : `${userProjectData.length} active projects across your workspace`}
            </h3>
          </section>

          <div className="flex items-center gap-x-3">
            <motion.div
              onClick={handleAddNewProjectToState}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl"
            >
              <button className="dark:hover:bg-gray-800 transition-all duration-200 border dark:border-gray-800 rounded-xl text-white font-semibold flex items-center justify-center gap-x-2 text-[13px] w-10 h-10">
                <RefreshCw size={15} />
              </button>
            </motion.div>
            <motion.div
              onClick={toggleProjectCreationPortal}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl"
            >
              <button className="bg-primary rounded-xl text-white font-semibold flex items-center justify-center gap-x-2 text-[13px] shadow-primary/20 shadow-[0px_0px_20px_5px] px-4 py-2">
                <Plus size={18} />
                Create Project
              </button>
            </motion.div>
          </div>
        </div>

        {/* 🟢 Render Stream Evaluation Logic */}
        {isLoading ? (
          // 1. Sleek minimal loading spinner layout
          <div className="w-full h-48 flex items-center justify-center flex-col gap-y-3">
            <div className="w-7 h-7 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-xs text-neutral-500 font-light tracking-wide">
              Syncing data pipeline...
            </p>
          </div>
        ) : userProjectData.length > 0 ? (
          // 2. Main data content grid
          <div className="grid lg:grid-cols-3 gap-5">
            {userProjectData.map((p) => {
              return <ProjectsContainer key={p.id} {...p} />;
            })}
          </div>
        ) : (
          // 3. True zero-state view (Only triggers if fully loaded and array is empty)
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="w-full py-16 px-6 border border-neutral-800/60 rounded-2xl bg-[#0C1015]/50 backdrop-blur-sm flex flex-col items-center justify-center text-center overflow-hidden group"
          >
            <div className="mb-3 border-[1.8px] border-dashed dark:border-neutral-700 rounded-xl p-1.5">
              <div className="border border-dashed dark:border-primary rounded-lg p-2">
                <Scroll className="text-primary" />
              </div>
            </div>

            <h3 className="text-neutral-200 font-light text-lg tracking-wide">
              Workspace is Empty
            </h3>
            <p className="text-neutral-500 font-light text-sm max-w-sm mt-2 leading-relaxed">
              You haven't initialized any projects here yet. Open the creation
              Panel above to get your tracking pipeline rolling.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
