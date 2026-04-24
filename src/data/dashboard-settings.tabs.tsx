import { Bell, Palette, Shield, User } from "lucide-react";
import { DashboardSettingsTabInterface } from "../interfaces/dashboard-settings.tab-interface";

export const DashboardSettingsTabs: DashboardSettingsTabInterface[] = [
  {
    icon: <User size={17} />,
    title: "Profile",
  },
  {
    icon: <Bell size={17} />,
    title: "Notification",
  },
  {
    icon: <Shield size={17} />,
    title: "Security",
  },
  {
    icon: <Palette size={17} />,
    title: "Appearance",
  },
];
