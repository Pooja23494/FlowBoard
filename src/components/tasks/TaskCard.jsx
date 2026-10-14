import {
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

const priorityStyles = {
  urgent:
    "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  high:
    "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  medium:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  low:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

const statusStyles = {
  todo:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  "in-progress":
    "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  review:
    "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  done:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
};

const formatLabel = (value = "") => {
  if (!value) return "Not set";

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priority = task.priority || "low";
  const status = task.status || "todo";

  return (
    <article
      className="
        flex h-full min-w-0 flex-col
        rounded-2xl border border-slate-200
        bg-white p-4 shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        sm:p-5
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Header */}
      <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h3
            title={task.title || "Untitled task"}
            className="wrap-break-word text-sm font-semibold leading-6 text-slate-900 dark:text-white sm:text-base"
          >
            {task.title || "Untitled task"}
          </h3>

          <p className="mt-1.5 line-clamp-2 wrap-break-word text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
            {task.description || "No description provided."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => onEdit?.(task)}
            aria-label={`Edit ${task.title || "task"}`}
            title="Edit task"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-lg text-slate-400
              transition-colors
              hover:bg-blue-50 hover:text-blue-600
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-blue-500
              dark:hover:bg-blue-500/10 dark:hover:text-blue-400
            "
          >
            <FiEdit2 size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(task.id)}
            aria-label={`Delete ${task.title || "task"}`}
            title="Delete task"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-lg text-slate-400
              transition-colors
              hover:bg-red-50 hover:text-red-600
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-red-500
              dark:hover:bg-red-500/10 dark:hover:text-red-400
            "
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Priority and Status */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`
            inline-flex max-w-full items-center
            rounded-lg px-2.5 py-1.5
            text-[11px] font-semibold
            ${priorityStyles[priority] || priorityStyles.low}
          `}
        >
          {formatLabel(priority)}
        </span>

        <span
          className={`
            inline-flex max-w-full items-center
            rounded-lg px-2.5 py-1.5
            text-[11px] font-semibold
            ${statusStyles[status] || statusStyles.todo}
          `}
        >
          {formatLabel(status)}
        </span>
      </div>

      {/* Footer */}
      <div
        className="
          mt-auto pt-5
        "
      >
        <div
          className="
            flex flex-col gap-3
            border-t border-slate-100 pt-4
            dark:border-slate-800
            sm:flex-row sm:flex-wrap
            sm:items-center sm:justify-between
          "
        >
          <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <FiUser className="shrink-0" size={14} />

            <span className="truncate">{task.assignee || "Unassigned"}</span>
          </div>

          <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <FiCalendar className="shrink-0" size={14} />

            <span className="wrap-break-word">
              {task.dueDate || "No due date"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;