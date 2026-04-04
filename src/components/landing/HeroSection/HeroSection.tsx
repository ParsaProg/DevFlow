import { ArrowRight } from "lucide-react";
import HeroSectionContainer from "./HeroSection-Container";
import { HeroGeometric } from "@/src/components/ui/shape-landing-hero";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const developersList = [
    { name: "A", color: "#277DFF" },
    { name: "B", color: "#00A9B3" },
    { name: "C", color: "#6363C6" },
    { name: "D", color: "#23BA7D" },
  ];

  return (
    // Root: auto height on mobile, fixed vw on very wide screens
    <div className="relative min-[1450px]:h-[53vw] h-auto min-h-screen sm:min-h-0">
      {/* Blur blobs — hidden on small mobile to avoid overflow */}
      <div className="hidden sm:block absolute top-[50%] translate-y-[-50%] left-0 w-50 h-70 rounded-full bg-primary blur-[150px] opacity-30 -translate-x-20 pointer-events-none" />
      <div className="hidden sm:block absolute top-[50%] translate-y-[-50%] right-0 w-50 h-70 rounded-full bg-purple-500 blur-[100px] opacity-10 translate-x-30 pointer-events-none" />

      {/* Background grid pattern */}
      {/* <div className="absolute w-full text-center pointer-events-none">
        <div className="w-full max-[900px]:opacity-50 min-[1450px]:h-[53vw] h-screen flex aspect-video flex-col items-center justify-center">
          <BGPattern variant="grid" mask="fade-edges" />
        </div>
      </div> */}

      <div className="absolute inset-0 w-full h-[53vw]">
        <HeroGeometric />
      </div>

      {/* ── Main content ── */}
      <div
        className="
          relative z-99
          flex flex-col lg:flex-row
          items-center
          lg:items-center
          lg:justify-between
          gap-y-16 lg:gap-y-0
          w-full
          max-w-[90%]
          min-[1300px]:w-325
          mx-auto
          py-24 sm:py-28 lg:py-0
          lg:min-h-screen
          min-[1450px]:min-h-[53vw]
        "
      >
        {/* ── Left: text content ── */}
        <section className="w-full lg:w-[50%] flex flex-col items-start gap-y-8">
          {/* Beta badge */}
          <motion.div
            transition={{ delay: 0.5 }}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, x: -100 },
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            className="rounded-full dark:bg-[#0f121a] bg-[#F1F3F7] border dark:border-neutral-700 border-neutral-700 text-neutral-600 dark:text-neutral-400 flex items-center py-2 px-4 gap-x-2 text-xs"
          >
            <div className="relative">
              <div className="rounded-full bg-[#00A9B3] w-2 h-2">
                <div className="rounded-full bg-[#00A9B3] w-2 h-2 animate-ping" />
              </div>
            </div>
            Now in Public Beta
          </motion.div>

          {/* Headline */}
          <motion.h1
            transition={{ delay: 0.6 }}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, x: -100 },
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            className="flex flex-col text-4xl sm:text-5xl lg:text-6xl gap-y-2 font-bold"
          >
            Ship faster with
            <span className="text-primary">structured clarity</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            transition={{ delay: 0.7 }}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, x: -100 },
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            className="w-full max-w-[500px] text-neutral-600 dark:text-neutral-400 text-base sm:text-lg lg:text-xl"
          >
            The developer workspace that combines issue tracking, task
            management, and team collaboration into one streamlined experience.
          </motion.p>

          {/* CTA buttons */}
          <div className="w-full min-[700px]:flex-row flex-col flex items-center gap-5 font-semibold mt-3">
            <motion.div
              className="w-full sm:w-auto "
              transition={{ delay: 0.8 }}
              initial="hidden"
              variants={{
                hidden: { opacity: 0, x: -100 },
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
            >
              <button className="justify-center max-[900px]:w-full transition-all duration-300 hover:translate-y-[-3px] cursor-pointer rounded-2xl px-7 py-3 bg-primary text-white shadow-primary/70 shadow-[0px_0px_25px_0px] flex items-center gap-x-2 text-sm">
                Start Free
                <ArrowRight size={18} />
              </button>
            </motion.div>

            <motion.div
              className="sm:w-auto w-full"
              transition={{ delay: 0.9 }}
              initial="hidden"
              variants={{
                hidden: { opacity: 0, x: -200 },
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
            >
              <button className="max-[900px]:w-full transition-all dark:hover:bg-[#181b22] duration-300 hover:translate-y-[-3px] cursor-pointer border dark:border-neutral-800 rounded-2xl px-7 py-3 dark:text-white text-black dark:bg-[#1e232e4e] text-sm">
                Back Demo
              </button>
            </motion.div>
          </div>

          {/* Divider */}
          <span className="mt-2 w-full h-[0.25px] dark:bg-neutral-800 bg-neutral-400" />

          {/* Developers trust row */}

          <div className="mt-2 flex items-center gap-x-3">
            <div className="flex relative items-center">
              {developersList.map((val, _i) => (
                <motion.div
                  transition={{ delay: _i * 0.1 }}
                  initial="hidden"
                  variants={{
                    hidden: { opacity: 0, scale: 0.5 },
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  key={_i}
                  style={{
                    backgroundColor: val.color,
                    marginLeft: `${_i * 25}px`,
                  }}
                  className="absolute rounded-full text-xs w-8 h-8 flex items-center justify-center font-semibold text-white border-2 border-background"
                >
                  {val.name}
                </motion.div>
              ))}
            </div>
            <motion.span
              transition={{ delay: 4 * 0.1 }}
              initial="hidden"
              variants={{
                hidden: { opacity: 0, x: -100 },
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              className="text-xs ml-28 text-white font-medium"
            >
              2,400+{" "}
              <span className="dark:text-neutral-500">
                developers trust DevFlow
              </span>
            </motion.span>
          </div>
        </section>

        {/* ── Right: 3D card — full width on mobile, 45% on desktop ── */}
        <motion.div
          transition={{ delay: 1.1, duration: 0.3 }}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, scale: 0.3 },
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          className="w-full sm:w-[85%] md:w-[70%] lg:w-[45%]"
        >
          <HeroSectionContainer />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
