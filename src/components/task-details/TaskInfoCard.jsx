import { FiCalendar, FiFolder, FiFlag, FiUser, FiInfo } from "react-icons/fi";

const statusStyles = {
  todo: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "in-progress":
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  review:
    "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  done: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
};

const priorityStyles = {
  urgent: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  high: "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  medium:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const formatLabel = (value) => {
  if (!value) return "Not set";

  return String(value)
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatDate = (value) => {
  if (!value) return "No due date";

  // Preserve date-only values to avoid timezone-related date shifts.
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(String(value));

  const date = dateOnly ? new Date(`${value}T12:00:00`) : new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const InfoRow = ({ icon: Icon, label, children }) => (
  <div className="flex min-w-0 items-start gap-3">
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
      <Icon size={17} />
    </span>

    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <div className="mt-1 wrap-break-word text-sm font-medium leading-5 text-slate-800 dark:text-slate-200">
        {children}
      </div>
    </div>
  </div>
);

const TaskInfoCard = ({ task, project }) => {
  const status = task?.status || "todo";
  const priority = task?.priority || "medium";

  const statusClass =
    statusStyles[status] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

  const priorityClass =
    priorityStyles[priority] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

  return (
    <aside className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiInfo size={19} />
        </span>

        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Task Information
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Details and assignment
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Status */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Status
          </p>

          <span
            className={`inline-flex max-w-full rounded-lg px-3 py-1.5 text-xs font-semibold capitalize ${statusClass}`}
          >
            {formatLabel(status)}
          </span>
        </div>

        {/* Priority */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            Priority
          </p>

          <span
            className={`inline-flex max-w-full rounded-lg px-3 py-1.5 text-xs font-semibold capitalize ${priorityClass}`}
          >
            {formatLabel(priority)}
          </span>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800" />

        {/* Assignee */}
        <InfoRow icon={FiUser} label="Assignee">
          {task?.assignee || "Unassigned"}
        </InfoRow>

        {/* Due date */}
        <InfoRow icon={FiCalendar} label="Due Date">
          {formatDate(task?.dueDate)}
        </InfoRow>

        {/* Project */}
        <InfoRow icon={FiFolder} label="Project">
          {project?.name || "Unknown Project"}
        </InfoRow>

        {/* Task ID */}
        <InfoRow icon={FiFlag} label="Task ID">
          <span className="font-mono">#{task?.id ?? "N/A"}</span>
        </InfoRow>
      </div>
    </aside>
  );
};

export default TaskInfoCard;
