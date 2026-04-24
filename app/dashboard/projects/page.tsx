"use client";
import { motion } from "framer-motion";
import { useSidebar } from "@/src/context/DashBoardTabCollapseContext";
import { Plus } from "lucide-react";
import { ProjectsModelData } from "@/src/models/projects";
import ProjectsContainer from "@/src/components/ui/projects/ProjectsContainer";

const DashboardPage = () => {
  const { isCollapsed } = useSidebar();
  return (
    <div className="z-10 absolute top-0 bg-[#05070B] w-full h-screen">
      <div
        className={`transition-all duration-300 mt-24 ${isCollapsed ? "ml-15" : "ml-60"} px-[12vw] flex flex-col mx-auto gap-y-5`}
      >
        <div className="flex w-full items-center justify-between">
          <section>
            <h1 className="text-white font-bold text-2xl">Projects</h1>
            <h3 className="text-gray-500 font-thin text-[17px] mt-1">
              6 active projects across your workspace
            </h3>
          </section>
          <motion.div whileTap={{ scale: 0.95 }} className="rounded-xl">
            <button className="bg-primary rounded-xl text-white font-semibold flex items-center justify-center gap-x-2 text-[13px] shadow-primary/20 shadow-[0px_0px_20px_5px] px-4 py-2">
              <Plus size={18} />
              Create Project
            </button>
          </motion.div>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          {ProjectsModelData.map((p, _i) => {
            return <ProjectsContainer key={_i} {...p} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
