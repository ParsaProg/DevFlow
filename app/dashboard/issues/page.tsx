"use client";

import { motion } from "framer-motion";
import { useSidebar } from "@/src/context/DashBoardTabCollapseContext";
import { CircleDot, Filter } from "lucide-react";
import { IssuesModelData } from "@/src/models/issues";

const DashboardPage = () => {
  const { isCollapsed } = useSidebar();
  return (
    <div className="z-10 absolute top-0 bg-[#05070B] w-full h-screen">
      <div
        className={`transition-all duration-300 mt-24 ${isCollapsed ? "ml-15" : "ml-60"} px-[12vw] flex flex-col mx-auto gap-y-5`}
      >
        <div className="flex items-center justify-between w-full">
          <section>
            <h1 className="text-white font-bold text-2xl">My Issues</h1>
            <h3 className="text-gray-500 font-thin text-[17px] mt-1">
              5 issues assigned to you
            </h3>
          </section>
          <motion.div whileTap={{ scale: 0.95 }} className="rounded-xl">
            <button className="select-none px-4 py-2 dark:bg-[#0D1016] border dark:border-neutral-800 rounded-xl text-sm flex items-center gap-x-2 justify-center">
              <Filter size={15} />
              Filter
            </button>
          </motion.div>
        </div>
        <div className="flex flex-col items-start w-full overflow-hidden dark:bg-[#0C1015] border dark:border-neutral-800 rounded-2xl">
          {/* HEADER */}
          <div
            className="grid w-full px-5 py-4"
            style={{
              gridTemplateColumns: "5.1fr 2.1fr 1.5fr 1fr 1fr 0.4fr",
            }}
          >
            {[
              "Issue",
              "Project",
              "Status",
              "Priority",
              "Assignee",
              "Updated",
            ].map((val, index) => (
              <span
                key={index}
                className="font-thin text-xs text-gray-500 uppercase"
              >
                {val}
              </span>
            ))}
          </div>

          {/* ROWS */}
          {IssuesModelData.map((i, _i) => {
            const issueLevel = i.priority.toLowerCase();
            const initials = i.assignee.userName
              .split(" ")
              .map((n) => n[0].toUpperCase())
              .join("");

            return (
              <div
                key={_i}
                className="grid w-full px-5 py-4 border-t dark:border-t-neutral-800 items-center hover:dark:bg-white/[0.02] transition-colors"
                style={{
                  gridTemplateColumns: "5fr 2.1fr 1.5fr 1fr 1fr 0.4fr",
                }}
              >
                {/* Issue */}
                <div className="flex items-center gap-x-2">
                  <CircleDot size={16} className="text-primary shrink-0" />
                  <h1 className="font-medium text-sm truncate">{i.title}</h1>
                </div>

                {/* Project */}
                <span className="text-xs text-gray-500">{i.project}</span>

                {/* Status */}
                <div className="flex items-center gap-x-2">
                  <div
                    className={`rounded-full shrink-0 w-2 h-2 ${
                      i.status === "In Progress"
                        ? "bg-blue-500"
                        : i.status === "Done"
                          ? "bg-cyan-500"
                          : "bg-slate-300"
                    }`}
                  />
                  <span className="text-xs">{i.status}</span>
                </div>

                {/* Priority */}
                <div>
                  <span
                    className={`text-[10px] px-2 py-1 rounded-lg ${
                      issueLevel === "high"
                        ? "bg-red-500/10 text-red-700"
                        : issueLevel === "medium"
                          ? "dark:bg-[#0E2F26] text-green-500"
                          : "dark:bg-[#171B22] dark:text-gray-400"
                    }`}
                  >
                    {i.priority}
                  </span>
                </div>

                {/* Assignee */}
                <div className="w-7 h-7 text-xs flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  {initials}
                </div>

                {/* Updated */}
                <span className="text-xs text-gray-500">{i.updatedAt}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
