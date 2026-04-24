"use client";

import { useSidebar } from "@/src/context/DashBoardTabCollapseContext";
import { DashboardAnalyticsStat } from "@/src/models/analytics-stat";
import { weeklyOverviewData } from "@/src/models/analytics-weakly-overview-data";
import { ArrowUp, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { topContributorsData } from "@/src/models/analytics-top-c";

const DashboardPage = () => {
  const { isCollapsed } = useSidebar();
  return (
    <div className="z-10 absolute top-0 bg-[#05070B] w-full h-screen">
      <div
        className={`transition-all duration-300 mt-24 ${isCollapsed ? "ml-15" : "ml-60"} px-[12vw] flex flex-col mx-auto gap-y-5`}
      >
        <section>
          <h1 className="text-white font-bold text-2xl">Analytics</h1>
          <h3 className="text-gray-500 font-thin text-[17px] mt-1">
            Track your team performance and project health.
          </h3>
        </section>
        <div className="mt-3 flex items-center w-full gap-5 select-none">
          {DashboardAnalyticsStat.map((val, index) => {
            return (
              <div
                key={index}
                className="rounded-2xl p-5 dark:bg-[#0C1015] border dark:border-gray-800 flex flex-col items-start gap-y-2 w-full transition-all duration-200 hover:-translate-y-0.75 hover:shadow-primary/10 hover:shadow-[0px_0px_10px_5px]"
              >
                <span className="text-gray-500 text-xs">{val.label}</span>
                <div className="flex items-center gap-x-2">
                  <div className="text-2xl font-bold">{val.value}</div>
                  <div className="text-gray-500 text-xs pt-2">{val.unit}</div>
                </div>
                <div className="flex items-center gap-x-1">
                  {val.isPositive ? (
                    <TrendingUp className="text-cyan-500" size={15} />
                  ) : (
                    <TrendingDown className="text-blue-500" size={15} />
                  )}
                  <span
                    className={`${val.isPositive ? "text-cyan-500" : "text-blue-500"} text-[11px]`}
                  >
                    {val.trend}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-full gap-x-5">
          <div className="rounded-2xl dark:bg-[#0C1015] border dark:border-gray-800 p-5 w-[60%]">
            <div className="flex items-center justify-between w-full">
              <h5 className="text-sm">Weekly Overview</h5>
              <div className="flex items-center gap-x-5">
                <div className="flex items-center gap-x-1 text-[12px]">
                  <div className="rounded-full w-2 h-2 bg-blue-500"></div>
                  Completed
                </div>
                <div className="flex items-center gap-x-1 text-[12px] text-gray-500">
                  <div className="rounded-full w-2 h-2 bg-gray-600"></div>
                  Opened
                </div>
              </div>
            </div>
            <div className="mt-10 text-xs flex items-end w-full justify-around">
              {weeklyOverviewData.map((wod, _i) => {
                return (
                  <div key={_i} className="flex flex-col items-center gap-y-3">
                    <div className="flex gap-x-1 items-end">
                      <motion.div
                        transition={{ duration: 2 }}
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0, height: 0 },
                          visible: {
                            opacity: 1,
                            height: `${wod.completed * 2}px`,
                          },
                        }}
                        className="rounded-t-full w-5 bg-blue-500"
                      ></motion.div>
                      <motion.div
                        transition={{ duration: 2 }}
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0, height: 0 },
                          visible: {
                            opacity: 1,
                            height: `${wod.opened * 2}px`,
                          },
                        }}
                        className="rounded-t-full w-5 bg-gray-800"
                      ></motion.div>
                    </div>
                    <span className="text-gray-400">{wod.week}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-2xl dark:bg-[#0C1015] border dark:border-gray-800 p-5 w-[40%]">
            <h5 className="text-sm font-medium">Top Contributors</h5>
            <div className="mt-3 flex flex-col gap-y-1">
              {topContributorsData.map((val, index) => {
                return (
                  <div
                    key={index}
                    className="px-3 py-3 select-none rounded-xl transition-all duration-200 hover:bg-gray-900 flex items-center w-full justify-between"
                  >
                    <div className="flex items-center gap-x-4">
                      <span className="text-gray-500 text-[11px] font-thin">
                        {index + 1}
                      </span>
                      <div className="flex items-center gap-x-2">
                        <div className="rounded-full bg-primary/10 text-primary text-[11px] w-7 h-7 flex items-center justify-center">
                          {val.name[0].toUpperCase()}
                          {val.name[val.name.indexOf(",") + 2].toUpperCase()}
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <h1 className="text-xs">{val.name}</h1>
                          <span className="text-xs text-gray-500">
                            {val.tasksCompleted} tasks completed
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-cyan-500 flex items-center">
                      <ArrowUp size={12} className="rotate-45"/>
                      +{val.trend}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
