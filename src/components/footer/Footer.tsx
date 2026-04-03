import Image from "next/image";
import DevFlow from "@/app/assets/pictures/devflow.png";

export default function Footer() {
  return (
    <div className="flex flex-col sm:flex-row items-center w-full justify-between gap-4 sm:gap-0 min-[1300px]:max-w-325 mx-auto border-t pb-6 sm:pb-8 pt-5 dark:border-t-gray-800 px-4 sm:px-6 lg:px-8">
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
      
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 order-last sm:order-none">
        <span className="text-xs dark:text-gray-500 text-center">© 2026 all rights reserved</span>
        <span className="text-xs dark:text-gray-500 text-center">Built for developers, by developers.</span>
      </div>
      
      <div className="hidden sm:block w-16"></div>
    </div>
  );
}