import { motion } from "framer-motion";
import Image from "next/image";
import DevFlowLogo from "@/app/assets/pictures/devflow.png";
import { cn } from "@/lib/utils";

export default function AuthPagesBrandShows({
  showTitle = true,
  theme,
}: {
  showTitle?: boolean;
  theme?: "dark" | "light";
}) {
  return (
    <motion.div
      transition={{ delay: 0.33, ease: "anticipate" }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      }}
      className={cn("flex items-center gap-x-2 text-xl w-10 h-10", theme === "dark"? "text-black":"text-white")}
    >
      <Image
        alt="DevFlow-Logo"
        src={DevFlowLogo.src}
        className="w-10 h-10"
        width={100}
        height={100}
      />
      {showTitle && <h1>DevFlow</h1>}
    </motion.div>
  );
}
