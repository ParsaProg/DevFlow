type Priority = "High" | "Medium" | "Low";
type Status = "In Progress" | "Todo" | "Done";

type Assignee = {
  userName: string;
};

type IssueType = {
  title: string;
  project: string;
  status: Status;
  priority: Priority;
  assignee: Assignee;
  updatedAt: string;
};

export const IssuesModelData: IssueType[] = [
  {
    title: "Implement SSO integration",
    project: "Auth Service",
    status: "In Progress",
    priority: "High",
    assignee: { userName: "Jake, Doe" },
    updatedAt: "2h ago",
  },
  {
    title: "Design system color tokens",
    project: "Frontend",
    status: "Todo",
    priority: "Medium",
    assignee: { userName: "Alex, Parker" },
    updatedAt: "4h ago",
  },
  {
    title: "Performance regression fix",
    project: "Core Engine",
    status: "In Progress",
    priority: "High",
    assignee: { userName: "Jake, Lee" },
    updatedAt: "1d ago",
  },
  {
    title: "Write API documentation",
    project: "Platform",
    status: "Todo",
    priority: "Low",
    assignee: { userName: "Marcus, Rivera" },
    updatedAt: "2d ago",
  },
  {
    title: "Add rate limiting to endpoints",
    project: "API Gateway",
    status: "Done",
    priority: "High",
    assignee: { userName: "Sarah, Chen" },
    updatedAt: "3d ago",
  },
];
