"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/providers/AuthProvider"; // Adjust this import path to match where your Context Provider is located
import { useUser } from "../hooks/useUser";

export default function DashboardClientGuard({
  children,
  route,
}: {
  children: ReactNode;
  route?: String;
}) {
  const { accessToken, loading, user } = useAuth();
  const router = useRouter();

  // DYNAMUC BROWSER TITLE SYNC!
  useEffect(() => {
    if (user?.firstName) {
      document.title = `${user["firstName"]}${user["lastName"]}'s ${route}`;
    } else {
      document.title = `DevFlow | ${route}`;
    }
  }, [user]);

  useEffect(() => {
    // If the initialization check completes and no access token exists, boot them to login
    if (!loading && !accessToken) {
      router.push("/auth/sign-in");
    }
  }, [loading, accessToken, router]);

  // Show a slick loading state while the silent verification takes place on mount
  if (loading) {
    return (
      <div className="-mt-25 h-screen w-screen bg-[#05070B] flex flex-col items-center justify-center text-white gap-2">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-neutral-400 font-medium tracking-wide">
          Syncing DevFlow Workspace...
        </p>
      </div>
    );
  }

  // If a valid session exists, immediately render the layout nodes across all dashboard pages!
  return <>{accessToken ? children : null}</>;
}
