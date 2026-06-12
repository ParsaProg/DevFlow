"use client";

import toast from "react-hot-toast";
import { BACKEND_BASE_URL } from "../constants/backendBaseUrl";
import { useRouter } from "next/navigation";

interface ProjectDetailsServiceInterface {
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
  slug: string;
  setProject: (value: any[]) => void;
}

export const fetchProjectDetails = async ({
  setLoading,
  setError,
  slug,
  setProject,
}: ProjectDetailsServiceInterface) => {
  const router = useRouter();
  const token = localStorage.getItem("accessToken") || "";
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(
      `${BACKEND_BASE_URL}/api/v1/projects/${slug}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Project not found");
      }
      throw new Error("Failed to fetch project data");
    }

    const data = await response.json();
    console.log(data);
    setProject(data);
    document.title = `${data?.["name"]} Project`;
  } catch (err: any) {
    setError(err.message || "Something went wrong");
    toast.error(err.message);
    setTimeout(() => {
      router.replace("/dashboard/projects");
    }, 3000);
  } finally {
    setLoading(false);
  }
};
