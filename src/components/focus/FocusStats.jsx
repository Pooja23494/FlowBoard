import { FiClock, FiTarget, FiZap } from "react-icons/fi";

const FocusStats = ({ sessions = 0, totalFocusMinutes = 0 }) => {
  const safeSessions = Math.max(0, Number(sessions) || 0);
  const safeMinutes = Math.max(0, Number(totalFocusMinutes) || 0);

  const stats = [
    {
      label: "Sessions Completed",
      value: safeSessions.toLocaleString(),
      description: "Completed focus sessions",
      icon: FiTarget,
      iconStyle:
        "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    },
    {
      label: "Focus Time",
      value:
        safeMinutes >= 60
          ? `${Math.floor(safeMinutes / 60)}h ${safeMinutes % 60}m`
          : `${safeMinutes} min`,
      description: "Total focused time",
      icon: FiClock,
      iconStyle:
        "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
    },
    {
      label: "Focus Milestone",
      value: safeSessions >= 4 ? "On a roll!" : `${safeSessions}/4`,
      description:
        safeSessions >= 4
          ? "Four sessions completed"
          : "Goal: 4 sessions",
      icon: FiZap,
      iconStyle:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },
  ];

  return (
    <section aria-label="Focus statistics" className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Your Focus Stats
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track your progress one session at a time.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-1">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconStyle}`}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>

                  <p className="mt-1 wrap-break-word text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    {stat.description}
                  </p>
                </div>
              </div>

              {stat.label === "Focus Milestone" && (
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-300"
                    style={{
                      width: `${Math.min((safeSessions / 4) * 100, 100)}%`,
                    }}
                  />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FocusStats;