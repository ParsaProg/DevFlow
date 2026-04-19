import { InputFieldInterface } from "@/src/interfaces/input-fields";
import { AnimatePresence, motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";

export default function AuthPageInputFields({
  fieldTitle,
  placeHolder,
  type,
  mainIcon,
  formAuthInput,
  register,
  errors,
  setContent,
}: InputFieldInterface) {
  const [mainType, setMainType] = useState<string>(type);
  
  // Get the register props separately
  const { onChange, onBlur, name, ref } = register(formAuthInput);
  
  return (
    <div className={`${errors[formAuthInput] && "mb-3"}`}>
      <motion.h1
        transition={{ delay: 1, ease: "anticipate", duration: 2 }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
        className="text-lg mb-2"
      >
        {fieldTitle}
      </motion.h1>
      <motion.div
        transition={{ delay: 1, ease: "anticipate", duration: 2 }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
        className="relative"
      >
        <input
          name={name}
          ref={ref}
          onBlur={onBlur}
          onChange={(e) => {
            onChange(e); // Call React Hook Form's onChange
            if (setContent) {
              setContent(e.target.value);
            }
          }}
          className={`text-[15px] placeholder:font-medium placeholder:text-neutral-600 px-10 py-4 outline-none rounded-xl transition-all font-thin duration-200 ring-offset-0 ring-white ${errors[formAuthInput] ? "border-red-400 border-2 focus-within:ring-red-400/50 focus-within:ring-offset-0 ring-2" : "border-neutral-300 border focus-within:ring-primary focus-within:ring-offset-2 ring-2"} w-full`}
          type={mainType}
          autoComplete="off"
          placeholder={placeHolder}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {errors[formAuthInput] && (
          <p className="absolute -bottom-6 text-center font-thin text-sm text-red-500">
            {errors[formAuthInput]?.message}
          </p>
        )}
        {mainIcon}
        {type === "password" && (
          <div
            onClick={() => {
              mainType === "password"
                ? setMainType("text")
                : setMainType("password");
            }}
          >
            <Eye
              size={23}
              className="cursor-pointer text-neutral-600 absolute right-3 top-[50%] translate-y-[-50%]"
            />
          </div>
        )}
        <AnimatePresence>
          {type === "password" && mainType !== "password" && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, height: "5px" },
                visible: { opacity: 1, height: "26px" },
              }}
              className="absolute top-[50%] translate-y-[-50%] bg-neutral-600 outline-3 outline-white w-0.5 h-6.5 right-5.5 -rotate-45 rounded-full pointer-events-none"
            ></motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}