"use client";

import DashboardContainer from "@/src/components/ui/Dashboard-Containers";
import Greeting from "@/src/components/ui/Greeting";
import { useSidebar } from "@/src/context/DashBoardTabCollapseContext";
import { DashboardAssignToMeData } from "@/src/data/dashboard-me-assign-section";
import { DashboardRecentActivityData } from "@/src/data/dashboard-recent-activity";
import { useUser } from "@/src/hooks/useUser";
import {
  ArrowUp,
  CircleCheck,
  CircleDot,
  Clock,
  FolderCodeIcon,
  GitBranch,
  MessageCircleDashed,
  User,
} from "lucide-react";

const DashboardPage = () => {
  const { user, isResolving } = useUser();
  const { isCollapsed } = useSidebar();

  if (isResolving) {
    return <div className="animate-pulse bg-neutral-800 w-32 h-6 rounded" />;
  }

  return (
    <div className="z-10 absolute top-0 bg-[#05070B] w-full h-screen">
      <div
        className={`transition-all duration-300 mt-24 ${isCollapsed ? "ml-15" : "ml-60"} px-[12vw] flex flex-col mx-auto gap-y-5`}
      >
        <section>
          <Greeting name={user ? user["firstName"] : "User"} />
          <h3 className="text-gray-500 font-thin text-[17px] mt-1">
            Here is what is happening across your projects today.
          </h3>
        </section>
        <section className="flex items-center gap-x-5">
          <DashboardContainer
            arrowColor="#00B8DB"
            icon={<FolderCodeIcon size={18} />}
            titleNumber={8}
            timeLine={"+2 this week"}
            subTitle={"Active Projects"}
          />
          <DashboardContainer
            arrowColor="#FB2C36"
            icon={<CircleDot size={18} />}
            titleNumber={24}
            timeLine={"-5 from yesterday"}
            subTitle={"Open Issues"}
          />
          <DashboardContainer
            arrowColor="#00B8DB"
            icon={<FolderCodeIcon size={18} />}
            titleNumber={156}
            timeLine={"+12 today"}
            subTitle={"Completed Tasks"}
          />
        </section>
        <section className="flex gap-x-5 w-full">
          <div className="w-[60%] rounded-2xl p-5 bg-[#0C1015] border dark:border-neutral-800 flex flex-col items-start gap-y-3">
            <h1 className="text-[15.5px] font-semibold">Recent Activity</h1>
            <div className="mt-3 flex flex-col items-start w-full gap-y-1">
              {DashboardRecentActivityData.map((ra, _i) => {
                return (
                  <div
                    key={_i}
                    className="select-none w-full px-2 font-medium text-[13px] flex items-center justify-between py-2 rounded-xl transition-all duration-200 hover:bg-gray-900"
                  >
                    <div className="flex items-center gap-x-2">
                      {ra.task === "closed issue" ? (
                        <CircleCheck size={15} className="text-cyan-500" />
                      ) : ra.task === "commented on" ? (
                        <MessageCircleDashed
                          size={15}
                          className="text-blue-600"
                        />
                      ) : ra.task === "created branch" ? (
                        <GitBranch size={15} className="text-purple-500" />
                      ) : ra.task === "assigned you to" ? (
                        <User size={15} className="text-green-500" />
                      ) : (
                        <ArrowUp
                          size={15}
                          className="text-cyan-500 rotate-45"
                        />
                      )}
                      <span className="flex items-center gap-x-1">
                        {ra.author}.
                        <p className="text-gray-500 font-thin text-xs">
                          {ra.task}
                        </p>
                        {ra.title}
                      </span>
                    </div>
                    <span className="text-gray-500 font-thin text-xs flex items-center gap-x-1">
                      {ra.time} ago
                      <Clock size={15} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-[40%] rounded-2xl p-5 bg-[#0C1015] border dark:border-neutral-800 flex flex-col items-start gap-y-3">
            {" "}
            <h1 className="text-[15.5px] font-semibold">Assigned to Me</h1>
            <div className="flex flex-col items-start mt-2 gap-y-3 w-full">
              {DashboardAssignToMeData.map((atm, _i) => {
                const atmLevel = atm.level.toLowerCase();
                return (
                  <div
                    key={_i}
                    className="select-none cursor-pointer transition-[colors_transform] druation-300 dark:hover:border-primary/30 w-full rounded-xl p-3 dark:bg-[#090C10] border dark:border-neutral-800 hover:-translate-y-0.5"
                  >
                    <section className="flex items-center w-full justify-between">
                      <h1 className="font-semibold text-[13.5px]">
                        {atm.title}
                      </h1>
                      <div
                        className={`text-[10px] px-2 py-1 rounded-lg ${atmLevel === "high" ? "bg-red-500/10 text-red-700" : atmLevel === "medium" ? "dark:bg-[#0E2F26] text-green-500" : "dark:bg-[#171B22] dark:text-gray-400"}`}
                      >
                        {atm.level}
                      </div>
                    </section>
                    <div className="mt-1 flex items-center gap-x-2 text-xs text-gray-500">
                      <span>{atm.cat}</span>
                      <span className="text-[10px] text-gray-600">|</span>
                      <span>{atm.state}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
