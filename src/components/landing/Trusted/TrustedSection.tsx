import { trustedUsersCommentsLandingItem } from "@/src/data/trusted-users-comments-data-landing";
import { motion } from "framer-motion";

export default function LandingTrustedSection() {
  const trustedCompanys = [
    "Axiom",
    "Stately",
    "Veritas",
    "Neon",
    "Prisma",
    "Railway",
  ];

  return (
    <div className="w-full max-[1340px]:w-[90%] mx-auto">
      <div className="min-[1340px]:max-w-325 w-full mx-auto pt-12 sm:pt-16 md:pt-20 lg:pt-30 flex flex-col items-center gap-y-5">
        <motion.span
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          initial="hidden"
          whileInView="animate"
          variants={{
            hidden: { opacity: 0, x: -100 },
            animate: { opacity: 1, x: 0 },
          }}
          className="dark:text-neutral-500 text-sm shimmer text-center"
        >
          Trusted by engineering teams at
        </motion.span>

        {/* Trusted companies grid - responsive wrapping */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 mt-1 px-2">
          {trustedCompanys.map((tItem, _i) => {
            return (
              <motion.div
                transition={{ delay: _i * 0.1 }}
                viewport={{ once: true }}
                initial="hidden"
                whileInView="animate"
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  animate: { opacity: 1, x: 0 },
                }}
                key={_i}
                className="shimmer text-sm sm:text-base md:text-lg lg:text-xl py-1.5 sm:py-2 px-3 sm:px-4 border dark:border-gray-900 rounded-2xl dark:text-gray-700 font-semibold shimmer--slow"
              >
                {tItem}
              </motion.div>
            );
          })}
        </div>

        {/* Comments section - responsive grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-10">
          {trustedUsersCommentsLandingItem.map((tuc, _i) => {
            return (
              <motion.div
                transition={{ delay: _i * 0.2 }}
                viewport={{ once: true }}
                initial="hidden"
                whileInView="animate"
                variants={{
                  hidden: { opacity: 0, x: -100 },
                  animate: { opacity: 1, x: 0 },
                }}
                key={_i}
                className="flex flex-col gap-y-4 sm:gap-y-5 items-start w-full rounded-3xl px-4 sm:px-5 pt-4 sm:pt-5 pb-6 sm:pb-8 dark:bg-[#0C1015] border dark:border-neutral-800"
              >
                <p className="text-xs sm:text-sm line-clamp-4 sm:line-clamp-none">
                  {`"${tuc.comment}"`}
                </p>
                <section className="flex items-center gap-x-3 w-full">
                  <div className="rounded-full bg-primary/15 text-primary w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center font-semibold text-sm sm:text-md">
                    {`${tuc.author[0]}${tuc.author.toString()[tuc.author.indexOf(",") + 2]}`}
                  </div>
                  <div className="flex flex-col gap-y-1 min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-medium truncate">
                      {tuc.author.split(",")}
                    </span>
                    <span className="text-[11px] sm:text-xs shimmer shimmer--slow dark:text-gray-400 truncate">
                      {tuc.authorSection}, {tuc.company}
                    </span>
                  </div>
                </section>
              </motion.div>
            );
          })}
        </div>

        {/* CTA section - responsive sizing */}
        <motion.div
          transition={{ delay: 1 }}
          viewport={{ once: true }}
          initial="hidden"
          whileInView="animate"
          variants={{
            hidden: { opacity: 0, x: -100 },
            animate: { opacity: 1, x: 0 },
          }}
          className="mt-8 sm:mt-10 flex flex-col gap-y-3 items-center w-full rounded-3xl py-8 sm:py-10 px-4 sm:px-6 md:px-8 dark:bg-[#0C1015] border dark:border-neutral-800 max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-200"
        >
          <h1 className="shimmer shimmer--slow text-xl sm:text-2xl md:text-3xl lg:text-2xl font-bold text-center px-2">
            Ready to streamline your workflow?
          </h1>
          <h5 className="shimmer shimmer--slow text-sm sm:text-md font-semibold dark:text-gray-500 text-center px-2">
            Start free. No credit card required.
          </h5>
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            className="cursor-pointer mt-2 sm:mt-3 bg-primary text-sm sm:text-md font-semibold px-4 sm:px-5 py-2 sm:py-2.5 text-white rounded-2xl"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
