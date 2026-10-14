import {
  FiRotateCcw,
  FiSearch,
  FiX,
  FiUsers,
  FiChevronDown,
} from "react-icons/fi";

const TeamFilters = ({
  search,
  role,
  onSearchChange,
  onRoleChange,
  onReset,
}) => {
  const hasFilters = search.trim() !== "" || role !== "all";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
      {/* Filter Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <FiUsers size={17} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Find team members
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Search by name or filter by role
            </p>
          </div>
        </div>

        {hasFilters && (
          <span className="mt-2 inline-flex w-fit items-center rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 sm:mt-0 dark:bg-violet-500/10 dark:text-violet-300">
            Filters active
          </span>
        )}
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
        {/* Search Input */}
        <div className="relative min-w-0">
          <FiSearch
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search by name or email..."
            aria-label="Search team members by name or email"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:hover:border-slate-600 dark:focus:border-violet-500 dark:focus:bg-slate-950"
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        {/* Role Filter */}
        <div className="relative min-w-0">
          <FiUsers
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={role}
            onChange={(event) =>
              onRoleChange(event.target.value)
            }
            aria-label="Filter team members by role"
            className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-slate-600 dark:focus:border-violet-500 dark:focus:bg-slate-950"
          >
            <option value="all">All Roles</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Project Manager">
              Project Manager
            </option>
            <option value="QA Engineer">QA Engineer</option>
          </select>

          <FiChevronDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          disabled={!hasFilters}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/10 dark:hover:text-violet-300 dark:disabled:hover:border-slate-700 dark:disabled:hover:bg-slate-900"
        >
          <FiRotateCcw
            size={15}
            className={hasFilters ? "transition-transform hover:-rotate-45" : ""}
          />
          Reset Filters
        </button>
      </div>
    </section>
  );
};

export default TeamFilters;