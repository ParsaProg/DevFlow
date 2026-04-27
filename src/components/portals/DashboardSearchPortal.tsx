"use client";
import { Search } from "lucide-react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { DashboardTabList } from "@/src/data/dashboard-tab-component-list";

export default function DashboardSearchPortal() {
  return createPortal(<PortalComponent />, document.body);
}

const PortalComponent = () => {
  return (
    <motion.div
      key="search-portal"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
      className="absolute z-99999999 top-[40%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-col items-start dark:bg-[#0C1015] border dark:border-neutral-800 rounded-3xl w-130 pb-3 px-5"
    >
      <div className="relative w-full pt-5 pb-4 border-b dark:border-b-neutral-800">
        <input
          autoFocus
          className="w-full rounded-2xl border-none outline-none placeholder:text-[14.5px] text-[14px] text-white placeholder:text-neutral-400 px-9"
          placeholder="Search projects, issues, and more"
        />
        <Search
          size={22}
          className="absolute mt-0.5 left-0 top-[50%] translate-y-[-50%] dark:text-neutral-400"
        />
        <div className="absolute right-0  mt-0.5 top-[50%] translate-y-[-50%] dark:bg-neutral-950 border dark:border-gray-800 text-xs rounded-lg select-none px-2 py-1 dark:text-gray-500">
          ESC
        </div>
      </div>
      <div className="mt-3 select-none flex flex-col items-star gap-y-1 w-full dark:text-neutral-400">
        {DashboardTabList.map((val, tabIndex) => {
          return (
            val.title.toLowerCase() !== "settings" && (
              <div
                key={tabIndex}
                className="transition-all duration-150 dark:hover:bg-[#1C222B] flex items-center gap-x-3 px-3 py-2 rounded-2xl"
              >
                {val.icon}
                {val.title}
              </div>
            )
          );
        })}
      </div>
    </motion.div>
  );
};
