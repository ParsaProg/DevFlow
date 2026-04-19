import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  return (
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
  );
}
