"use client";

import { motion } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";

interface HeaderMenuProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  user: any;
}

// 💎 Ultra-clean, modern spring curves
const menuVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 14,
      stiffness: 150,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: {
      duration: 0.12,
      ease: [0.32, 0, 0.67, 0], // Snappy fast ease-in curve
    },
  },
};

export default function DashboardHeaderMenu({
  menuRef,
  user,
}: HeaderMenuProps) {
  const menuItems = [
    { label: "Profile", icon: <User size={15} /> },
    { label: "Preferences", icon: <Settings size={15} /> },
    { label: "Sign Out", icon: <LogOut size={15} /> },
  ];

  return (
    <motion.div
      ref={menuRef}
      variants={{ menuVariants }}
      initial="hidden"
      animate="visible"
      exit="exit" // 👈 Explicitly linked to the exit variant map above
      className="w-64 h-auto rounded-xl absolute top-12 right-0 bg-[#0C1015]/95 backdrop-blur-md border border-neutral-800 shadow-2xl flex flex-col items-start gap-y-2.5 px-3.5 pt-4 pb-2.5 text-[13px] select-none z-50 origin-top-right"
    >
      <div className="px-1.5 pb-0.5">
        <h1 className="font-semibold text-neutral-200 tracking-wide">
          {user?.firstName || "User"} {user?.lastName || ""}
        </h1>
        <span className="text-neutral-500 font-normal text-[12px] block mt-0.5 truncate max-w-[220px]">
          {user?.email || "parsashaabani3@gmail.com"}
        </span>
      </div>

      <span className="w-full h-[1px] bg-neutral-800/80 block"></span>

      <div className="flex flex-col w-full gap-y-0.5">
        {menuItems.map((item, index) => {
          const isSignOut = item.label === "Sign Out";
          return (
            <div key={index} className="w-full">
              <div
                className={`flex items-center gap-x-2.5 font-medium rounded-lg transition-colors duration-150 w-full py-2 px-2.5 cursor-pointer text-left
                  ${
                    isSignOut
                      ? "text-red-400 hover:bg-red-500/10"
                      : "text-neutral-400 hover:bg-neutral-800/60 hover:text-neutral-200"
                  }`}
              >
                <span
                  className={isSignOut ? "text-red-400" : "text-neutral-500"}
                >
                  {item.icon}
                </span>
                <span className="text-[13px]">{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
