"use client";

import { useReducer } from "react";
import { motion } from "framer-motion";
interface NotificationState {
  issueAssigned: boolean;
  comments: boolean;
  projectUpdates: boolean;
  weeklyDigest: boolean;
}
const initialState: NotificationState = {
  issueAssigned: true,
  comments: true,
  projectUpdates: true,
  weeklyDigest: true,
};

type NotificationAction =
  | { type: "TOGGLE_ISSUE_ASSIGNED" }
  | { type: "TOGGLE_COMMENTS" }
  | { type: "TOGGLE_PROJECT_UPDATES" }
  | { type: "TOGGLE_WEEKLY_DIGEST" };
export function DashboardSettingsNotification() {
  function notificationReducer(
    state: NotificationState,
    action: NotificationAction,
  ): NotificationState {
    switch (action.type) {
      case "TOGGLE_ISSUE_ASSIGNED":
        return { ...state, issueAssigned: !state.issueAssigned };
      case "TOGGLE_COMMENTS":
        return { ...state, comments: !state.comments };
      case "TOGGLE_PROJECT_UPDATES":
        return { ...state, projectUpdates: !state.projectUpdates };
      case "TOGGLE_WEEKLY_DIGEST":
        return { ...state, weeklyDigest: !state.weeklyDigest };
    }
  }
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  return (
    <motion.div
      key="notifications"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
      }}
      className="flex flex-col gap-y-8 items-start w-[80%] dark:bg-[#0C1015] border dark:border-gray-800 rounded-2xl p-5 z-1"
    >
      <div>
        <h1 className="font-semibold text-sm">Notifications</h1>
        <span className="font-thin text-sm text-gray-500">
          Choose what you want to be notified about.
        </span>
      </div>
      <div className="w-full flex flex-col items-start gap-y-3 mt-3">
        <div className="flex w-full justify-between items-center">
          <div className="text-sm">
            <h1>Issue assigned to me</h1>
            <span className="text-gray-500 font-thin">
              Get notified when an issue is assigned to you.
            </span>
          </div>
          <div
            onClick={() => dispatch({ type: "TOGGLE_ISSUE_ASSIGNED" })}
            className={`cursor-pointer relative rounded-full h-7 w-13 ${state.issueAssigned ? "bg-blue-500" : "bg-gray-900"} transition-colors duration-300`}
          >
            <motion.div
              className="absolute rounded-full bg-white w-6 h-6 top-[50%] translate-y-[-50%]"
              animate={{ x: state.issueAssigned ? 26 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
        <span className="w-full h-px rounded-full bg-gray-800"></span>
      </div>
      <div className="w-full flex flex-col items-start gap-y-3">
        <div className="flex w-full justify-between items-center">
          <div className="text-sm">
            <h1>Comments on my issues</h1>
            <span className="text-gray-500 font-thin">
              Get notified when someone comments on your issues.
            </span>
          </div>
          <div
            onClick={() => dispatch({ type: "TOGGLE_COMMENTS" })}
            className={`cursor-pointer relative rounded-full h-7 w-13 ${state.comments ? "bg-blue-500" : "bg-gray-900"} transition-colors duration-300`}
          >
            <motion.div
              className="absolute rounded-full bg-white w-6 h-6 top-[50%] translate-y-[-50%]"
              animate={{ x: state.comments ? 26 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
        <span className="w-full h-px rounded-full bg-gray-800"></span>
      </div>
      <div className="w-full flex flex-col items-start gap-y-3">
        <div className="flex w-full justify-between items-center">
          <div className="text-sm">
            <h1>Project updates</h1>
            <span className="text-gray-500 font-thin">
              Get notified about project milestone changes.
            </span>
          </div>
          <div
            onClick={() => dispatch({ type: "TOGGLE_PROJECT_UPDATES" })}
            className={`cursor-pointer relative rounded-full h-7 w-13 ${state.projectUpdates ? "bg-blue-500" : "bg-gray-900"} transition-colors duration-300`}
          >
            <motion.div
              className="absolute rounded-full bg-white w-6 h-6 top-[50%] translate-y-[-50%]"
              animate={{ x: state.projectUpdates ? 26 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
        <span className="w-full h-px rounded-full bg-gray-800"></span>
      </div>
      <div className="w-full flex flex-col items-start gap-y-3">
        <div className="flex w-full justify-between items-center">
          <div className="text-sm">
            <h1>Weekly digest</h1>
            <span className="text-gray-500 font-thin">
              Receive a weekly summary of your workspace activity.
            </span>
          </div>
          <div
            onClick={() => dispatch({ type: "TOGGLE_WEEKLY_DIGEST" })}
            className={`cursor-pointer relative rounded-full h-7 w-13 ${state.weeklyDigest ? "bg-blue-500" : "bg-gray-900"} transition-colors duration-300`}
          >
            <motion.div
              className="absolute rounded-full bg-white w-6 h-6 top-[50%] translate-y-[-50%]"
              animate={{ x: state.weeklyDigest ? 26 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
