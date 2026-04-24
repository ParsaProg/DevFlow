"use client";
import { motion } from "framer-motion";
import ThemeChangeAppearanceContainer from "../ui/settings/ThemeChangeContainer";

export default function DashboardSettingsAppearance() {
  return (
    <motion.div
      key="notifications"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      }}
      className="flex flex-col gap-y-8 items-start w-[80%] dark:bg-[#0C1015] border dark:border-gray-800 rounded-2xl p-5 z-1"
    >
      <div>
        <h1 className="font-semibold text-sm">Appearance</h1>
        <span className="font-thin text-sm text-gray-500">
          Customize the look and feel of your workspace.
        </span>
      </div>
      <div className="text-xs">
        <h1 className="font-thin text-sm">Theme</h1>
        <span className="font-thin text-gray-500">
          Use the theme toggle in the topbar to switch between light and dark
          mode.
        </span>
      </div>
      <div className="flex items-center w-full gap-x-5">
        <ThemeChangeAppearanceContainer text="light"/>
        <ThemeChangeAppearanceContainer text="dark"/>
      </div>
    </motion.div>
  );
}
