import { motion } from "framer-motion";

interface SecuritySettingsContainerType {
  title: string;
  subTitle: string;
  buttonText: string;
  buttonFunction?: () => void;
}

export default function SecuritySettingsContainer({
  title,
  subTitle,
  buttonFunction,
  buttonText,
}: SecuritySettingsContainerType) {
  return (
    <div className="text-sm w-full p-4 bg-transparent border dark:border-gray-800 rounded-xl flex items-center justify-between">
      <div className="flex flex-col items-start gap-y-1">
        <h1>{title}</h1>
        <h5 className="text-gray-500">{subTitle}</h5>
      </div>
      <motion.button
        transition={{ duration: 0.1 }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ backgroundColor: "#1E2939" }}
        onClick={buttonFunction}
        className="font-semibold bg-transparent border dark:border-gray-800 rounded-lg flex items-center justify-center p-3 w-20"
      >
        {buttonText}
      </motion.button>
    </div>
  );
}
