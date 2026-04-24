import { DashboardStat } from "../interfaces/dashboard-status-interface";

export const DashboardAnalyticsStat: DashboardStat[] = [
  {
    label: "TEAM VELOCITY",
    value: 34,
    unit: "pts/sprint",
    trend: "+12%",
    isPositive: true,
  },
  {
    label: "AVG. CYCLE TIME",
    value: 2.4,
    unit: "days",
    trend: "-18%",
    isPositive: false,
  },
  {
    label: "THROUGHPUT",
    value: 47,
    unit: "tasks/week",
    trend: "+8%",
    isPositive: true,
  },
  {
    label: "BUG RATE",
    value: 3.2,
    unit: "%",
    trend: "-24%",
    isPositive: false,
  },
];
