import { useState, useEffect } from "react";
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
  // 1. Maintain local state for fallback when parent doesn't control it
  const [localValue, setLocalValue] = useState(value);

  // 2. Keep local value synchronized if the parent pass-down value changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // If parent provided onChange, prioritize sending the value up
    if (onChange) {
      onChange(newValue);
    } else {
      // If no onChange is provided, update locally so the input is typing-enabled 🟢
      setLocalValue(newValue);
    }
  };

  // Determine if we read from the parent prop value or local fallback value
  const finalValue = onChange ? value : localValue;

  return height ? (
    <textarea
      style={{
        height: height,
        resize: "none",
      }}
      placeholder={placeholder}
      value={finalValue}
      onChange={handleChange}
      className="placeholder:text-sm dashboard-input w-full dark:bg-[#05070B] border dark:border-neutral-800 rounded-2xl py-3 text-sm px-4 outline-none transition-all duration-200 ring-1 ring-transparent focus-within:ring-primary/80 shadow-transparent shadow-none focus-within:shadow-[0px_0px_7px_1px] focus-within:shadow-primary/50"
    />
  ) : (
    <input
      placeholder={placeholder}
      value={finalValue}
      onChange={handleChange}
      className="placeholder:text-sm dashboard-input w-full dark:bg-[#05070B] border dark:border-neutral-800 rounded-2xl py-3 text-sm px-4 outline-none transition-all duration-200 ring-1 ring-transparent focus-within:ring-primary/80 shadow-transparent shadow-none focus-within:shadow-[0px_0px_7px_1px] focus-within:shadow-primary/50"
    />
  );
}