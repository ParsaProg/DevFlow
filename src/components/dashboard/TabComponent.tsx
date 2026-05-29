"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import AuthPagesBrandShows from "../auth/BrandShows";
import { useEffect, useState } from "react";
import { DashboardTabList } from "@/src/data/dashboard-tab-component-list";
import Link from "next/link";
import { ChevronsLeft } from "lucide-react";
import { TabComponentInterface } from "@/src/interfaces/tab-component-interface";
import CheckUserLoggedIn from "@/src/functions/CheckUserLoggedIn";

export default function TabComponent({
  collapse,
  setCollapse,
}: TabComponentInterface) {
  const toggleCollapse = () => {
    setCollapse(!collapse);
  };
  const pathName = usePathname();
  const [mount, setMount] = useState<boolean | null>(null);
  useEffect(() => {
    const loggedIn = CheckUserLoggedIn({ fromAuthPage: false });
    loggedIn.then((res) => {
      const pth = pathName.toString().trim();
      if ((pth === "/dashboard" || pth.includes("/dashboard/")) && res)
        setMount(true);
      else setMount(false);
    });
  }, [pathName]);

  if (!mount) return null;
  return (
    <motion.div
      transition={{ duration: 0.5 }}
      className={`transition-all duration-300 shrink-0 bg-[#080B10] z-20 fixed top-0 left-0 ${collapse ? "w-15" : "w-60"} h-screen border-r border-r-gray-800 overflow-hidden`}
    >
      <div className="relative h-16 w-full border-b border-b-gray-800 flex flex-col justify-center">
        <div
          className={`absolute scale-[0.8] ${collapse ? "left-2" : "left-1 "}`}
        >
          <AuthPagesBrandShows showTitle={!collapse} />
        </div>
      </div>
      <div className="flex flex-col gap-y-1 w-[100%-12px] mx-3 mt-5">
        {DashboardTabList.map((val, _i) => {
          return (
            <Link
              key={_i}
              href={
                val.title.toLowerCase() === "dashboard" &&
                pathName === "/dashboard"
                  ? "/dashboard"
                  : val.title.toLowerCase() === "dashboard"
                    ? "/dashboard"
                    : `/dashboard/${val.title.toString().toLowerCase()}`
              }
              className={`${pathName === "/dashboard" ? pathName === `/${val.title.toLowerCase()}` && "bg-gray-900 text-primary" : pathName === `/dashboard/${val.title.toLowerCase()}` ? "bg-gray-900 text-primary" : pathName === `/dashboard/${val.title.toLowerCase()}/${pathName.split("/")[3]}` ? "bg-gray-900 text-primary" : ""} ${collapse ? "p-2.25" : "px-3 py-2"} text-[14.5px] text-gray-400 gap-x-2 relative rounded-xl w-full flex items-center transition-all duration-200 hover:bg-gray-900`}
            >
              {val.icon}
              <AnimatePresence>
                {!collapse && (
                  <motion.h1
                    transition={{ delay: 0.1 }}
                    key={"title"}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    {val.title}
                  </motion.h1>
                )}
              </AnimatePresence>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, height: 0 },
                  visible: { opacity: 1, height: "20px" },
                }}
                className={`transition-all duration-300 absolute left-0 w-0.5 rounded-full ${pathName === "/dashboard" ? pathName === `/${val.title.toLowerCase()}` && "bg-primary " : pathName === `/dashboard/${val.title.toLowerCase()}` ? "bg-primary" : pathName === `/dashboard/${val.title.toLowerCase()}/${pathName.split("/")[3]}` ? "bg-primary" : ""}`}
              ></motion.div>
            </Link>
          );
        })}
      </div>
      <div className="px-4 absolute bottom-0 flex items-center justify-center gap-x-2 w-full border-t dark:border-t-neutral-800 text-sm font-semibold select-none h-15 text-center text-neutral-500">
        <motion.div
          onClick={toggleCollapse}
          className="w-full"
          whileTap={{ scale: 0.98 }}
        >
          <div className="transition-colors duration-300 dark:hover:bg-gray-800/40 rounded-2xl py-2 flex items-center justify-center gap-x-2 w-full">
            <ChevronsLeft size={15} className={`${collapse && "rotate-180"}`} />
            {!collapse && <span>Collapse</span>}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
