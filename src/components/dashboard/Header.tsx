"use client";

import { Bell, Command, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggleButton from "../ui/ThemeToggleButton";
import { usePortal } from "@/src/context/DashboardSearchPortalShowedContext";
import DashboardSearchPortal from "../portals/DashboardSearchPortal";
import CheckUserLoggedIn from "@/src/functions/CheckUserLoggedIn";
import DashboardHeaderMenu from "../ui/dashboard/DashboardHeaderMenu";
import { useUser } from "@/src/hooks/useUser";
import Link from "next/link";
import { fetchNotifications } from "@/src/services/FetchNotifications";

export default function DashboardPanelHeader({
  collapse,
}: {
  collapse: boolean;
}) {
  const { user } = useUser();
  const { showPortal, openPortal, closePortal } = usePortal();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const pathName = usePathname();
  const [mount, setMount] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);

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
    const loggedIn = CheckUserLoggedIn({ fromAuthPage: false });
    loggedIn.then((res) => {
      const pth = pathName.toString().trim();
      if ((pth === "/dashboard" || pth.includes("/dashboard/")) && res) {
        setMount(true);
        fetchNotifications({
          setLoading: setLoading,
          setNotifications: setNotifications,
        });
      } else setMount(false);
    });
  }, [pathName]);

  if (!mount) return null;

  function toggleMenu(): void {
    setIsShowMenu(!isShowMenu);
  }

  return (
    <>
      <div
        className={`transition-all duration-300 flex items-center justify-between z-20 fixed top-0 right-0 ${collapse ? " w-[calc(100%-60px)]" : "w-[calc(100%-240px)]"} h-16 border-b border-b-gray-800 px-5 dark:bg-[#05070bc5] bg-[#f6f7f8d3] backdrop-blur-sm`}
      >
        <motion.section
          onClick={openPortal}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl"
        >
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
          <Link href="/dashboard/notifications">
            {" "}
            <motion.div className="relative p-2 rounded-2xl border border-neutral-300 dark:border-[#1D2229] dark:bg-[#0D1116] bg-[#F0F2F6] text-sm">
              <Bell size={18} />
              {!loading && notifications.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[12px] text-center font-thin rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </div>
              )}
            </motion.div>
          </Link>
          <div onClick={toggleMenu} className="relative">
            <div className="cursor-pointer select-none transition-colors hover:bg-primary/20 w-9 h-9 text-sm rounded-full font-semibold flex items-center j ustify-center text-primary bg-primary/10">
              {user?.["firstName"]?.toString().charAt(0) +
                user?.["lastName"]?.toString().charAt(0)}
            </div>
            <AnimatePresence mode="popLayout">
              {isShowMenu && (
                <DashboardHeaderMenu
                  key="dashboard-header-menu"
                  menuRef={menuRef}
                  user={user}
                />
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
      <AnimatePresence>
        {showPortal && (
          <motion.div
            key="backdrop-blur-portal"
            onClick={closePortal}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
            className="fixed w-full h-screen backdrop-blur-lg z-9999999"
          ></motion.div>
        )}
        {showPortal && <DashboardSearchPortal />}
      </AnimatePresence>
    </>
  );
}
