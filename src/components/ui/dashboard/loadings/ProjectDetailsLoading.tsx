"use client";

import { motion } from "framer-motion";
import { Loader2, Layers } from "lucide-react";

export default function ProjectBoardLoader() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center">
      {/* Abstract Animated Workspace Graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative mb-6 flex items-center justify-center"
      >
        {/* Soft Background Pulse Ring */}
        <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl animate-pulse" />

        {/* Outer Tech Accent border box */}
        <div className="border border-neutral-800/80 bg-[#0C1015]/40 backdrop-blur-md rounded-2xl p-4 shadow-2xl">
          <div className="relative border border-dashed border-neutral-700/60 rounded-xl p-3.5 flex items-center justify-center">
            <Layers className="text-neutral-400" size={24} />

            {/* Spinning Indicator wrapping the icon */}
            <div className="absolute -inset-1.5 border border-transparent border-t-primary border-r-primary/40 rounded-xl animate-spin [animation-duration:1.2s]" />
          </div>
        </div>
      </motion.div>

      {/* Loading Status Typography */}
      <h3 className="text-neutral-200 font-medium text-base tracking-wide flex items-center gap-x-2">
        <Loader2 className="animate-spin text-primary" size={16} />
        Syncing Workspace Pipeline
      </h3>

      <p className="text-neutral-500 font-light text-xs max-w-xs mt-1.5 leading-relaxed tracking-normal">
        Assembling database channels, columns, and sprint matrices...
      </p>
    </div>
  );
}
