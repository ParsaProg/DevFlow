"use client";

import { useTheme } from "next-themes";

export default function ThemeChangeAppearanceContainer({
  text,
}: {
  text: string;
}) {
  const { theme, setTheme } = useTheme();
  return (
    <div
      onClick={() => setTheme(text)}
      className={`gap-y-3 border w-full ring-2 select-none p-5 text-sm font-thin flex flex-col items-center rounded-xl ${theme === text.toLowerCase().toString() ? " ring-blue-500 border-transparent" : "dark:border-neutral-800 ring-transparent hover:ring-primary/50 transition-all duration-200"}  `}
    >
      <div
        className={`${text === "dark" ? "bg-[#0F1115]" : "bg-[#F5F5F7]"} w-full h-20 rounded-lg border dark:border-neutral-800`}
      ></div>
      <span>
        {text[0].toUpperCase()}
        {text.slice(1)}
      </span>
    </div>
  );
}
