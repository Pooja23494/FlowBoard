import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiFlag,
  FiArrowUpRight,
  FiClipboard,
} from "react-icons/fi";

const priorityStyles = {
  urgent: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  high: "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  medium: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

const statusStyles = {
  todo: "text-slate-500 dark:text-slate-400",
  "in-progress": "text-blue-600 dark:text-blue-400",
  review: "text-orange-600 dark:text-orange-400",
  done: "text-emerald-600 dark:text-emerald-400",
};

const formatLabel = (value, fallback = "Not set") => {
  if (!value) return fallback;

  return String(value)
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const CalendarTaskList = ({ selectedDate, tasks = [] }) => {
  const navigate = useNavigate();

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Select a date";

  return (
    <section className="mt-5 min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-5 lg:p-6 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-5 flex min-w-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <FiCalendar size={19} />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Selected Date
            </h2>
            <p className="mt-1 wrap-break-word text-xs text-slate-500 dark:text-slate-400">
              {dateLabel}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {/* Task list */}
      {tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task, index) => {
            const status = task?.status || "todo";
            const priority = task?.priority || "medium";

            const statusClass = statusStyles[status] || statusStyles.todo;

            const priorityClass =
              priorityStyles[priority] || priorityStyles.low;

            return (
              <article
                key={task.id ?? `${task.title}-${index}`}
                className="group min-w-0 rounded-xl border border-slate-200 p-3 transition hover:border-violet-200 hover:bg-violet-50/30 sm:p-4 dark:border-slate-800 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/5"
              >
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* Task information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-start gap-2">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <FiClipboard size={15} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => navigate(`/tasks/${task.id}`)}
                          className="block max-w-full wrap-break-word text-left text-sm font-semibold text-slate-900 transition hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-white dark:hover:text-violet-400"
                        >
                          {task.title || "Untitled task"}
                        </button>

                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                          <span
                            className={`inline-flex items-center gap-1.5 ${statusClass}`}
                          >
                            <FiCheckCircle size={13} />
                            <span>{formatLabel(status)}</span>
                          </span>

                          <span className="inline-flex min-w-0 items-center gap-1.5 text-slate-500 dark:text-slate-400">
                            <FiClock size={13} className="shrink-0" />
                            <span className="wrap-break-word">
                              {task.assignee || "Unassigned"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Priority and open action */}
                  <div className="flex items-center justify-between gap-2 sm:justify-end">
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${priorityClass}`}
                    >
                      <FiFlag size={12} />
                      {formatLabel(priority)}
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate(`/tasks/${task.id}`)}
                      aria-label={`View ${task.title || "task"}`}
                      title="View task details"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-violet-100 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
                    >
                      <FiArrowUpRight size={17} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center dark:border-slate-700">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            <FiCalendar size={23} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
            No tasks scheduled
          </h3>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500 dark:text-slate-400">
            There are no tasks due on this date. Choose another date to see its
            tasks.
          </p>
        </div>
      )}
    </section>
  );
};

export default CalendarTaskList;
