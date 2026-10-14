import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FiBarChart2 } from "react-icons/fi";

import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import StatsOverview from "../components/analytics/StatsOverview";
import TaskActivityChart from "../components/analytics/TaskActivityChart";
import TaskStatusChart from "../components/analytics/TaskStatusChart";
import PriorityChart from "../components/analytics/PriorityChart";
import ProjectProgressChart from "../components/analytics/ProjectProgressChart";
import TeamProductivity from "../components/analytics/TeamProductivity";

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getStartDate = (range, today) => {
  const start = new Date(today);

  if (range === "This Month") {
    start.setDate(1);
  } else if (range === "This Week") {
    const day = start.getDay();
    const daysSinceMonday = day === 0 ? 6 : day - 1;

    start.setDate(start.getDate() - daysSinceMonday);
  }

  return start;
};

const Analytics = () => {
  const tasks = useSelector((state) => state.tasks.tasks ?? []);
  const projects = useSelector((state) => state.projects.projects ?? []);
  const members = useSelector((state) => state.team.members ?? []);

  const [range, setRange] = useState("All Time");

  // Calculate the current date once per render.
  const today = new Date();
  const todayKey = getDateKey(today);

  const filteredTasks = useMemo(() => {
    if (range === "All Time") {
      return tasks;
    }

    const startDate = getStartDate(range, today);
    const startKey = getDateKey(startDate);

    return tasks.filter((task) => {
      if (!task.dueDate) return false;

      return (
        task.dueDate >= startKey &&
        task.dueDate <= todayKey
      );
    });
  }, [tasks, range, todayKey]);

  const analytics = useMemo(() => {
    const totalTasks = filteredTasks.length;

    const completedTasks = filteredTasks.filter(
      (task) => task.status === "done",
    ).length;

    const completionRate =
      totalTasks > 0
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

    const overdueTasks = filteredTasks.filter(
      (task) =>
        task.status !== "done" &&
        task.dueDate &&
        task.dueDate < todayKey,
    ).length;

    const statusCounts = {
      todo: 0,
      "in-progress": 0,
      review: 0,
      done: 0,
    };

    const priorityCounts = {
      low: 0,
      medium: 0,
      high: 0,
      urgent: 0,
    };

    const tasksByDueDate = {};

    filteredTasks.forEach((task) => {
      if (task.status in statusCounts) {
        statusCounts[task.status] += 1;
      }

      if (task.priority in priorityCounts) {
        priorityCounts[task.priority] += 1;
      }

      if (task.dueDate) {
        tasksByDueDate[task.dueDate] =
          (tasksByDueDate[task.dueDate] || 0) + 1;
      }
    });

    const statusData = [
      { name: "Todo", value: statusCounts.todo },
      { name: "In Progress", value: statusCounts["in-progress"] },
      { name: "Review", value: statusCounts.review },
      { name: "Done", value: statusCounts.done },
    ];

    const priorityData = [
      { name: "Low", value: priorityCounts.low },
      { name: "Medium", value: priorityCounts.medium },
      { name: "High", value: priorityCounts.high },
      { name: "Urgent", value: priorityCounts.urgent },
    ];

    const projectProgress = projects.map((project) => ({
      name: project.name || "Untitled Project",
      progress: Math.min(
        100,
        Math.max(0, Number(project.progress) || 0),
      ),
    }));

    // Display the previous 3 days, today, and next 3 days.
    const taskActivity = [];

    for (let i = -3; i <= 3; i += 1) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      const key = getDateKey(date);

      taskActivity.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        tasks: tasksByDueDate[key] || 0,
      });
    }

    return {
      totalTasks,
      completedTasks,
      completionRate,
      overdueTasks,
      statusData,
      priorityData,
      projectProgress,
      taskActivity,
    };
  }, [filteredTasks, projects, todayKey]);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Page Header and Date Range */}
      <AnalyticsHeader
        range={range}
        setRange={setRange}
      />

      {/* Summary Statistics */}
      <StatsOverview
        totalTasks={analytics.totalTasks}
        completedTasks={analytics.completedTasks}
        completionRate={analytics.completionRate}
        overdueTasks={analytics.overdueTasks}
      />

      {/* Task Activity and Status */}
      <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-3 xl:gap-6">
        <div className="min-w-0 xl:col-span-2">
          <TaskActivityChart data={analytics.taskActivity} />
        </div>

        <div className="min-w-0">
          <TaskStatusChart data={analytics.statusData} />
        </div>
      </section>

      {/* Priority and Project Progress */}
      <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <div className="min-w-0">
          <PriorityChart data={analytics.priorityData} />
        </div>

        <div className="min-w-0">
          <ProjectProgressChart
            data={analytics.projectProgress}
          />
        </div>
      </section>

      {/* Team Productivity */}
      <section className="min-w-0">
        <TeamProductivity members={members} />
      </section>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
            <FiBarChart2 size={22} />
          </div>

          <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
            No analytics data yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Create tasks and assign due dates to see your task
            statistics, priorities, and activity charts here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Analytics;