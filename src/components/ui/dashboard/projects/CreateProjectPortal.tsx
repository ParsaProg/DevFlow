"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import DashboardSettingsProfileInputs from "../../../settings/DashboardSettingsProfileInputForm";
import { useState } from "react";
import { BACKEND_BASE_URL } from "@/src/constants/backendBaseUrl";
import toast from "react-hot-toast";
import { ShowSuccessAlert } from "@/src/functions/ShowSuccessAlert";
import { usePathname, useRouter } from "next/navigation";

interface PortalInterface {
  setFunction?: (value: boolean) => void;
  toggleProjectCreationPortal: () => void;
  onProjectCreated: () => void;
}

const Portal = ({
  toggleProjectCreationPortal,
  onProjectCreated,
}: Omit<PortalInterface, "setFunction">) => {
  const pathname = usePathname();
  const router = useRouter();
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAddProject = async () => {
    if (!projectName || isSubmitting) return;

    setIsSubmitting(true);
    try {
      let accessToken = localStorage.getItem("accessToken");

      const sendCreateRequest = async (token: string | null) => {
        return await fetch(`${BACKEND_BASE_URL}/api/v1/projects/new`, {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: projectName,
            description: projectDescription,
          }),
        });
      };

      // 1. Attempt the initial creation request
      let addProject = await sendCreateRequest(accessToken);

      // 2. Handle token refresh ONLY if the response status is explicitly 401 Unauthorized
      if (addProject.status === 401) {
        console.log("Access token expired. Attempting silent token refresh...");

        // FIX 1: Point this to your dedicated refresh route that checks cookies, NOT your validation route
        const refreshResponse = await fetch(
          `${BACKEND_BASE_URL}/api/v1/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          accessToken = refreshData.accessToken;
          localStorage.setItem("accessToken", accessToken || "");

          // Retry the target request with the new credentials
          addProject = await sendCreateRequest(accessToken);
        }
      }

      // 3. Extract the response body safely
      const res = await addProject.json();

      // 4. Evaluate operation results cleanly without blind redirection
      if (addProject.ok) {
        ShowSuccessAlert({ content: res.message || "Project created!" });
        onProjectCreated();

        toggleProjectCreationPortal();
        router.push(`${pathname}/${res.project?.id}`);
      } else if (addProject.status === 401) {
        // Only kick them out if both the access token and refresh token cookie are completely dead
        toast.error(
          "Your session has completely expired. Please log in again.",
        );
        window.location.href = "/auth/sign-in";
      } else {
        // FIX 2: Catch normal client errors (400) or server drops (500) without redirecting
        toast.error(
          res.message || "Failed to finalize project layout processing.",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error occurred while contacting service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => !isSubmitting && toggleProjectCreationPortal()}
        className="fixed inset-0 h-screen w-screen bg-black/40 backdrop-blur-sm z-[9998]"
      />

      {/* Modal Center Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: "-55%", x: "-50%" }}
        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
        exit={{ opacity: 0, scale: 0.95, y: "-55%", x: "-50%" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-1/2 left-1/2 rounded-xl p-5 dark:bg-[#0C1015] border border-neutral-800 shadow-xl z-[9999] text-white w-[90%] max-w-md"
      >
        <h1 className="font-thin text-[18px]">Create New Project</h1>

        <div className="flex flex-col gap-y-2 mt-5">
          <h5 className="text-[11px] font-medium tracking-wider text-neutral-400 uppercase">
            Project Name
          </h5>
          <div className="w-100">
            <DashboardSettingsProfileInputs
              placeholder="e.g., Backend Api"
              value={projectName}
              onChange={isSubmitting ? () => {} : setProjectName}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mt-5">
          <h5 className="text-[11px] font-medium tracking-wider text-neutral-400 uppercase">
            Description
          </h5>
          <div className="w-100">
            <DashboardSettingsProfileInputs
              placeholder="Brief project description..."
              value={projectDescription}
              onChange={isSubmitting ? () => {} : setProjectDescription}
              height={80}
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-x-3 mt-6">
          <motion.div whileTap={isSubmitting ? {} : { scale: 0.98 }}>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={toggleProjectCreationPortal}
              className="py-2 px-4 rounded-xl border border-gray-800 text-sm transition-colors hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </motion.div>

          <motion.div whileTap={isSubmitting ? {} : { scale: 0.98 }}>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleAddProject}
              className="py-2 px-4 rounded-xl bg-primary text-sm font-medium flex items-center justify-center min-w-[120px] transition-all active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Create Project"
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default function CreateProjectPortal({
  setFunction,
  toggleProjectCreationPortal,
  onProjectCreated,
}: PortalInterface) {
  return createPortal(
    <Portal
      toggleProjectCreationPortal={toggleProjectCreationPortal}
      onProjectCreated={onProjectCreated}
    />,
    document.body,
  );
}
