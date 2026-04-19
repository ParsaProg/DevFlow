import {
  ChartNoAxesCombinedIcon,
  CircleDotIcon,
  FolderCodeIcon,
  LucideLayoutDashboard,
  SettingsIcon,
} from "lucide-react";

export const DashboardTabList = [
  {
    title: "Dashboard",
    icon: <LucideLayoutDashboard size={18} />,
  },
  {
    title: "Projects",
    icon: <FolderCodeIcon size={18} />,
  },
  {
    title: "Issues",
    icon: <CircleDotIcon size={18} />,
  },
  {
    title: "Analytics",
    icon: <ChartNoAxesCombinedIcon size={18} />,
  },
  {
    title: "Settings",
    icon: <SettingsIcon size={18} />,
  },
];
