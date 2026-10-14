import { FiBarChart2, FiCheck } from "react-icons/fi";

const AnalyticsHeader = ({ range, setRange }) => {
  const ranges = ["All Time", "This Month", "This Week"];

  return (
    <header className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Page heading */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400">
          <FiBarChart2 size={24} />
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Analytics
          </h1>

          <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
            Track your team's productivity and project performance.
          </p>
        </div>
      </div>

      {/* Date range selector */}
      <div
        className="grid w-full grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-800 dark:bg-slate-900 sm:w-fit"
        role="group"
        aria-label="Filter analytics by date range"
      >
        {ranges.map((item) => {
          const isActive = range === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              aria-pressed={isActive}
              className={`flex min-h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 sm:px-4 sm:text-sm ${
                isActive
                  ? "bg-white text-violet-700 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800 dark:text-violet-300 dark:ring-slate-700"
                  : "text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
              }`}
            >
              {isActive && <FiCheck size={14} aria-hidden="true" />}
              {item}
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default AnalyticsHeader;