"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import AuthPagesBrandShows from "../auth/BrandShows";
import { useEffect, useState } from "react";
import { DashboardTabList } from "@/src/data/dashboard-tab-component-list";
import Link from "next/link";

export default function TabComponent() {
  const pathName = usePathname();
  const [mount, setMount] = useState<boolean | null>(null);
  useEffect(() => {
    const pth = pathName.toString().trim();
    if (pth === "/dashboard" || pth.includes("/dashboard/")) setMount(true);
  }, [pathName]);

  if (!mount) return null;
  return (
    <div className="bg-[#080B10] z-20 fixed top-0 left-0 w-60 h-screen border-r border-r-gray-800">
      <div className="relative h-16 w-full border-b border-b-gray-800 flex flex-col justify-center">
        <div className="left-0 absolute scale-[0.8] mr-5">
          <AuthPagesBrandShows />
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
              className={`${pathName === "/dashboard" ? pathName === `/${val.title.toLowerCase()}` && "bg-gray-900 text-primary" : pathName === `/dashboard/${val.title.toLowerCase()}` ? "bg-gray-900 text-primary" : ""} px-3 py-2 text-[14.5px] text-gray-400 gap-x-2 relative rounded-xl w-full flex items-center transition-all duration-200 hover:bg-gray-900`}
            >
              {val.icon}
              <h1>{val.title}</h1>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, height: 0 },
                  visible: { opacity: 1, height: "20px" },
                }}
                className={`transition-all duration-300 absolute left-0 w-0.5 rounded-full ${pathName === "/dashboard" ? pathName === `/${val.title.toLowerCase()}` && "bg-primary " : pathName === `/dashboard/${val.title.toLowerCase()}` ? "bg-primary" : ""}`}
              ></motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
