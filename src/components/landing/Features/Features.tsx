import { featuresLandingItems } from "@/src/data/features-landing-items";

export default function LandingFeatures() {
  return (
    <div className="dark:bg-[#0A0D12] w-full py-30">
      <div className="min-[1340px]:w-325 w-[90%] mx-auto flex flex-col items-center justify-center gap-y-4">
        <span className="text-primary ">Features</span>
        <h1 className="font-bold text-3xl ">Everything your team needs</h1>
        <h5 className=" text-center dark:text-slate-400 font-medium text-neutral-400 text-md">
          A complete developer workspace designed for speed, clarity, and <br />{" "}
          collaboration.
        </h5>
        <div className="grid xl:grid-cols-3 w-full gap-5 mt-8">
          {featuresLandingItems.map((item, _i) => {
            return (
              <div
                key={_i}
                className={`flex flex-col gap-y-1 items-start w-full rounded-3xl px-5 pt-5 pb-8 dark:bg-[#0C1015] border dark:border-neutral-800`}
              >
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  {item.icon}
                </div>
                <h1 className="mt-2 font-[600] ">{item.title}</h1>
                <p className="text-sm dark:text-gray-400 w-full ">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
