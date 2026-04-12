import { AuthSubmitButtonInterface } from "@/src/interfaces/auth-submit-button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SubmitButton = ({
  submited,
  buttonContentText,
}: AuthSubmitButtonInterface) => {
  return (
    <motion.div
      className="w-full"
      transition={{ delay: 1.6, ease: "anticipate", duration: 1.5 }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <motion.div
        whileTap={{ scale: submited ? 1 : 0.98 }}
        className="flex justify-center w-full rounded-full mt-2"
      >
        <motion.button
          disabled={submited}
          style={{
            width: !submited ? "100%" : "60px",
          }}
          type="submit"
          className={`hover:bg-blue-600 disabled:hover:bg-primary w-full transition-all duration-200 group bg-primary h-15 rounded-full text-white font-thin text-lg flex items-center gap-x-2 text-center justify-center`}
        >
          {!submited ? (
            <>
              {buttonContentText}{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-all duration-300"
              />
            </>
          ) : (
            <div className="scale-[0.7]">
              <div className="loader" />
            </div>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SubmitButton;
