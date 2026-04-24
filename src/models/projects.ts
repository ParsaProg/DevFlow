type contributors = {
  userName: string;
  completedTasks: number;
  averageState: number;
};

export type ProjectsType = {
  title: string;
  subTitle: string;
  progressPercent: number;
  openIssues: number;
  contributors: Array<contributors>;
};

export const ProjectsModelData: ProjectsType[] = [
  {
    title: "Auth Service",
    subTitle: "Authentication and authorization microservice with SSO support.",
    progressPercent: 72,
    openIssues: 8,
    contributors: [
      {
        userName: "Parsa, Shaabani",
        completedTasks: 23,
        averageState: 3,
      },
      {
        userName: "Sarah, Chen",
        completedTasks: 19,
        averageState: 5,
      },
    ],
  },
  {
    title: "Frontend Platform",
    subTitle:
      "Next.js-based frontend with design system and component library.",
    progressPercent: 45,
    openIssues: 14,
    contributors: [
      {
        userName: "Parsa, Shaabani",
        completedTasks: 23,
        averageState: 3,
      },
      {
        userName: "Marcus, Rivera",
        completedTasks: 19,
        averageState: 5,
      },
    ],
  },
  {
    title: "Core Engine",
    subTitle: "High-performance data processing pipeline and query engine.",
    progressPercent: 88,
    openIssues: 3,
    contributors: [
      {
        userName: "Marcus, Rivera",
        completedTasks: 31,
        averageState: 5,
      },
      {
        userName: "Jake, Lee",
        completedTasks: 27,
        averageState: 4,
      },
      {
        userName: "Alex, Parker",
        completedTasks: 22,
        averageState: 4,
      },
    ],
  },
  {
    title: "Mobile App",
    subTitle: "Cross-platform mobile application built with React Native.",
    progressPercent: 20,
    openIssues: 22,
    contributors: [
      {
        userName: "Jake, Doe",
        completedTasks: 8,
        averageState: 2,
      },
      {
        userName: "Alex, Parker",
        completedTasks: 5,
        averageState: 2,
      },
    ],
  },
  {
    title: "Analytics Dashboard",
    subTitle: "Real-time analytics and reporting dashboard for team metrics.",
    progressPercent: 60,
    openIssues: 6,
    contributors: [
      {
        userName: "Sarah, Chen",
        completedTasks: 18,
        averageState: 4,
      },
      {
        userName: "Jake, Lee",
        completedTasks: 14,
        averageState: 3,
      },
    ],
  },
  {
    title: "API Gateway",
    subTitle: "Centralized API gateway with rate limiting and monitoring.",
    progressPercent: 95,
    openIssues: 1,
    contributors: [
      {
        userName: "Marcus, Rivera",
        completedTasks: 35,
        averageState: 5,
      },
      {
        userName: "Jake, Doe",
        completedTasks: 29,
        averageState: 5,
      },
      {
        userName: "Sarah, Chen",
        completedTasks: 24,
        averageState: 5,
      },
    ],
  },
];
