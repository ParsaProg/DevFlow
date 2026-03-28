import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BoxesIcon,
  CheckCircle2,
  CheckCircle2Icon,
  GitBranch,
  Zap,
} from "lucide-react";
import { useRef } from "react";
import "@/src/animations/herosection-right-two-card.css";

const HeroSectionContainer = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smoother motion
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 80,
    damping: 25,
    mass: 1.2,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    stiffness: 80,
    damping: 25,
    mass: 1.2,
  });

  // For shadow effect
  const shadowX = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), {
    stiffness: 80,
    damping: 25,
    mass: 1.2,
  });
  const shadowY = useSpring(useTransform(y, [-0.5, 0.5], [-20, 20]), {
    stiffness: 80,
    damping: 25,
    mass: 1.2,
  });

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize coordinates to range [-0.5, 0.5]
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  const RightHeroSectionItems = [
    {
      icon: <GitBranch size={18} />,
      titleNumber: 24,
      subTitle: "Open issues",
    },
    {
      icon: <Zap size={18} />,
      titleNumber: 12,
      subTitle: "In Progress",
    },
    {
      icon: <CheckCircle2Icon size={18} />,
      titleNumber: 156,
      subTitle: "Completed",
    },
  ];

  const BottomHeroRightData = [
    { color: "#277EFF", title: "Implement auth flow", level: "High" },
    { color: "#7C8186", title: "Design system update", level: "Medium" },
    { color: "#00A9B3", title: "Api rate limiting", level: "Low" },
  ];

  return (
    <motion.section
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="scale-[0.95] rounded-3xl w-[45%] relative shadow-primary/15 shadow-[0px_0px_100px_20px]"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Floating badges with enhanced depth */}
        <div className="gap-x-2 dark:bg-[#0C1015] border dark:border-neutral-800 text-primary absolute -top-5 right-0 flex items-center rounded-2xl py-2 px-4 animate-top-container">
          <BoxesIcon size={18} />
          <h1 className="dark:text-white font-semibold text-neutral-900">
            3 Project Active
          </h1>
        </div>

        <div className="gap-x-2 dark:bg-[#0C1015] border dark:border-neutral-800 text-cyan-500 absolute -bottom-10 left-0 flex items-center rounded-2xl py-2 px-4 animate-bottom-container">
          <CheckCircle2 size={18} />
          <h1 className="dark:text-white font-semibold text-neutral-900">
            Task Completed
          </h1>
        </div>

        <div className="w-full flex flex-col gap-y-5 rounded-3xl border dark:border-neutral-800 dark:bg-[#0C1015] p-5">
          {/* Your existing content */}
          <div className="flex items-center gap-x-8">
            <div className="flex items-center gap-x-1.5">
              <div className="rounded-full w-2.5 h-2.5 bg-red-800/95"></div>
              <div className="rounded-full w-2.5 h-2.5 bg-green-800/95"></div>
              <div className="rounded-full w-2.5 h-2.5 bg-cyan-800/95"></div>
            </div>
            <div className="w-50 h-5 rounded-full dark:bg-[#171B22]"></div>
          </div>

          <div className="flex gap-x-3">
            {RightHeroSectionItems.map((item, _i) => {
              return (
                <motion.div
                  key={_i}
                  className="w-full rounded-2xl bg-[#11151B] p-3 flex flex-col border dark:border-neutral-800 gap-y-1"
                  style={{ transform: `translateZ(${15 - _i * 2}px)` }}
                  whileHover={{
                    transform: `translateZ(${25 - _i * 2}px) scale(1.02)`,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="text-primary">{item.icon}</div>
                  <h1 className="font-semibold text-2xl">{item.titleNumber}</h1>
                  <h2 className="font-semibold text-sm dark:text-neutral-500">
                    {item.subTitle}
                  </h2>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col gap-y-2 w-full">
            {BottomHeroRightData.map((item, _i) => {
              return (
                <motion.div
                  key={_i}
                  className={`w-full flex items-center justify-between rounded-2xl p-3 dark:bg-[#090C10] border dark:border-neutral-800`}
                  style={{ transform: `translateZ(${10 - _i}px)` }}
                  whileHover={{
                    transform: `translateZ(${18 - _i}px)`,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex items-center gap-x-3">
                    <div
                      style={{
                        backgroundColor: item.color,
                      }}
                      className="rounded-full w-2 h-2"
                    ></div>
                    <h1 className="font-semibold text-md dark:text-neutral-200 text-neutral-800">
                      {item.title}
                    </h1>
                  </div>
                  <span className="text-sm font-semibold dark:text-neutral-500 text-neutral-800">
                    {item.level}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSectionContainer;
