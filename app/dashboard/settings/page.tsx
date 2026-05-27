"use client";

import { DashboardSettingsNotification } from "@/src/components/settings/DashboardSettingsNotifications";
import DashboardSettingsProfileForm from "@/src/components/settings/DashboardSettingsProfileForm";
import { useSidebar } from "@/src/context/DashBoardTabCollapseContext";
import { DashboardSettingsTabs } from "@/src/data/dashboard-settings.tabs";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardSettingsSecurityContainer from "@/src/components/settings/DashboardSettingsSecurityContainer";
import DashboardSettingsAppearance from "@/src/components/settings/DashboardSettingsAppearance";
import { useRouter } from "next/navigation";
import CheckUserLoggedIn from "@/src/functions/CheckUserLoggedIn";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { isCollapsed } = useSidebar();
  return (
    <div className="z-10 absolute top-0 bg-[#05070B] w-full h-screen">
      <div
        className={`transition-all duration-300 mt-24 ${isCollapsed ? "ml-15" : "ml-60"} px-[12vw] flex flex-col mx-auto gap-y-5`}
      >
        <section>
          <h1 className="text-white font-bold text-2xl">Settings</h1>
          <h3 className="text-gray-500 font-thin text-[17px] mt-1">
            Manage your account and workspace preferences.
          </h3>
        </section>
        <div className="flex items-start gap-x-5 justify-start w-full bg-[#05070B] z-20">
          <div className="flex flex-col items-start gap-y-1 w-[20%]">
            {DashboardSettingsTabs.map((dst, _i) => {
              return (
                <motion.div
                  key={_i}
                  className="w-full rounded-xl"
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    onClick={() => setTabIndex(_i)}
                    className={`${tabIndex === _i ? "bg-[#1C222B] text-white" : "text-gray-400"} w-full hover:bg-[#1C222B] select-none transition-all duration-200 flex items-center gap-x-2 rounded-xl px-3 py-3 text-sm`}
                  >
                    {dst.icon}
                    {dst.title}
                  </div>
                </motion.div>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            {tabIndex === 0 && <DashboardSettingsProfileForm />}
            {tabIndex === 1 && <DashboardSettingsNotification />}
            {tabIndex === 2 && <DashboardSettingsSecurityContainer />}
            {tabIndex === 3 && <DashboardSettingsAppearance />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
