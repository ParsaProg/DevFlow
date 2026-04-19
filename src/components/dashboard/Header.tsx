"use client";

import { Bell, Command, Search } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggleButton from "../ui/ThemeToggleButton";

export default function DashboardPanelHeader() {
  const pathName = usePathname();
  const [mount, setMount] = useState<boolean | null>(null);
  useEffect(() => {
    const pth = pathName.toString().trim();
    if (pth === "/dashboard" || pth.includes("/dashboard/")) setMount(true);
  }, [pathName]);

  if (!mount) return null;

  return (
    <div className="flex items-center justify-between z-20 fixed top-0 right-0 w-[calc(100%-240px)] h-16 border-b border-b-gray-800 px-5">
      <motion.section whileTap={{ scale: 0.98 }} className="rounded-xl">
        <div className="pl-3 pr-2 py-2 select-none border border-gray-800 w-65 h-10 bg-[#0D1116] text-gray-500 flex items-center justify-between rounded-xl text-md font-medium transition-colors hover:bg-[#1d2229] hover:border-[#0069fd5c]">
          <div className="flex items-center gap-x-2">
            <Search size={17} />
            <span className="text-[15.5px]">search...</span>
          </div>
          <div className="pointer-events-none bg-[#00000092] rounded-lg text-gray-500 text-xs py-1 px-2 border border-gray-700 flex items-center ">
            <Command size={12} />K
          </div>
        </div>
      </motion.section>
      <section className="flex items-center gap-x-3">
        <ThemeToggleButton />
        <motion.div className="relative p-2 rounded-2xl border border-neutral-300 dark:border-[#1D2229] dark:bg-[#0D1116] bg-[#F0F2F6] text-sm">
          <Bell size={18} />
          <div className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-thin rounded-full w-4 h-4 flex items-center justify-center">
            3
          </div>
        </motion.div>
        <div className="cursor-pointer select-none transition-colors hover:bg-primary/20 w-9 h-9 text-sm rounded-full font-semibold flex items-center justify-center text-primary bg-primary/10">
          PS
        </div>
      </section>
    </div>
  );
}
