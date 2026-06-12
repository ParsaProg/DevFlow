"use client";

import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "@/src/constants/backendBaseUrl";
import { Bell, Megaphone, Check, X, ShieldAlert, Calendar } from "lucide-react";
import { fetchNotifications } from "@/src/services/FetchNotifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNotifications({
      setLoading: setLoading,
      setNotifications: setNotifications,
    });
  }, []);

  const handleAction = async (
    notificationId: string,
    action: "ACCEPT" | "DECLINE",
  ) => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(
        `${BACKEND_BASE_URL}/api/v1/notifications/${notificationId}/respond`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ action }),
        },
      );

      if (res.ok) {
        // Refresh feed array natively
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === notificationId
              ? { ...n, status: action === "ACCEPT" ? "ACCEPTED" : "DECLINED" }
              : n,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="p-8 text-sm text-neutral-500">Syncing alerts...</div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen text-white">
      <div className="flex items-center gap-x-3 mb-8 border-b border-neutral-800/60 pb-5">
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
          <Bell size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide">Inbox Feed</h1>
          <p className="text-neutral-500 text-xs mt-0.5">
            Manage incoming project handshakes and global devflow updates.
          </p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="border border-dashed border-neutral-800 rounded-2xl py-12 text-center text-sm text-neutral-500">
          Your pipeline is clear. No notifications found.
        </div>
      ) : (
        <div className="flex flex-col gap-y-3.5">
          {notifications.map((notif) => {
            const isInvite = notif.type === "PROJECT_INVITE";

            return (
              <div
                key={notif.id}
                className="border border-neutral-800/80 bg-[#0C1015]/60 backdrop-blur-md rounded-2xl p-5 flex items-start justify-between gap-x-4 transition-all duration-200"
              >
                <div className="flex items-start gap-x-4.5">
                  {/* Icon Mode Layout */}
                  <div
                    className={`p-2.5 rounded-xl mt-0.5 ${isInvite ? "bg-blue-950/20 text-blue-400" : "bg-amber-950/20 text-amber-400"}`}
                  >
                    {isInvite ? (
                      <ShieldAlert size={18} />
                    ) : (
                      <Megaphone size={18} />
                    )}
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <h3 className="font-semibold text-[14px] text-neutral-100">
                      {notif.title}
                    </h3>
                    <p className="text-[13px] text-neutral-400 font-light leading-relaxed max-w-xl">
                      {notif.message}
                    </p>

                    {isInvite && notif.project && (
                      <span className="text-[11px] font-medium bg-neutral-900 px-2 py-0.5 rounded text-neutral-400 w-max mt-1">
                        Project ID: {notif.project.name}
                      </span>
                    )}

                    <div className="flex items-center gap-x-1.5 text-[11px] text-neutral-600 mt-1">
                      <Calendar size={12} />
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Conditional Call-To-Action Element Matrix */}
                <div className="flex items-center gap-x-2">
                  {isInvite && notif.status === "PENDING" ? (
                    <>
                      <button
                        onClick={() => handleAction(notif.id, "DECLINE")}
                        className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-950/20 border border-neutral-800 rounded-xl transition-all cursor-pointer"
                      >
                        <X size={15} />
                      </button>
                      <button
                        onClick={() => handleAction(notif.id, "ACCEPT")}
                        className="bg-primary hover:bg-primary/90 text-white text-[12px] font-medium px-3.5 py-2 rounded-xl flex items-center gap-x-1.5 transition-all cursor-pointer"
                      >
                        <Check size={14} />
                        Accept
                      </button>
                    </>
                  ) : (
                    <span
                      className={`text-[12px] font-medium px-3 py-1 rounded-xl uppercase tracking-wider ${
                        notif.status === "ACCEPTED"
                          ? "text-green-400 bg-green-950/10"
                          : notif.status === "DECLINED"
                            ? "text-red-400 bg-red-950/10"
                            : "text-neutral-500"
                      }`}
                    >
                      {notif.status.toLowerCase()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
