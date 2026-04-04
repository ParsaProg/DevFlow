import Image from "next/image";
import DevFlow from "@/app/assets/pictures/devflow.png";

export default function Footer() {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full justify-between sm:gap-0 gap-3 min-[1300px]:w-325 mx-auto border-t pb-6 sm:pb-8 pt-5 dark:border-t-gray-800 px-4 sm:px-0">
      <div className="select-none flex items-center gap-x-2 font-bold">
        <div className="overflow-hidden text-white rounded-xl w-6 h-6 items-center flex justify-center">
          <Image
            width={100}
            height={100}
            alt="logo"
            src={DevFlow.src}
            className="w-100"
          />
        </div>
        <h1 className="text-sm sm:text-md font-semibold">DevFlow</h1>
      </div>

      <span className="text-xs dark:text-gray-500 text-center">
        © 2026 all rights reserved
      </span>
      <span className="text-xs dark:text-gray-500 text-center">
        Built for developers, by developers.
      </span>
    </div>
  );
}
