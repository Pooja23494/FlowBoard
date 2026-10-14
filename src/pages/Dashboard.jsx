import { useMemo } from "react";
import { useSelector } from "react-redux";

import StatsCard from "../components/dashboard/StatsCard";
import ProjectOverview from "../components/dashboard/ProjectOverview";
import RecentTasks from "../components/dashboard/RecentTasks";
import UpcomingDeadlines from "../components/dashboard/UpcomingDeadlines";
import ProductivityChart from "../components/dashboard/ProductivityChart";

import { productivityData } from "../data/dashboardData";

const formatStatus = (status = "") =>
  status.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const getDateLabel = (dateString) => {
  if (!dateString) return "No due date";

  const parts = dateString.split("-").map(Number);

  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return dateString;
  }

  const [year, month, day] = parts;
  const dueDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (dueDate.getTime() === today.getTime()) return "Today";
  if (dueDate.getTime() === tomorrow.getTime()) return "Tomorrow";

  if (dueDate < today) return "Overdue";

  return dueDate.toLocaleDateString("en-IN", {
    month: "short",
    day: "2-digit",
  });
};

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "User";

  const projects = useSelector((state) => state.projects.projects);

  const tasks = useSelector((state) => state.tasks.tasks);

  const dashboardStats = useMemo(() => {
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.status === "done",
    ).length;

    const activeTasks = tasks.filter((task) => task.status !== "done").length;

    const completionRate = totalTasks
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    return [
      {
        id: 1,
        title: "Total Projects",
        value: projects.length,
        change: "Live",
        description: "Current workspace",
        icon: "projects",
      },
      {
        id: 2,
        title: "Active Tasks",
        value: activeTasks,
        change: "Live",
        description: "Tasks not completed",
        icon: "tasks",
      },
      {
        id: 3,
        title: "Completed Tasks",
        value: completedTasks,
        change: "Live",
        description: "Successfully completed",
        icon: "completed",
      },
      {
        id: 4,
        title: "Completion Rate",
        value: `${completionRate}%`,
        change: "Live",
        description: "Completed tasks / all tasks",
        icon: "productivity",
      },
    ];
  }, [projects, tasks]);

  const recentTasks = useMemo(() => {
    return [...tasks].slice(0, 4).map((task) => {
      const project = projects.find(
        (item) => String(item.id) === String(task.projectId),
      );

      return {
        ...task,
        project: project?.name || "Unknown project",
        priority: formatStatus(task.priority),
        status: formatStatus(task.status),
        dueDate: getDateLabel(task.dueDate),
      };
    });
  }, [tasks, projects]);

  const deadlines = useMemo(() => {
    return tasks
      .filter((task) => task.status !== "done" && task.dueDate)
      .slice()
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 4)
      .map((task) => {
        const project = projects.find(
          (item) => String(item.id) === String(task.projectId),
        );

        return {
          id: task.id,
          title: task.title,
          project: project?.name || "Unknown project",
          date: getDateLabel(task.dueDate),
          priority: formatStatus(task.priority),
        };
      });
  }, [tasks, projects]);

  return (
    <main className="mx-auto w-full min-w-0 max-w-[1600px] space-y-6 sm:space-y-8">
      <section className="flex min-w-0 flex-col gap-2">
        <h1 className="wrap-break-word text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
          Good morning, {userName} 👋
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
          Here's what's happening with your workspace today.
        </p>
      </section>

      <section
        aria-label="Workspace statistics"
        className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {dashboardStats.map((stat) => (
          <StatsCard key={stat.id} {...stat} />
        ))}
      </section>

      <section
        aria-label="Project overview and productivity"
        className="grid min-w-0 grid-cols-1 gap-5 lg:gap-6 xl:grid-cols-2"
      >
        <div className="min-w-0">
          <ProjectOverview projects={projects} />
        </div>

        <div className="min-w-0">
          <ProductivityChart data={productivityData} />
        </div>
      </section>

      <section
        aria-label="Recent tasks and upcoming deadlines"
        className="grid min-w-0 grid-cols-1 gap-5 lg:gap-6 xl:grid-cols-3"
      >
        <div className="min-w-0 xl:col-span-2">
          <RecentTasks tasks={recentTasks} />
        </div>

        <div className="min-w-0">
          <UpcomingDeadlines deadlines={deadlines} />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
