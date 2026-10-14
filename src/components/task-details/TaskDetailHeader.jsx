import { FiArrowLeft, FiEdit2, FiTrash2, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TaskDetailHeader = ({ task, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <header className="mb-5 min-w-0 sm:mb-6">
      {/* Back navigation */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex min-h-9 items-center gap-2 rounded-lg pr-2 text-sm font-medium text-slate-500 transition hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-slate-400 dark:hover:text-violet-400"
      >
        <FiArrowLeft size={17} />
        <span>Back</span>
      </button>

      {/* Header content */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        {/* Title and breadcrumb */}
        <div className="min-w-0 flex-1">
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-400 sm:text-sm"
          >
            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="rounded transition hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:text-violet-400"
            >
              Tasks
            </button>

            <FiChevronRight size={14} className="shrink-0" />

            <span className="text-slate-500 dark:text-slate-300">
              Task Details
            </span>
          </nav>

          <h1 className="wrap-break-word text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl lg:text-3xl dark:text-white">
            {task?.title || "Untitled Task"}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            View and manage task details.
          </p>
        </div>

        {/* Action buttons */}
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:shrink-0">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit task"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 sm:px-4 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
          >
            <FiEdit2 size={16} className="shrink-0" />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete task"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:px-4 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
          >
            <FiTrash2 size={16} className="shrink-0" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TaskDetailHeader;
