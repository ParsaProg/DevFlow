import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import DashboardSettingsProfileInputs from "../../../settings/DashboardSettingsProfileInputForm";
import { useState } from "react";

interface PortalInterface {
  setFunction?: (value: boolean) => void;
  toggleProjectCreationPortal: () => void;
}

const Portal = ({
  toggleProjectCreationPortal,
}: Omit<PortalInterface, "setFunction">) => {
  const [projectName, setProjectName] = useState<string>("");
  return (
    <>
      {/* Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={toggleProjectCreationPortal}
        className="fixed inset-0 h-screen w-screen bg-black/40 backdrop-blur-sm z-[9998]"
      />

      {/* Modal Center Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: "-55%", x: "-50%" }}
        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
        exit={{ opacity: 0, scale: 0.95, y: "-55%", x: "-50%" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-1/2 left-1/2 rounded-xl p-5 dark:bg-[#0C1015] border border-neutral-800 shadow-xl z-[9999] text-white"
      >
        <h1 className="font-thin text-[18px]">Create New Project</h1>
        <div className="flex flex-col gap-y-2 mt-5">
          <h5 className="text-[15px]">Project Name</h5>
          <div className="w-100">
            <DashboardSettingsProfileInputs
              placeholder="e.g., Backend Api"
              value={projectName}
              onChange={setProjectName}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 mt-5">
          <h5 className="text-[15px]">Description</h5>
          <div className="w-100">
            <DashboardSettingsProfileInputs
              placeholder="Brief project description..."
              value={projectName}
              onChange={setProjectName}
              height={80}
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-x-3">
          <motion.div
            onClick={toggleProjectCreationPortal}
            whileTap={{
              scale: 0.98,
            }}
          >
            <motion.button className="mt-3 py-2 px-4 rounded-xl border-1 dark:border-slate-800 text-sm">
              Cancel
            </motion.button>
          </motion.div>
          <motion.div
            whileTap={{
              scale: 0.98,
            }}
          >
            <motion.button className="mt-3 py-2 px-4 rounded-xl bg-primary text-sm font-medium">
              Create Project
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default function CreateProjectPortal({
  setFunction,
  toggleProjectCreationPortal,
}: PortalInterface) {
  return createPortal(
    <Portal toggleProjectCreationPortal={toggleProjectCreationPortal} />,
    document.body,
  );
}
