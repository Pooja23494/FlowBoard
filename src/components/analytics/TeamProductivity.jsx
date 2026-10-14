import {
  FiCheckCircle,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "?";

const getProgressColor = (progress) => {
  if (progress >= 75) return "bg-emerald-500";
  if (progress >= 40) return "bg-violet-500";
  if (progress > 0) return "bg-amber-500";
  return "bg-slate-300 dark:bg-slate-600";
};

const TeamProductivity = ({ members = [] }) => {
  const teamMembers = Array.isArray(members) ? members : [];

  const totalTasks = teamMembers.reduce(
    (total, member) => total + Math.max(0, Number(member.tasks) || 0),
    0,
  );

  const completedTasks = teamMembers.reduce(
    (total, member) =>
      total + Math.max(0, Number(member.completedTasks) || 0),
    0,
  );

  const overallProgress =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Team Productivity
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Task completion by team member.
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiUsers size={20} />
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Team members
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {teamMembers.length}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Completed tasks
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {completedTasks}
            <span className="ml-1 text-sm font-medium text-slate-400">
              / {totalTasks}
            </span>
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Overall progress
          </p>

          <p className="mt-1 flex items-center gap-1 text-xl font-bold text-violet-600 dark:text-violet-400">
            <FiTrendingUp size={17} />
            {overallProgress}%
          </p>
        </div>
      </div>

      {/* Team members */}
      {teamMembers.length > 0 ? (
        <div className="space-y-5">
          {teamMembers.map((member, index) => {
            const name = member.name?.trim() || "Unnamed member";
            const tasks = Math.max(0, Number(member.tasks) || 0);
            const completed = Math.min(
              tasks,
              Math.max(0, Number(member.completedTasks) || 0),
            );

            const progress = Math.min(
              100,
              Math.max(
                0,
                Number.isFinite(Number(member.progress))
                  ? Number(member.progress)
                  : tasks > 0
                    ? (completed / tasks) * 100
                    : 0,
              ),
            );

            const roundedProgress = Math.round(progress);

            return (
              <article key={member.id ?? `${name}-${index}`}>
                {/* Member details */}
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-100 bg-violet-50 text-sm font-semibold text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300">
                      {getInitials(name)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {completed}/{tasks} tasks completed
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <FiCheckCircle
                      size={15}
                      className={
                        roundedProgress === 100
                          ? "text-emerald-500"
                          : "text-slate-400 dark:text-slate-500"
                      }
                    />

                    <span className="text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-200">
                      {roundedProgress}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                  role="progressbar"
                  aria-label={`${name} task completion`}
                  aria-valuenow={roundedProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center dark:border-slate-700">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
            <FiUsers size={22} />
          </div>

          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            No team members yet
          </p>

          <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">
            Add team members and assign tasks to track productivity.
          </p>
        </div>
      )}
    </section>
  );
};

export default TeamProductivity;