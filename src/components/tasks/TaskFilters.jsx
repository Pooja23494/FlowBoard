import { FiSearch, FiX } from "react-icons/fi";

const TaskFilters = ({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onReset,
}) => {
  const hasFilters =
    search.trim() !== "" ||
    status !== "all" ||
    priority !== "all";

  const selectStyles = `
    min-w-0 w-full appearance-none
    rounded-xl border border-slate-200
    bg-white px-3 py-3 text-sm
    text-slate-700 outline-none
    transition-colors
    hover:border-slate-300
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
    dark:border-slate-800 dark:bg-slate-900
    dark:text-slate-300 dark:hover:border-slate-700
    sm:px-4
  `;

  return (
    <section
      aria-label="Filter tasks"
      className="w-full min-w-0"
    >
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <FiSearch
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks by title or description"
            className="
              min-h-11 w-full rounded-xl
              border border-slate-200 bg-white
              py-3 pl-10 pr-10 text-sm
              text-slate-900 outline-none
              transition-colors
              placeholder:text-slate-400
              focus:border-blue-500
              focus:ring-2 focus:ring-blue-500/20
              dark:border-slate-800 dark:bg-slate-900
              dark:text-white dark:placeholder:text-slate-500
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              title="Clear search"
              className="
                absolute right-2 top-1/2
                flex h-8 w-8 -translate-y-1/2
                items-center justify-center rounded-lg
                text-slate-400 transition-colors
                hover:bg-slate-100 hover:text-slate-700
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-blue-500
                dark:hover:bg-slate-800 dark:hover:text-white
              "
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        {/* Status and Priority */}
        <div className="grid grid-cols-2 gap-3 lg:flex lg:shrink-0">
          <div className="min-w-0 lg:w-40">
            <label htmlFor="task-status-filter" className="sr-only">
              Filter by status
            </label>

            <select
              id="task-status-filter"
              value={status}
              onChange={(event) => onStatusChange(event.target.value)}
              className={selectStyles}
            >
              <option value="all">All Status</option>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="min-w-0 lg:w-40">
            <label htmlFor="task-priority-filter" className="sr-only">
              Filter by priority
            </label>

            <select
              id="task-priority-filter"
              value={priority}
              onChange={(event) => onPriorityChange(event.target.value)}
              className={selectStyles}
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Reset */}
        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="
              inline-flex min-h-11 w-full shrink-0
              items-center justify-center gap-2
              rounded-xl border border-slate-200
              px-4 py-2.5 text-sm font-medium
              text-slate-600 transition-colors
              hover:bg-slate-50 hover:text-slate-900
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-blue-500
              dark:border-slate-800 dark:text-slate-300
              dark:hover:bg-slate-800 dark:hover:text-white
              sm:w-auto
            "
          >
            <FiX size={16} />
            Reset filters
          </button>
        )}
      </div>
    </section>
  );
};

export default TaskFilters;