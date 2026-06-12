"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { BACKEND_BASE_URL } from "@/src/constants/backendBaseUrl";
import { Loader2, X, UserPlus, ChevronDown } from "lucide-react";
import DashboardSettingsProfileInputs from "../../settings/DashboardSettingsProfileInputForm";

interface ModalProps {
  toggleModal: () => void;
  projectId: string;
  onMemberAdded: (newMember: any) => void;
}

export const MainModal = ({
  toggleModal,
  projectId,
  onMemberAdded,
}: ModalProps) => {
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("MEMBER");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log(email);

    try {
      setIsSubmitting(true);
      setStatusMessage(null);
      const token = localStorage.getItem("accessToken") || "";

      const response = await fetch(
        `${BACKEND_BASE_URL}/api/v1/projects/${projectId}/invite`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: email.trim(),
            role: role,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to assign project member");
      }

      // Success branch execution
      setStatusMessage({
        type: "success",
        text: "The request send to the target contributor",
      });
      setEmail(""); // Clean input field

      // Update parent project tracking state instantly
      onMemberAdded(data.newMember);

      // Graceful delay before closing modal view automatically
      setTimeout(() => {
        toggleModal();
      }, 1500);
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text:
          err.message ||
          "Something went wrong during invitation layout pipeline.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* 1. Centered Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-[50%] left-[50%] z-50 bg-[#0C1015] border border-neutral-800/80 rounded-2xl p-6 flex flex-col gap-y-4 w-[90%] max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-white">
            <h1 className="font-semibold text-lg tracking-wide">
              Invite Developer
            </h1>
          </div>
          <button
            type="button"
            onClick={toggleModal}
            className="text-neutral-500 hover:text-white transition-colors duration-150 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1.5">
            <label className="text-[11px] font-medium tracking-wider text-neutral-400 uppercase">
              Email Address
            </label>

            <DashboardSettingsProfileInputs
              onChange={(newValue) => setEmail(newValue)}
              value={email}
              placeholder="e.g., contributor@workspace.io"
            />
          </div>

          <div className="flex flex-col gap-y-1.5 w-full">
            <label className="text-[11px] font-medium tracking-wider text-neutral-400 uppercase">
              Workspace Role
            </label>

            {/* Relative wrapper handles positioning the chevron securely */}
            <div className="relative w-full">
              <select
                disabled={isSubmitting}
                value={role}
                onChange={(e) => setRole(e.target.value)}
                // 💡 Added 'appearance-none' to strip default browser arrows
                // 💡 Added 'pr-10' to make sure long text never overlaps your arrow
                className="appearance-none bg-[#05070B] text-white text-sm border border-neutral-800/80 rounded-xl pl-3.5 pr-10 py-2.5 w-full focus:outline-none focus:border-primary/50 transition-colors duration-200 cursor-pointer"
              >
                <option value="MEMBER" className="bg-[#0C1015]">
                  Member (Read & Write)
                </option>
                <option value="ADMIN" className="bg-[#0C1015]">
                  Admin (Full Ownership)
                </option>
              </select>

              {/* Custom absolute positioned chevron with clean padding from the right side */}
              <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-neutral-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {statusMessage && (
            <div
              className={`text-[13px] font-light px-3.5 py-2.5 rounded-xl border ${
                statusMessage.type === "success"
                  ? "bg-green-950/10 border-green-900/40 text-green-400"
                  : "bg-red-950/10 border-red-900/40 text-red-400"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <div className="flex items-center justify-end gap-x-2 mt-2">
            <button
              type="button"
              onClick={toggleModal}
              disabled={isSubmitting}
              className="px-4 py-2 text-[13px] font-medium text-neutral-400 hover:text-white transition-colors rounded-xl border border-gray-800 hover:bg-gray-800"
            >
              Cancel
            </button>
            <motion.div
              whileTap={!isSubmitting && email.trim() ? { scale: 0.95 } : {}}
            >
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="transition-all duration-200 bg-primary text-white text-[13px] font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-x-2 disabled:opacity-40 cursor-pointer shadow-primary/10 shadow-[0px_0px_15px_2px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Allocating...
                  </>
                ) : (
                  "Send Assignment"
                )}
              </button>
            </motion.div>
          </div>
        </form>
      </motion.div>

      {/* 2. Backdrop Blur Element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={toggleModal}
        className="fixed inset-0 z-40 w-full h-full bg-black/50 backdrop-blur-sm"
      />
    </>
  );
};

export default function InviteContributorModal({
  toggleModal,
  projectId,
  onMemberAdded,
}: ModalProps) {
  return createPortal(
    <MainModal
      toggleModal={toggleModal}
      projectId={projectId}
      onMemberAdded={onMemberAdded}
    />,
    document.body,
  );
}
