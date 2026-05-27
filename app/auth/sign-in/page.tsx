"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import NProgress from "nprogress";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LockKeyholeIcon, Mail } from "lucide-react";
import AuthPagesDarkSides from "@/src/components/auth/AuthPagesDarkSide";
import AuthPageInputFields from "@/src/components/auth/InputFields";
import SubmitButton from "@/src/components/auth/SubmitButton";
import { useEffect, useState } from "react";
import { ShowSuccessAlert } from "@/src/functions/ShowSuccessAlert";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/providers/AuthProvider"; 
import { BACKEND_BASE_URL } from "@/src/constants/backendBaseUrl";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters")
    .max(20, "The password must be at most 20 characters"),
});

type FormData = z.infer<typeof schema>;

export default function SignInPage() {
  const { accessToken, user, loading, setAuth } = useAuth();
  const navigator = useRouter();
  const [submited, setSubmited] = useState<boolean>(false);
  const [checkingInitialAuth, setCheckingInitialAuth] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // ⚡ THE REDIRECT FIX: 
  // Wait until context firmly registers BOTH accessToken AND user data, then push safely!
  useEffect(() => {
    if (!loading && accessToken && user) {
      navigator.push("/dashboard");
    } else if (!loading && !accessToken) {
      setCheckingInitialAuth(false);
    }
  }, [accessToken, user, loading, navigator]);

  const notify = () =>
    ShowSuccessAlert({
      content: "Successfully logged-in - Redirecting...",
      minWidth: "370px",
    });

  const formSubmit = async (data: FormData) => {
    try {
      setSubmited(true);
      const response = await fetch(`${BACKEND_BASE_URL}/api/v1/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmited(false);
        toast.error(result.message || "Invalid credentials");
        return;
      }

      // Show alert first
      notify();

      // Set auth context globally. The layout will detect this instantly 
      // and trigger our safe redirect hook above.
      setAuth(result.accessToken, result.user);

    } catch (error: unknown) {
      console.error("Sign-in error", error);
      toast.error("Something went wrong. Please try again.");
      setSubmited(false);
    }
  };

  if (loading || checkingInitialAuth) {
    return (
      <div className="h-screen w-screen bg-[#05070B] flex items-center justify-center text-white">
        Verifying Session...
      </div>
    );
  }

  return (
    !accessToken && (
      <div className="w-full h-screen bg-white top-0 absolute flex items-center">
        <AuthPagesDarkSides type="sign-in" />
        <form
          autoComplete="off"
          onSubmit={handleSubmit(formSubmit)}
          className="w-[50%] h-screen justify-center flex flex-col bg-[#fdfdfd] relative overflow-hidden text-white items-start"
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
                Sign In
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
                Don't have an account?{" "}
                <Link
                  className="text-black font-semibold"
                  onClick={() => NProgress.start()}
                  href={"/auth/sign-up"}
                >
                  Create one
                </Link>
              </motion.div>
            </div>
            
            <section className="my-3 select-none w-full flex items-center gap-x-5">
              <motion.div
                className="w-full"
                transition={{ delay: 1.2 }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: -50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer flex items-center text-black/80 rounded-full text-center justify-center w-full px-1 py-4 border border-neutral-300 gap-x-2 text-[17px] font-semibold"
                >
                  <FcGoogle size={25} />
                  Google
                </motion.div>
              </motion.div>
              <motion.div
                className="w-full"
                transition={{ delay: 1.3 }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: -50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="select-none cursor-pointer flex items-center text-black/80 rounded-full text-center justify-center w-full px-1 py-4 border border-neutral-300 gap-x-2 text-[17px] font-semibold"
                >
                  <FaGithub size={25} />
                  GitHub
                </motion.div>
              </motion.div>
            </section>

            <motion.section
              transition={{ delay: 1.5 }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="text-xs font-thin shrink-0 text-neutral-600 flex items-center gap-x-2"
            >
              <span className="h-[0.3px] w-full bg-neutral-200" />
              <span className="whitespace-nowrap">OR CONTINUE WITH EMAIL/USERNAME</span>
              <span className="h-[0.3px] w-full bg-neutral-200" />
            </motion.section>

            <AuthPageInputFields
              errors={errors}
              register={register}
              formAuthInput="email"
              type="text"
              placeHolder="Enter Email..."
              fieldTitle="Email"
              mainIcon={
                <Mail
                  size={20}
                  className="text-neutral-600 absolute left-3 top-[50%] translate-y-[-50%]"
                />
              }
            />
            <AuthPageInputFields
              errors={errors}
              register={register}
              formAuthInput="password"
              type="password"
              placeHolder="Enter password..."
              fieldTitle="Password"
              mainIcon={
                <LockKeyholeIcon
                  size={20}
                  className="text-neutral-600 absolute left-3 top-[50%] translate-y-[-50%]"
                />
              }
            />

            <motion.div
              transition={{ delay: 2.2, ease: "anticipate" }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              className="cursor-pointer hover:text-black transition-colors duration-200 self-end text-sm font-thin text-neutral-600"
            >
              Forget password?
            </motion.div>

            <SubmitButton submited={submited} buttonContentText="Sign in" />
          </div>
        </form>
      </div>
    )
  );
}