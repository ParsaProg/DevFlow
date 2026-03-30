"use client";

import { headerLinkItems } from "@/src/data/header-items";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import NProgress from "nprogress";

export default function Header() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [isBorderShow, setIsBorderShow] = useState<boolean>(false);

  useEffect(() => {
    const showBorderBottomCheck = () => {
      if (window.scrollY >= 10) setIsBorderShow(true);
      else setIsBorderShow(false);
    };

    document.addEventListener("scroll", showBorderBottomCheck);

    return () => document.removeEventListener("scroll", showBorderBottomCheck);
  }, [isBorderShow]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div
      className={`z-99999 w-full fixed top-0 dark:border-b-[#1D2229] dark:border-b-0 ${isBorderShow && "dark:shadow-none shadow-[0px_0px_15px_1px] shadow-neutral-300 dark:border-b-1 dark:bg-[#05070bc5] bg-[#f6f7f8d3] backdrop-blur-sm"} bg-transparent transition-[shadow_colors] duration-200`}
    >
      <div className="mx-auto min-[1300px]:w-325 flex items-center justify-between py-5">
        <Link
          onClick={() => NProgress.start()}
          href={"/"}
          className="select-none flex items-center gap-x-2 font-bold"
        >
          <div className="text-white rounded-xl bg-primary w-8 h-8 items-center flex justify-center">
            D
          </div>
          <h1 className="text-xl font-semibold">DevFlow</h1>
        </Link>
        <section className="flex items-center text-neutral-700 dark:text-neutral-400 gap-x-7 ">
          {headerLinkItems.map((item, _i) => (
            <Link
              onClick={() => NProgress.start()}
              className="text-md dark:hover:text-white hover:text-black transition-all duration-200"
              href={`/${item.toLowerCase()}`}
              key={_i}
            >
              {item}
            </Link>
          ))}
        </section>
        <section className="flex items-center gap-x-5">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full border border-neutral-300 dark:border-[#1D2229] dark:bg-[#0D1116] bg-[#F0F2F6] text-sm"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div
                  key={"light"}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0, rotate: "25deg" },
                    visible: { opacity: 1, rotate: 0 },
                  }}
                  onClick={() => setTheme("light")}
                >
                  <Moon size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key={"dark"}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0, rotate: "45deg" },
                    visible: { opacity: 1, rotate: 0 },
                  }}
                  onClick={() => setTheme("dark")}
                >
                  <Sun size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <Link
            href={"/auth/sign-in"}
            className="text-neutral-700 dark:text-neutral-400 dark:hover:text-white hover:text-black transition-all duration-200 text-md"
          >
            Sign In
          </Link>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href={"/auth/sign-up"}
              className="font-semibold text-sm transition-shadow duration-200 hover:shadow-[0px_5px_10px_-1px] hover:shadow-primary bg-primary text-white px-5 py-2 rounded-2xl"
            >
              Start Free
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
