import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";

const CalendarHeader = ({ currentDate, onPrevious, onNext, onToday }) => {
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
  });

  const year = currentDate.getFullYear();

  return (
    <header className="mb-4 flex min-w-0 flex-col gap-4 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
      {/* Month and year */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 sm:h-11 sm:w-11 dark:bg-violet-500/10 dark:text-violet-400">
          <FiCalendar size={20} />
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            {monthName} {year}
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            Manage your tasks and deadlines.
          </p>
        </div>
      </div>

      {/* Calendar navigation */}
      <div className="flex w-full items-center gap-2 sm:w-auto">
        <button
          type="button"
          onClick={onToday}
          className="inline-flex min-h-10 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 sm:flex-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
        >
          Today
        </button>

        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous month"
          title="Previous month"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
        >
          <FiChevronLeft size={19} />
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next month"
          title="Next month"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
        >
          <FiChevronRight size={19} />
        </button>
      </div>
    </header>
  );
};

export default CalendarHeader;
