import { motion } from "framer-motion";
import Image from "next/image";
import DevFlowLogo from "@/app/assets/pictures/devflow.png";

export default function AuthPagesBrandShows() {
  return (
    <motion.div
      transition={{ delay: 0.33 , ease: "anticipate"}}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      }}
      className="flex items-center gap-x-2 text-xl"
    >
      <Image
        alt="DevFlow-Logo"
        src={DevFlowLogo.src}
        className="w-10 h-10"
        width={100}
        height={100}
      />
      <h1>DevFlow</h1>
    </motion.div>
  );
}
