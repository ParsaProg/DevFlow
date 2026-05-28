"use client";

import { motion } from "framer-motion";
import SecuritySettingsContainer from "../ui/dashboard/settings/SecuritySettingsContainer";

export default function DashboardSettingsSecurityContainer() {
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
        <h1 className="font-semibold text-sm">Security</h1>
        <span className="font-thin text-sm text-gray-500">
          Manage your security settings and sessions.
        </span>
      </div>
      <SecuritySettingsContainer title='Two-Factor Authentication' subTitle="Add an extra layer of security to your account." buttonText="Enable"/>
      <SecuritySettingsContainer title='Change Password' subTitle="Update your password regularly for better security." buttonText="Update"/>
    </motion.div>
  );
}
