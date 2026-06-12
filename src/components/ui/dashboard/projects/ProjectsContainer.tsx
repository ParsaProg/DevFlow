import { ProjectsType } from "@/src/models/projects";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProjectsContainer({
  id,
  name,
  description,
  progress,
  _count,
  members,
}: ProjectsType) {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/${id}`}
      className="select-none flex flex-col items-start gap-y-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-primary/20 hover:shadow-[0px_0px_15px_1px] w-full rounded-2xl dark:bg-[#0C1015] border dark:border-gray-800 p-4"
    >
      <div className="flex items-center w-full justify-between">
        <h1 className="text-sm font-semibold">{name}</h1>
      </div>
      <p className="text-gray-500 text-xs">{description}</p>{" "}
      <span className="mb-1 flex items-center justify-between w-full mt-5">
        <p className="text-xs text-gray-500 font-thin">Progress</p>
        <p className="text-xs text-gray-200 font-semibold">{progress}%</p>
      </span>
      <div className="overflow-hidden relative rounded-full w-full h-1.25 bg-slate-800">
        <div
          style={{ width: `${progress}%` }}
          className="left-0 absolute h-1.25 bg-primary rounded-full"
        />
      </div>
      <div className="mt-3 w-full flex items-center justify-between text-gray-500 font-thin">
        <div className="flex items-center relative my-4">
          {members.map((c, index) => {
            return (
              <div
                style={{ left: index > 0 ? index * 21 : 0 }}
                key={index}
                className={`absolute border-2 border-[#0C1015] flex items-center justify-center w-7 h-7 bg-primary/10 rounded-full text-[10px] text-primary`}
              >
                {c.user.firstName[0]}
                {c.user.lastName[0]}
              </div>
            );
          })}
        </div>
        <span className="text-xs font-thin text-gray-500">
          {_count.issues} open issues
        </span>
      </div>
    </Link>
  );
}
