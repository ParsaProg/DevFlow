import { useState } from "react";
import "@/src/styles/inputs/dashboard.css";

export default function DashboardSettingsProfileInputs({
  value,
  onChange,
  placeholder,
  height,
}: {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: number;
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  return height ? (
    <textarea
      style={{
        height: height,
        resize: "none",
      }}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      className={`placeholder:text-sm dashboard-input w-full dark:bg-[#05070B] border dark:border-neutral-800 rounded-2xl py-3 text-sm px-4 outline-none transition-all duration-200 ring-1 ring-transparent focus-within:ring-primary/80 shadow-transparent shadow-none focus-within:shadow-[0px_0px_7px_1px] focus-within:shadow-primary/50`}
    />
  ) : (
    <input
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      className={`placeholder:text-sm dashboard-input w-full dark:bg-[#05070B] border dark:border-neutral-800 rounded-2xl py-3 text-sm px-4 outline-none transition-all duration-200 ring-1 ring-transparent focus-within:ring-primary/80 shadow-transparent shadow-none focus-within:shadow-[0px_0px_7px_1px] focus-within:shadow-primary/50`}
    />
  );
}
