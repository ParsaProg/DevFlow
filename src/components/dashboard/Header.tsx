"use client";

import { Bell, Command, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggleButton from "../ui/ThemeToggleButton";

export default function DashboardPanelHeader({
  collapse,
}: {
  collapse: boolean;
}) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const pathName = usePathname();
  const [mount, setMount] = useState<boolean | null>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, [isShowMenu]);

  useEffect(() => {
    const pth = pathName.toString().trim();
    if (pth === "/dashboard" || pth.includes("/dashboard/")) setMount(true);
  }, [pathName]);

  if (!mount) return null;

  function toggleMenu(): void {
    setIsShowMenu(!isShowMenu);
  }

  return (
    <div
      className={`transition-all duration-300 flex items-center justify-between z-20 fixed top-0 right-0 ${collapse ? " w-[calc(100%-60px)]" : "w-[calc(100%-240px)]"} h-16 border-b border-b-gray-800 px-5`}
    >
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
        <div onClick={toggleMenu} className="relative">
          <div className="cursor-pointer select-none transition-colors hover:bg-primary/20 w-9 h-9 text-sm rounded-full font-semibold flex items-center justify-center text-primary bg-primary/10">
            PS
          </div>
          <AnimatePresence>
            {isShowMenu && (
              <motion.div
                ref={menuRef}
                key={"menu"}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, top: -20, scale: 0.6 },
                  visible: { opacity: 1, top: "46px", scale: 1 },
                }}
                className="w-70 h-auto rounded-xl absolute top-11.5 right-0 dark:bg-[#0C1015] border dark:border-neutral-800 flex flex-col items-start gap-y-3 px-4 pt-5 pb-3 text-[13px] select-none"
              >
                <div>
                  <h1 className="font-medium">Parsa Shaabani</h1>
                  <span className="text-gray-500">
                    parsashaabani3@gmail.com
                  </span>
                </div>
                <span className="w-full h-px bg-gray-800 rounded-full"></span>
                <div className="flex flex-col w-full">
                  {["Profile", "Prefrences", "Sign Out"].map((val, index) => {
                    return (
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        key={index}
                        className="w-full"
                      >
                        <div className="font-thin rounded-xl transition-all duration-200 hover:bg-gray-900 w-full py-2 px-3">
                          {val}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
