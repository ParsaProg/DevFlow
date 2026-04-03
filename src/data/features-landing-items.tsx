import { Box, BoxesIcon, ChartColumnIcon, GitBranch, Shield, Users2, Zap } from "lucide-react";
import { FeaturesLandingInterface } from "../interfaces/FeaturesLandingItems";


export const featuresLandingItems:FeaturesLandingInterface[] = [
    {
        icon: <GitBranch size={23}/>,
        title: "Structred Issues Tracking",
        desc: "Full-featured issue workflows with custom statuses, priority levels, and automated transitions."
    },
    {
        icon: <BoxesIcon size={23}/>,
        title: "Kanban Boards",
        desc: "Visualize your workflow with drag-and-drop boards. Organize tasks across customizable columns."
    },
    {
        icon: <Zap size={23}/>,
        title: "Lightning Fast",
        desc: "Built for speed. Sub-100ms interactions, instant search, and real-time sync across your team."
    },
    {
        icon: <Users2 size={23}/>,
        title: "Team Collaboration",
        desc: "Real-time presence, mentions, and threaded comments. Keep everyone aligned without meetings."
    },
    {
        icon: <ChartColumnIcon size={23}/>,
        title: "Advanced Analytics",
        desc: "Track velocity, burndown charts, and team performance with actionable insights."
    },
    {
        icon: <Shield size={23}/>,
        title: "Enterprise Security",
        desc: "SOC 2 compliant with SSO, role-based access control, and audit logs built in."
    }
]