import { FiClock, FiCalendar } from "react-icons/fi";

const UpcomingDeadlines = ({ deadlines = [] }) => {
  return (
    <section
      className="
        min-w-0 rounded-2xl border border-slate-200
        bg-white p-4 shadow-sm
        sm:p-5
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
            Upcoming Deadlines
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
            Don't miss important tasks
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <FiClock size={19} />
        </div>
      </div>

      {/* Deadlines List */}
      <div className="mt-5 space-y-3 sm:space-y-4">
        {deadlines.length > 0 ? (
          deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="
                min-w-0 rounded-xl border border-slate-100
                p-3 transition-colors hover:bg-slate-50
                sm:p-4
                dark:border-slate-800 dark:hover:bg-slate-800/50
              "
            >
              <div className="flex min-w-0 items-start gap-3">
                {/* Calendar Icon */}
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <FiCalendar size={17} />
                </div>

                {/* Task Details */}
                <div className="min-w-0 flex-1">
                  <h3
                    className="wrap-break-word text-sm font-medium text-slate-900 dark:text-white"
                    title={deadline.title}
                  >
                    {deadline.title}
                  </h3>

                  {deadline.project && (
                    <p className="mt-1 wrap-break-word text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {deadline.project}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    {/* Priority */}
                    {deadline.priority && (
                      <span
                        className={`
                          inline-flex rounded-lg px-2 py-1
                          text-[11px] font-medium
                          ${
                            deadline.priority.toLowerCase() === "high"
                              ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                              : deadline.priority.toLowerCase() === "medium"
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          }
                        `}
                      >
                        {deadline.priority}
                      </span>
                    )}

                    {/* Due Date */}
                    {deadline.date && (
                      <span className="max-w-full wrap-break-word text-xs text-slate-500 dark:text-slate-400">
                        {deadline.date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center dark:border-slate-700">
            <FiCalendar
              size={28}
              className="text-slate-400 dark:text-slate-500"
            />

            <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              No upcoming deadlines
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              You're all caught up!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingDeadlines;
