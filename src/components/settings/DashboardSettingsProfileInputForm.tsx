import { useState } from "react";

export default function DashboardSettingsProfileInputs({
  value,
  onChange,
}: {
  value: string;
  onChange?: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <input
      value={inputValue}
      onChange={handleChange}
      className="w-full dark:bg-[#05070B] border dark:border-neutral-800 rounded-2xl py-3 text-sm px-4 outline-none transition-all duration-200 ring-2 ring-transparent focus-within:ring-primary"
    />
  );
}
