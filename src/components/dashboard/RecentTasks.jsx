import { FiArrowUpRight, FiCheckCircle, FiCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const RecentTasks = ({ tasks = [] }) => {
  const navigate = useNavigate();

  const priorityStyles = {
    Urgent:
      "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    High:
      "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    Medium:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
    Low:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  };

  return (
    <section
      className="
        h-full min-w-0 overflow-hidden
        rounded-2xl border border-slate-200
        bg-white shadow-sm
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-wrap items-center justify-between gap-3
          border-b border-slate-200 p-4
          sm:p-5 dark:border-slate-800
        "
      >
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Recent Tasks
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Your latest task activity
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="
            inline-flex shrink-0 items-center gap-1
            rounded-lg px-2 py-1.5
            text-xs font-medium text-blue-600
            transition hover:bg-blue-50 hover:text-blue-700
            sm:text-sm
            dark:text-blue-400 dark:hover:bg-blue-500/10
          "
        >
          View all
          <FiArrowUpRight size={15} />
        </button>
      </div>

      {/* Task List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {tasks.length > 0 ? (
          tasks.map((task) => {
            const isDone = task.status === "Done";

            return (
              <article
                key={task.id}
                className="
                  flex min-w-0 items-start gap-3
                  p-4 transition-colors
                  hover:bg-slate-50/70
                  sm:items-center sm:gap-4 sm:p-5
                  dark:hover:bg-slate-800/30
                "
              >
                {/* Status Icon */}
                <div
                  className={`
                    mt-0.5 flex h-9 w-9 shrink-0
                    items-center justify-center rounded-full
                    sm:mt-0
                    ${
                      isDone
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                    }
                  `}
                >
                  {isDone ? (
                    <FiCheckCircle size={17} />
                  ) : (
                    <FiCircle size={17} />
                  )}
                </div>

                {/* Task Details */}
                <div className="min-w-0 flex-1">
                  <h3
                    className={`
                      wrap-break-word text-sm font-medium
                      text-slate-900 dark:text-white
                      ${isDone ? "text-slate-500 dark:text-slate-400" : ""}
                    `}
                  >
                    {task.title}
                  </h3>

                  <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                    {task.project || "No project assigned"}
                  </p>

                  {/* Mobile Metadata */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 sm:hidden">
                    <span
                      className={`
                        rounded-md px-2 py-1
                        text-[10px] font-medium
                        ${priorityStyles[task.priority] || priorityStyles.Low}
                      `}
                    >
                      {task.priority || "Low"}
                    </span>

                    {task.dueDate && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Due {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Desktop Metadata */}
                <div className="hidden shrink-0 items-center gap-3 sm:flex">
                  <span
                    className={`
                      rounded-lg px-2.5 py-1
                      text-[11px] font-medium
                      ${priorityStyles[task.priority] || priorityStyles.Low}
                    `}
                  >
                    {task.priority || "Low"}
                  </span>

                  <span className="whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                    {task.dueDate || "No due date"}
                  </span>
                </div>
              </article>
            );
          })
        ) : (
          /* Empty State */
          <div className="px-4 py-10 text-center sm:px-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <FiCheckCircle size={21} />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
              No recent tasks
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Your recent tasks will appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              View tasks
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentTasks;
