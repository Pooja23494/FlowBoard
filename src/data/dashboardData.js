export const dashboardStats = [
  {
    id: 1,
    title: "Total Projects",
    value: "12",
    change: "+2",
    description: "from last month",
    icon: "projects",
  },
  {
    id: 2,
    title: "Active Tasks",
    value: "48",
    change: "+8",
    description: "from last week",
    icon: "tasks",
  },
  {
    id: 3,
    title: "Completed Tasks",
    value: "126",
    change: "+18",
    description: "this month",
    icon: "completed",
  },
  {
    id: 4,
    title: "Productivity",
    value: "84%",
    change: "+6%",
    description: "from last week",
    icon: "productivity",
  },
];

export const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign company website",
    progress: 72,
    tasks: "18/25",
    members: 4,
  },
  {
    id: 2,
    name: "Mobile Application",
    description: "Build mobile application UI",
    progress: 48,
    tasks: "12/25",
    members: 5,
  },
  {
    id: 3,
    name: "Marketing Website",
    description: "Create marketing landing pages",
    progress: 86,
    tasks: "24/28",
    members: 3,
  },
];

export const recentTasks = [
  {
    id: 1,
    title: "Design homepage",
    project: "Website Redesign",
    priority: "High",
    status: "In Progress",
    dueDate: "Today",
  },
  {
    id: 2,
    title: "Fix login validation",
    project: "Mobile Application",
    priority: "Urgent",
    status: "Review",
    dueDate: "Tomorrow",
  },
  {
    id: 3,
    title: "Create hero section",
    project: "Marketing Website",
    priority: "Medium",
    status: "Todo",
    dueDate: "Sep 30",
  },
  {
    id: 4,
    title: "Update navigation",
    project: "Website Redesign",
    priority: "Low",
    status: "Done",
    dueDate: "Oct 01",
  },
];

export const deadlines = [
  {
    id: 1,
    title: "Homepage Design",
    project: "Website Redesign",
    date: "Today",
    priority: "High",
  },
  {
    id: 2,
    title: "API Integration",
    project: "Mobile Application",
    date: "Tomorrow",
    priority: "Urgent",
  },
  {
    id: 3,
    title: "Landing Page",
    project: "Marketing Website",
    date: "Oct 02",
    priority: "Medium",
  },
];

export const productivityData = [
  { day: "Mon", hours: 5 },
  { day: "Tue", hours: 7 },
  { day: "Wed", hours: 6 },
  { day: "Thu", hours: 8 },
  { day: "Fri", hours: 6.5 },
  { day: "Sat", hours: 4 },
  { day: "Sun", hours: 3 },
];
