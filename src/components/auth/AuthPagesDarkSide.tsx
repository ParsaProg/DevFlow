"use client";

import { motion } from "framer-motion";
import { BGPattern } from "../pattern/HeroBackgroundPattern";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import { BusIcon, HomeIcon } from "lucide-react";
import AuthPagesBrandShows from "./BrandShows";

type LeftSideSubtitleType = {
  type: "sign-in" | "sign-up";
};

export default function AuthPagesDarkSides({ type }: LeftSideSubtitleType) {
  const navigate = useRouter();
  return (
    <section className="text-white flex flex-col justify-center w-[50%] h-screen bg-[#0A0A0A] relative overflow-hidden">
      <motion.div
        transition={{ delay: 1, duration: 1, ease: "backInOut" }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { scale: 0, x: 100, rotate: 90 },
          visible: { scale: 1, x: 0, rotate: 13 },
        }}
        className="absolute top-30 right-65 rounded-lg bg-[#cac7c7] opacity-15 w-20 h-20 scale-[0.8] rotate-13"
      ></motion.div>
      <motion.div
        transition={{ delay: 1, duration: 1, ease: "anticipate" }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { scale: 0, y: 100 },
          visible: { scale: 1, y: 0 },
        }}
        className="absolute opacity-30 bottom-13 right-55 rounded-full border border-neutral-400 w-33 h-33"
      ></motion.div>
      <motion.div
        transition={{ delay: 0.8, duration: 2, ease: "anticipate" }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0.1 },
          visible: { opacity: 1 },
        }}
        className="z-1 absolute w-full text-center h-screen"
      >
        <div className="w-full h-screen flex aspect-video flex-col items-center justify-center">
          <BGPattern variant="grid" mask="fade-edges" />
        </div>
      </motion.div>

      <div className="pl-24 text-5xl">
        <AuthPagesBrandShows />
        <motion.div
          transition={{ delay: 0.53, duration: 0.6, ease: "anticipate" }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <motion.button
            onClick={() => {
              NProgress.start();
              navigate.push("/");
            }}
            whileTap={{ scale: 0.95 }}
            className="text-white select-none group z-9999 absolute cursor-pointer text-sm font-thin rounded-full bg-[#1a1b1db2] px-4 py-2 flex items-center gap-x-2 border border-neutral-700 mb-5 mt-5 overflow-hidden"
          >
            <HomeIcon size={18} />
            Back to Home
            <div className="-translate-y-20 transition-all duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-[1] bg-[#0000004d] backdrop-blur-[1.8px] absolute top-0 left-0 w-full py-5"></div>
            <div className="transition-all duration-500 opacity-0 text-neutral-200 absolute left-0 group-hover:left-[50%] group-hover:translate-x-[-50%] group-hover:opacity-[1]">
              <BusIcon size={18} />
            </div>
          </motion.button>
        </motion.div>
        <motion.h1
          transition={{ delay: 0.73, duration: 0.6, ease: "anticipate" }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          className="mt-20 font-semibold text-5xl text-white"
        >
          Welcome back.
        </motion.h1>
        <motion.h2
          transition={{ delay: 0.93, duration: 0.6, ease: "anticipate" }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          className="py-3 bg-[#fefefe89] text-transparent bg-clip-text font-bold"
        >
          {type === "sign-in" ? "Sign in" : "Register"} to continue.
        </motion.h2>
        <motion.p
          transition={{ delay: 1.13, duration: 0.6, ease: "anticipate" }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
          className="leading-[25px] mt-3 dark:text-neutral-400 text-[16px]"
        >
          Access your account and explore what's new. We've <br /> been waiting
          for you.
        </motion.p>
      </div>
    </section>
  );
}
