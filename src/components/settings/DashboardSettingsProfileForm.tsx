"use client";
import { motion } from "framer-motion";
import DashboardSettingsProfileInputs from "./DashboardSettingsProfileInputForm";

export default function DashboardSettingsProfileForm() {
  
  return (
    <motion.div
      key={"profile"}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      }}
      className="flex flex-col gap-y-5 items-start w-[80%] dark:bg-[#0C1015] border dark:border-gray-800 rounded-2xl p-5 z-1"
    >
      <div>
        <h1 className="font-semibold text-sm">Profile</h1>
        <span className="font-thin text-sm text-gray-500">
          Update your personal information.
        </span>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="rounded-xl bg-primary/10 text-[20px] text-primary font-semibold w-15 h-15 flex items-center justify-center">
          PS
        </div>
        <div>
          <h1 className="text-sm">Parsa Shaabani</h1>
          <h5 className="text-[12px] text-gray-500">
            parsashaabani3@gmail.com
          </h5>
        </div>
      </div>
      <span className="w-full h-px rounded-full bg-gray-800"></span>
      <form className="w-full flex flex-col gap-y-5 text-sm">
        <div className="flex items-center w-full gap-x-5">
          <div className="flex flex-col gap-y-2 w-full">
            <span>First Name</span>
            <DashboardSettingsProfileInputs value="Parsa" />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <span>Last Name</span>
            <DashboardSettingsProfileInputs value="Shaabani" />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <span>Email</span>
          <DashboardSettingsProfileInputs value="parsashaabani3@gmail.com" />
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <span>Role</span>
          <DashboardSettingsProfileInputs value="Senior Developer" />
        </div>
        <motion.div whileTap={{ scale: 0.95 }} className="rounded-xl self-end">
          <button className="transition-all duration-200 bg-primary rounded-xl text-white text-sm flex items-center justfi-center text-center py-3 px-5 font-semibold mt-3 shadow-lg shadow-neutral-900 hover:-translate-y-1 hover:shadow-primary/30">
            Save Changes
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
