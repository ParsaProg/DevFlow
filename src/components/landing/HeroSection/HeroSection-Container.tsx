"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "@/src/animations/herosection-right-two-card.css";
import {
  BoxesIcon,
  CheckCircle2,
  CheckCircle2Icon,
  GitBranch,
  Zap,
} from "lucide-react";
import { useRef } from "react";

/**
 * Animation: Smooth 3D Card Tilt (perspective tilt following the mouse)
 *
 * The whole card tilts as if you're physically holding it and rotating it
 * toward the cursor. A soft specular highlight glides across the surface
 * to sell the 3D illusion — exactly like in the reference video.
 *
 * Technique:
 *  - Track normalised cursor position [-1, +1] relative to card center
 *  - Map to rotateX / rotateY (±12°) with a CSS perspective wrapper
 *  - Overlay a radial-gradient "shine" that moves with the cursor
 *  - Wrap everything in framer-motion springs for buttery smoothness
 *  - On mouse-leave: springs return to 0 (flat)
 */

const SPRING_CONFIG = { stiffness: 150, damping: 30, mass: 1 };
const MAX_TILT = 12; // degrees

const HeroSectionContainer = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // normalised [-1, +1] cursor position
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  // smooth spring values
  const rotateY = useSpring(
    useTransform(nx, [-1, 1], [-MAX_TILT, MAX_TILT]),
    SPRING_CONFIG,
  );
  const rotateX = useSpring(
    useTransform(ny, [-1, 1], [MAX_TILT, -MAX_TILT]),
    SPRING_CONFIG,
  );

  // shine position: cursor mapped to percentage for the radial gradient
  const shineX = useSpring(useTransform(nx, [-1, 1], [20, 80]), SPRING_CONFIG);
  const shineY = useSpring(useTransform(ny, [-1, 1], [20, 80]), SPRING_CONFIG);
  const shineOpacity = useSpring(0, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    nx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    ny.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    shineOpacity.set(1);
  };

  const handleMouseLeave = () => {
    nx.set(0);
    ny.set(0);
    shineOpacity.set(0);
  };

  // ── data ─────────────────────────────────────────────────────────────────
  const stats = [
    { icon: <GitBranch size={18} />, value: 24, label: "Open issues" },
    { icon: <Zap size={18} />, value: 12, label: "In Progress" },
    { icon: <CheckCircle2Icon size={18} />, value: 156, label: "Completed" },
  ];

  const tasks = [
    { color: "#277EFF", title: "Implement auth flow", level: "High" },
    { color: "#7C8186", title: "Design system update", level: "Medium" },
    { color: "#00A9B3", title: "Api rate limiting", level: "Low" },
  ];

  // ─────────────────────────────────────────────────────────────────────────

  return (
    /*
     * Perspective wrapper — this is what makes the tilt look 3D.
     * The perspective value controls "depth". 800px feels natural for a card.
     */
    <div
      style={{ perspective: "800px" }}
      className="min-[1340px]:scale-[0.95] w-full relative"
    >
      {/* ── Floating badge — top right ─────────────────────────────────── */}
      <div
        className="gap-x-2 dark:bg-[#0C1015] border dark:border-neutral-800
                   text-primary absolute -top-5 right-0 z-20
                   flex items-center rounded-2xl py-2 px-4 pointer-events-none animate-top-container"
      >
        <BoxesIcon size={18} />
        <h1 className="dark:text-white font-semibold text-neutral-900 text-sm sm:text-base">
          3 Project Active
        </h1>
      </div>

      {/* ── Floating badge — bottom left ───────────────────────────────── */}
      <div
        className="gap-x-2 dark:bg-[#0C1015] border dark:border-neutral-800
                   text-cyan-500 absolute -bottom-10 left-0 z-20
                   flex items-center rounded-2xl py-2 px-4 pointer-events-none animate-bottom-container"
      >
        <CheckCircle2 size={18} />
        <h1 className="dark:text-white font-semibold text-neutral-900 text-sm sm:text-base">
          Task Completed
        </h1>
      </div>

      {/* ── Tilting card ───────────────────────────────────────────────── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full rounded-3xl border dark:border-neutral-800
                   dark:bg-[#0C1015] shadow-primary/15 shadow-[0px_0px_100px_20px]
                   overflow-hidden cursor-pointer"
      >
        {/* ── Specular shine overlay ───────────────────────────────────── */}
        <motion.div
          style={{
            opacity: shineOpacity,
            background: useTransform(
              [shineX, shineY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.07) 0%, transparent 65%)`,
            ),
          }}
          className="absolute inset-0 z-10 pointer-events-none rounded-3xl"
        />

        {/* ── Card content ─────────────────────────────────────────────── */}
        <div className="relative z-0 flex flex-col gap-y-5 p-4 sm:p-5">
          {/* Fake window chrome */}
          <div className="flex items-center gap-x-8">
            <div className="flex items-center gap-x-1.5">
              <div className="rounded-full w-2.5 h-2.5 bg-red-500/80" />
              <div className="rounded-full w-2.5 h-2.5 bg-yellow-500/80" />
              <div className="rounded-full w-2.5 h-2.5 bg-green-500/80" />
            </div>
            <div className="flex-1 h-5 rounded-full dark:bg-[#171B22]" />
          </div>

          {/* Stats row */}
          <div className="flex gap-x-2 sm:gap-x-3">
            {stats.map((item, i) => (
              <div
                key={i}
                className="flex-1 min-w-0 rounded-2xl bg-[#11151B] p-2 sm:p-3
                           flex flex-col border dark:border-neutral-800 gap-y-1"
              >
                <div className="text-primary">{item.icon}</div>
                <h1 className="font-semibold text-lg sm:text-2xl">
                  {item.value}
                </h1>
                <h2 className="font-semibold text-xs sm:text-sm dark:text-neutral-500 truncate">
                  {item.label}
                </h2>
              </div>
            ))}
          </div>

          {/* Task list */}
          <div className="flex flex-col gap-y-2 w-full">
            {tasks.map((item, i) => (
              <div
                key={i}
                className="w-full flex items-center justify-between rounded-2xl
                           p-2 sm:p-3 dark:bg-[#090C10] border dark:border-neutral-800"
              >
                <div className="flex items-center gap-x-2 sm:gap-x-3 min-w-0">
                  <div
                    style={{ backgroundColor: item.color }}
                    className="rounded-full w-2 h-2 shrink-0"
                  />
                  <h1
                    className="font-semibold text-sm dark:text-neutral-200
                                 text-neutral-800 truncate"
                  >
                    {item.title}
                  </h1>
                </div>
                <span
                  className="text-xs sm:text-sm font-semibold
                                 dark:text-neutral-500 text-neutral-800
                                 shrink-0 ml-2"
                >
                  {item.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSectionContainer;
