"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BACKEND_BASE_URL } from "@/src/constants/backendBaseUrl";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, X, AlertTriangle } from "lucide-react";

interface HeaderMenuProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  user: any;
}

const menuVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", mass: 0.4, damping: 14, stiffness: 150 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: { duration: 0.12, ease: [0.32, 0, 0.67, 0] },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", mass: 0.5, damping: 18, stiffness: 180 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

export default function DashboardHeaderMenu({
  menuRef,
  user,
}: HeaderMenuProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSignOutExecute = async () => {
    setIsLoggingOut(true);
    try {
      await fetch(`${BACKEND_BASE_URL}/api/v1/auth/sign-out`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout error is: ", error);
    } finally {
      localStorage.removeItem("accessToken");
      window.location.href = "/auth/sign-in";
    }
  };

  const menuItems = [
    { label: "Profile", icon: <User size={15} /> },
    { label: "Preferences", icon: <Settings size={15} /> },
    { label: "Sign Out", icon: <LogOut size={15} /> },
  ];

  if (!mounted) return null;

  return (
    <>
      <motion.div
        ref={menuRef}
        variants={menuVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-64 h-auto rounded-xl absolute top-12 right-0 bg-[#0C1015]/95 dark:bg-[#0C1015]/95 bg-white/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col items-start gap-y-2.5 px-3.5 pt-4 pb-2.5 text-[13px] select-none z-50 origin-top-right text-neutral-800 dark:text-neutral-200"
      >
        <div className="px-1.5 pb-0.5">
          <h1 className="font-semibold tracking-wide text-neutral-800 dark:text-neutral-200">
            {user?.firstName} {user?.lastName}
          </h1>
          <span className="text-neutral-500 font-normal text-[12px] block mt-0.5 truncate max-w-[220px]">
            {user?.email}
          </span>
        </div>

        <span className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-800/80 block"></span>

        <div className="flex flex-col w-full gap-y-0.5">
          {menuItems.map((item, index) => {
            const isSignOut = item.label === "Sign Out";
            return (
              <div
                onClick={(e) => {
                  if (isSignOut) {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowConfirmModal(true);
                  }
                }}
                key={index}
                className="w-full"
              >
                <div
                  className={`flex items-center gap-x-2.5 font-medium rounded-lg transition-colors duration-150 w-full py-2 px-2.5 cursor-pointer text-left
                    ${
                      isSignOut
                        ? "text-red-500 dark:text-red-400 hover:bg-red-500/10"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                >
                  <span
                    className={
                      isSignOut
                        ? "text-red-500 dark:text-red-400"
                        : "text-neutral-400 dark:text-neutral-500"
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="text-[13px]">{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {showConfirmModal && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isLoggingOut) setShowConfirmModal(false);
                }}
                className="absolute inset-0 bg-black/40 dark:bg-black/40 backdrop-blur-sm"
              />

              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0C1015] p-6 shadow-2xl text-left select-none"
              >
                <button
                  disabled={isLoggingOut}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirmModal(false);
                  }}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors cursor-pointer p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30"
                >
                  <X size={16} />
                </button>

                <div className="flex items-start gap-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20">
                    <AlertTriangle size={20} />
                  </div>

                  <div className="flex flex-col gap-y-1.5 w-full">
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-wide">
                      Confirm Sign Out
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Are you sure you want to log out? You will need to
                      re-authenticate with your security credentials to access
                      your dashboard workspaces again.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-3 pt-2">
                  <button
                    type="button"
                    disabled={isLoggingOut}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirmModal(false);
                    }}
                    className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isLoggingOut}
                    onClick={handleSignOutExecute}
                    className="relative px-5 py-2 text-sm font-semibold rounded-xl bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-red-500/10 flex items-center justify-center min-w-[96px] disabled:bg-red-500/60"
                  >
                    {isLoggingOut ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Sign Out"
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
