import {
  FiCheckCircle,
  FiClock,
  FiList,
  FiAlertCircle,
  FiArrowUpRight,
} from "react-icons/fi";

const StatsOverview = ({
  totalTasks = 0,
  completedTasks = 0,
  completionRate = 0,
  overdueTasks = 0,
}) => {
  const safeTotal = Math.max(0, Number(totalTasks) || 0);
  const safeCompleted = Math.max(0, Number(completedTasks) || 0);
  const safeOverdue = Math.max(0, Number(overdueTasks) || 0);
  const safeRate = Math.min(
    100,
    Math.max(0, Number(completionRate) || 0),
  );

  const stats = [
    {
      title: "Total Tasks",
      value: safeTotal,
      icon: FiList,
      description: "Tasks in selected period",
      iconClass:
        "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
      accent: "bg-violet-500",
    },
    {
      title: "Completed",
      value: safeCompleted,
      icon: FiCheckCircle,
      description: "Successfully completed",
      iconClass:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      accent: "bg-emerald-500",
    },
    {
      title: "Completion Rate",
      value: `${safeRate}%`,
      icon: FiClock,
      description: "Tasks completed in this period",
      iconClass:
        "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      accent: "bg-blue-500",
    },
    {
      title: "Overdue",
      value: safeOverdue,
      icon: FiAlertCircle,
      description: "Incomplete overdue tasks",
      iconClass:
        "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
      accent: "bg-red-500",
    },
  ];

  return (
    <section
      aria-label="Task statistics overview"
      className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Subtle top accent */}
            <div
              className={`absolute inset-x-0 top-0 h-0.5 ${stat.accent} opacity-0 transition-opacity group-hover:opacity-100`}
            />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.title}
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${stat.iconClass}`}
              >
                <Icon size={21} aria-hidden="true" />
              </div>
            </div>

            <div className="mt-4 flex min-h-5 items-center justify-between gap-2">
              <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                {stat.description}
              </p>

              <FiArrowUpRight
                size={15}
                aria-hidden="true"
                className="shrink-0 text-slate-300 transition-colors group-hover:text-slate-500 dark:text-slate-600 dark:group-hover:text-slate-300"
              />
            </div>

            {/* Completion progress */}
            {stat.title === "Completion Rate" && (
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                role="progressbar"
                aria-label="Task completion rate"
                aria-valuenow={safeRate}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${safeRate}%` }}
                />
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
};

export default StatsOverview;