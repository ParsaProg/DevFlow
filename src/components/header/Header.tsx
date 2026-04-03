"use client";

import { headerLinkItems } from "@/src/data/header-items";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import NProgress from "nprogress";
import Image from "next/image";
import DevFlow from "@/app/assets/pictures/devflow.png";

export default function Header() {
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isShowMobileMenu, setIsShowMobileMenu] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [isBorderShow, setIsBorderShow] = useState<boolean>(false);
  const [showItems, setShowItems] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowItems(true);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const showBorderBottomCheck = () => {
      if (window.scrollY >= 10) setIsBorderShow(true);
      else setIsBorderShow(false);
    };

    showBorderBottomCheck();

    document.addEventListener("scroll", showBorderBottomCheck);

    return () => document.removeEventListener("scroll", showBorderBottomCheck);
  }, [isBorderShow]);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsShowMobileMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [mobileMenuRef, isShowMobileMenu]);

  useEffect(() => {
    if (isShowMobileMenu) {
      document.body.style.overflowY = "hidden";
    } else document.body.style.overflowY = "";
  }, [isShowMobileMenu]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, top: -100 },
          visible: { opacity: 1, top: 0 },
        }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className={`overflow-hidden z-99999 w-full left-[50%] translate-x-[-50%] fixed top-0 dark:border-b-[#1D2229] dark:border-b-0 ${isBorderShow && "dark:shadow-none shadow-[0px_0px_15px_1px] shadow-neutral-300 dark:border-b-1 dark:bg-[#05070bc5] bg-[#f6f7f8d3] backdrop-blur-sm"} bg-transparent transition-[shadow_colors] duration-200`}
      >
        <div className="mx-auto min-[1340px]:w-325 w-[92%] flex items-center justify-between py-5">
          <motion.div
            transition={{ delay: 0.6 }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <Link
              onClick={() => NProgress.start()}
              href={"/"}
              className="select-none flex items-center gap-x-3 font-bold"
            >
              <div className="overflow-hidden text-white rounded-xl w-8 h-8 items-center flex justify-center">
                <Image
                  width={100}
                  height={100}
                  alt="logo"
                  src={DevFlow.src}
                  className="w-100"
                />
              </div>
              <h1 className="text-xl font-semibold">DevFlow</h1>
            </Link>
          </motion.div>
          {showItems && (
            <section className="hidden min-[900px]:flex items-center text-neutral-700 dark:text-neutral-400 gap-x-7 ">
              {headerLinkItems.map((item, _i) => (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ delay: _i * 0.1 }}
                  key={_i}
                >
                  <Link
                    onClick={() => NProgress.start()}
                    className="text-md dark:hover:text-white hover:text-black transition-all duration-200"
                    href={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </section>
          )}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ delay: 0.6 }}
            className="flex items-center min-[1340px]:gap-x-5 gap-x-2"
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-2xl border border-neutral-300 dark:border-[#1D2229] dark:bg-[#0D1116] bg-[#F0F2F6] text-sm"
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
            <motion.div
              onClick={() => setIsShowMobileMenu(!isShowMobileMenu)}
              whileTap={{ scale: 0.95 }}
              className="max-[900px]:block hidden bg-background p-2 rounded-2xl border border-neutral-300 dark:border-[#1D2229] text-sm"
            >
              <AnimatePresence mode="wait">
                {isShowMobileMenu ? (
                  <motion.div
                    className="flex items-center justify-center"
                    transition={{ duration: 0.2 }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, rotate: "45deg" },
                      visible: { opacity: 1, rotate: 0 },
                    }}
                  >
                    <X key="close-icon" size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex items-center justify-center"
                    transition={{ duration: 0.2 }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0, rotate: "45deg" },
                      visible: { opacity: 1, rotate: 0 },
                    }}
                    key="menu-icon"
                  >
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <Link
              href={"/auth/sign-in"}
              className="hidden min-[900px]:block text-neutral-700 dark:text-neutral-400 dark:hover:text-white hover:text-black transition-all duration-200 text-md"
            >
              Sign In
            </Link>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                href={"/auth/sign-up"}
                className="hidden min-[900px]:block font-semibold text-sm transition-shadow duration-200 hover:shadow-[0px_5px_10px_-1px] hover:shadow-primary bg-primary text-white px-5 py-2 rounded-2xl"
              >
                Start Free
              </Link>
            </motion.div>
          </motion.section>
        </div>
      </motion.div>
      <AnimatePresence>
        {isShowMobileMenu && (
          <motion.div
            ref={mobileMenuRef}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: { opacity: 1, height: "auto" },
            }}
            className="overflow-hidden max-[900px]:flex hidden fixed z-9999 w-full flex-col items-start gap-y-7 bg-[#07090D] py-7 px-7 border-b dark:border-b-neutral-800 top-19.25 dark:text-gray-400 text-md"
          >
            {headerLinkItems.map((item, _i) => {
              return (
                <motion.div
                  key={_i}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ delay: _i * 0.1 }}
                >
                  <Link
                    href={item.toLowerCase()}
                    className="hover:dark:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </motion.div>
              );
            })}
            <div className="flex items-center gap-x-5">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 5 * 0.1 }}
              >
                <Link
                  href={"/auth/sign-in"}
                  className=" text-neutral-700 dark:text-neutral-400 dark:hover:text-white hover:text-black transition-all duration-200 text-md"
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ delay: 6 * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={"/auth/sign-up"}
                  className=" font-semibold text-sm transition-shadow duration-200 hover:shadow-[0px_5px_10px_-1px] hover:shadow-primary bg-primary text-white px-5 py-2 rounded-2xl"
                >
                  Start Free
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
