import { ArrowRight } from "lucide-react";
import { BGPattern } from "../../pattern/HeroBackgroundPattern";
import HeroSectionContainer from "./HeroSection-Container";

const HeroSection = () => {
  const developersList = [
    { name: "A", color: "#277DFF" },
    { name: "B", color: "#00A9B3" },
    { name: "C", color: "#6363C6" },
    { name: "D", color: "#23BA7D" },
  ];

  return (
    <div className="relative h-[50vw] ">
      <div className="absolute top-[50%] translate-y-[-50%] left-0 w-50 h-100 rounded-full bg-primary blur-[150px] opacity-20 -translate-x-20"></div>
      <div className="absolute top-[50%] translate-y-[-50%] right-0 w-50 h-100 rounded-full bg-purple-500 blur-[100px] opacity-10 translate-x-20"></div>
      <div className="absolute w-full text-center">
        <div className="w-full h-[50vw] flex aspect-video flex-col items-center justify-center">
          <BGPattern variant="grid" mask="fade-edges" />
        </div>
      </div>
      <div className="flex items-center min-[1300px]:w-325 justify-between absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mx-auto ">
        <section className="w-[50%] flex flex-col items-start gap-y-8 ">
          <div className="rounded-full dark:bg-[#1e232d47] bg-[#F1F3F7] border dark:border-neutral-800 border-neutral-700 text-neutral-600 dark:text-neutral-400 flex items-center py-2 px-4 gap-x-2 text-xs font-semibold">
            <div className="rounded-full bg-[#00A9B3] w-2 h-2 ">
              <div className="rounded-full bg-[#00A9B3] w-2 h-2 animate-ping"></div>
            </div>
            Now in Public Beta
          </div>
          <h1 className="flex flex-col text-6xl gap-y-2 font-bold">
            Ship faster with
            <span className="text-primary">structured clarity</span>
          </h1>
          <p className="w-125 text-neutral-600 dark:text-neutral-400 text-xl">
            The developer workspace that combines issue tracking, task
            management, and team collaboration into one streamlined experience.
          </p>
          <div className="flex items-center gap-x-5 font-semibold mt-3">
            <button className="transition-transform duration-300 hover:translate-y-[-5px] cursor-pointer rounded-2xl px-7 py-3 bg-primary text-white shadow-primary/70 shadow-[0px_0px_25px_0px] flex items-center gap-x-2">
              Start Free
              <ArrowRight size={18} />
            </button>
            <button className="transition-[transform_colors] dark:hover:bg-[#181b22] duration-300 hover:translate-y-[-5px] cursor-pointer border dark:border-neutral-800 rounded-2xl px-7 py-3 dark:text-white text-black dark:bg-[#0d10164e]">
              Back Demo
            </button>
          </div>
          <span className="mt-2 w-full h-[0.25] dark:bg-neutral-800 bg-neutral-400"></span>
          <div className="mt-2 flex items-center gap-x-3">
            <div className="flex relative items-center">
              {developersList.map((val, _i) => {
                return (
                  <div
                    style={{
                      backgroundColor: val.color,
                      marginLeft: `${_i * 25}px`,
                    }}
                    key={_i}
                    className={`absolute rounded-full text-xs w-8 h-8 flex items-center justify-center font-semibold  text-white border-2 border-background`}
                  >
                    {val.name}
                  </div>
                );
              })}
            </div>
            <span className="ml-28 text-white font-medium">
              2,400+{" "}
              <span className="dark:text-neutral-500">
                developers trust DevFlow
              </span>
            </span>
          </div>
        </section>
        <HeroSectionContainer />
      </div>
    </div>
  );
};

export default HeroSection;
