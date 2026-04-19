import { DashboardContainerInterface } from "@/src/interfaces/dashboard-containers";
import { ArrowUpIcon, Calendar, Folder } from "lucide-react";

export default function DashboardContainer({
  icon,
  titleNumber,
  subTitle,
  timeLine,
  arrowColor,
}: DashboardContainerInterface) {
  return (
    <div className="select-none transition-all duration-200 hover:shadow-primary/80 hover:shadow-[0px_0px_6px_-1px] w-full rounded-2xl p-5 bg-[#0C1015] border dark:border-neutral-800 flex flex-col items-start gap-y-3 hover:-translate-y-0.75">
      <div className="flex items-center justify-between w-full">
        <div className="rounded-xl bg-primary/15 text-primary w-10 h-10 flex items-center justify-center">
          {icon}
        </div>
        <ArrowUpIcon
          style={{ color: arrowColor }}
          size={18}
          className={`${arrowColor === "#FB2C36"? "rotate-135": "rotate-45"}`}
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{titleNumber}</h1>
        <h3 className="mt-1 text-sm font-medium text-gray-400">{subTitle}</h3>
        <h3 className="text-xs mt-2 font-medium text-gray-500 flex items-center gap-x-1">
          {timeLine}
        </h3>
      </div>
    </div>
  );
}
