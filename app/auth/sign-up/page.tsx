"use client";

import { motion } from "framer-motion";
import NProgress from "nprogress";
import AuthPagesDarkSides from "@/src/components/auth/AuthPagesDarkSide";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import AuthPageInputFields from "@/src/components/auth/InputFields";
import { ArrowRight, Key, LockKeyhole, Mail, User2 } from "lucide-react";
import { useState } from "react";
import { SiPinboard } from "react-icons/si";
import SubmitButton from "@/src/components/auth/SubmitButton";

// Define schema of the register form
const schema = z.object({
  userName: z
    .string()
    .min(2, "The username must be at least 2 characters")
    .max(20, "The username must be at last 20 characters"),
  email: z.string().email("Invalid email adress"),
  password: z
    .string()
    .min(6, "The password must be at leat 6 charcater")
    .max(20, "The password must be at last 20 charcater"),
  confirmPassword: z
    .string()
    .min(6, "The confirm password must be at leat 6 charcater")
    .max(20, "The password must be at last 20 charcater"),
});

type RegisterFormData = z.infer<typeof schema>;
export default function SignUpPage() {
  const [submited, setSubmited] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const formSubmit = async (data: RegisterFormData) => {
    if (confirmPassword === password) {
      setSubmited(true);
      setTimeout(() => {
        console.log("Submited!");
        setSubmited(false);
      }, 3000);
    } else
      setError("confirmPassword", {
        type: "manual",
        message: "The confirm password is innocorrect",
      });
  };
  return (
    <div className="w-full h-screen bg-white top-0 absolute flex items-center">
      <AuthPagesDarkSides type="sign-up" />
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-[50%] h-screen justify-center flex flex-col  bg-[#fdfdfd] relative overflow-hidden text-whiteitems-start"
      >
        <div className="justify-center flex flex-col gap-y-5 w-full px-20 mx-auto text-black text-xl font-semibold">
          <div>
            <motion.h1
              transition={{ delay: 0.9 }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}
              className="text-3xl mb-1"
            >
              Register Account
            </motion.h1>
            <motion.div
              transition={{ delay: 1 }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}
              className=" text-neutral-700 text-[15px] font-medium"
            >
              Have an account?{" "}
              <Link
                className="text-black font-semibold"
                onClick={() => NProgress.start()}
                href={"/auth/sign-in"}
              >
                Sign In
              </Link>
            </motion.div>
          </div>
          <motion.span
            transition={{ delay: 1 }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="h-[0.3px] w-full bg-neutral-200"
          />
          <AuthPageInputFields
            setContent={setUserName}
            formAuthInput="userName"
            register={register}
            errors={errors}
            type="text"
            placeHolder="Enter Username..."
            fieldTitle="Username"
            mainIcon={
              <User2
                size={20}
                className="text-neutral-600 absolute left-3 top-[50%] translate-y-[-50%]"
              />
            }
          />
          <AuthPageInputFields
            setContent={setEmail}
            formAuthInput="email"
            register={register}
            errors={errors}
            type="email"
            placeHolder="Enter a valid email..."
            fieldTitle="Email"
            mainIcon={
              <Mail
                size={20}
                className="text-neutral-600 absolute left-3 top-[50%] translate-y-[-50%]"
              />
            }
          />
          <AuthPageInputFields
            setContent={setPassword}
            formAuthInput="password"
            register={register}
            errors={errors}
            type="password"
            placeHolder="Enter password..."
            fieldTitle="Password"
            mainIcon={
              <LockKeyhole
                size={20}
                className="text-neutral-600 absolute left-3 top-[50%] translate-y-[-50%]"
              />
            }
          />
          <AuthPageInputFields
            setContent={setConfirmPassword}
            formAuthInput="confirmPassword"
            register={register}
            errors={errors}
            type="password"
            placeHolder="Enter password again..."
            fieldTitle="Confirm Passwrd"
            mainIcon={
              <Key
                size={20}
                className="text-neutral-600 absolute left-3 top-[50%] translate-y-[-50%]"
              />
            }
          />
          <SubmitButton submited={submited} buttonContentText="Register" />
          <motion.p
            transition={{ delay: 2, ease: "anticipate", duration: 1.5 }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -150 },
              visible: { opacity: 1, x: 0 },
            }}
            className="absolute bottom-4 text-xs font-thin text-neutral-800"
          >
            By registring, you agree the our{" "}
            <a href={"/tpp"} className="underline underline-offset-2">
              Terms
            </a>
            <span className="mx-1">and</span>
            <a href={"/tpp"} className="underline underline-offset-2">
              Privacy Policy
            </a>
          </motion.p>
        </div>
      </form>
    </div>
  );
}
