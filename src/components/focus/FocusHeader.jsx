import { FiTarget } from "react-icons/fi";

const FocusHeader = () => {
  return (
    <header className="mb-6 sm:mb-8">
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600 shadow-sm dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400 sm:h-14 sm:w-14">
          <FiTarget size={25} aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Focus Mode
          </h1>

          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
            Find your flow, minimize distractions, and make meaningful
            progress on your most important tasks.
          </p>
        </div>
      </div>
    </header>
  );
};

export default FocusHeader;