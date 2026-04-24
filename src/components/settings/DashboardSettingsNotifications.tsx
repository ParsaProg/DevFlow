"use client";

import { motion } from "framer-motion";

export function DashboardSettingsNotification() {
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
        <h1 className="font-semibold text-sm">Notifications</h1>
        <span className="font-thin text-sm text-gray-500">
          Choose what you want to be notified about.
        </span>
      </div>
      <div className="w-full flex flex-col items-start gap-y-3 mt-3">
        <div className="flex w-full justify-between items-center">
          <div className="text-sm">
            <h1>Issue assigned to me</h1>
            <span className="text-gray-500 font-thin">
              Get notified when an issue is assigned to you.
            </span>
          </div>
          <div
            className={`cursor-pointer relative rounded-full h-7 w-13 ${"bg-blue-500"}`}
          >
            <div
              className={`absolute rounded-full bg-white w-6 h-6 right-0.5 top-[50%] translate-y-[-50%]`}
            ></div>
          </div>
        </div>
        <span className="w-full h-px rounded-full bg-gray-800"></span>
      </div>
      <div className="w-full flex flex-col items-start gap-y-3">
        <div className="flex w-full justify-between items-center">
          <div className="text-sm">
            <h1>Comments on my issues</h1>
            <span className="text-gray-500 font-thin">
              Get notified when someone comments on your issues.
            </span>
          </div>
          <div
            className={`cursor-pointer relative rounded-full h-7 w-13 ${"bg-blue-500"}`}
          >
            <div
              className={`absolute rounded-full bg-white w-6 h-6 ${"right-0.5"} top-[50%] translate-y-[-50%]`}
            ></div>
          </div>
        </div>
        <span className="w-full h-px rounded-full bg-gray-800"></span>
      </div>
      <div className="w-full flex flex-col items-start gap-y-3">
        <div className="flex w-full justify-between items-center">
          <div className="text-sm">
            <h1>Project updates</h1>
            <span className="text-gray-500 font-thin">
              Get notified about project milestone changes.
            </span>
          </div>
          <div
            className={`cursor-pointer relative rounded-full h-7 w-13 ${"bg-blue-500"}`}
          >
            <div
              className={`absolute rounded-full bg-white w-6 h-6 ${"right-0.5"} top-[50%] translate-y-[-50%]`}
            ></div>
          </div>
        </div>
        <span className="w-full h-px rounded-full bg-gray-800"></span>
      </div>
      <div className="w-full flex flex-col items-start gap-y-3">
        <div className="flex w-full justify-between items-center">
          <div className="text-sm">
            <h1>Weekly digest</h1>
            <span className="text-gray-500 font-thin">
              Receive a weekly summary of your workspace activity.
            </span>
          </div>
          <div
            className={`cursor-pointer relative rounded-full h-7 w-13 ${"bg-blue-500"}`}
          >
            <div
              className={`absolute rounded-full bg-white w-6 h-6 ${"right-0.5"} top-[50%] translate-y-[-50%]`}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
