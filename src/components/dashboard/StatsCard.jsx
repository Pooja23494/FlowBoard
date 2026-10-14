import {
  FiBarChart2,
  FiCheckCircle,
  FiClipboard,
  FiFolder,
} from "react-icons/fi";

const StatsCard = ({ title, value, change, description, icon }) => {
  const icons = {
    projects: FiFolder,
    tasks: FiClipboard,
    completed: FiCheckCircle,
    productivity: FiBarChart2,
  };

  const Icon = icons[icon] || FiBarChart2;

  return (
    <div
      className="
        min-w-0 rounded-2xl border border-slate-200
        bg-white p-4 shadow-sm
        transition duration-200
        hover:-translate-y-0.5 hover:shadow-md
        sm:p-5
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Card Header */}
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className="
              truncate text-xs font-medium text-slate-500
              sm:text-sm dark:text-slate-400
            "
            title={title}
          >
            {title}
          </p>

          <h2
            className="
              mt-2 wrap-break-word text-2xl font-bold
              tracking-tight text-slate-900
              sm:text-3xl dark:text-white
            "
          >
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl bg-blue-50 text-blue-600
            sm:h-11 sm:w-11
            dark:bg-blue-500/10 dark:text-blue-400
          "
        >
          <Icon size={20} className="sm:hidden" />
          <Icon size={22} className="hidden sm:block" />
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
        {change && (
          <span className="shrink-0 text-xs font-semibold text-emerald-600 sm:text-sm dark:text-emerald-400">
            {change}
          </span>
        )}

        {description && (
          <span
            className="
              min-w-0 text-xs leading-5 text-slate-500
              sm:text-sm dark:text-slate-400
            "
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

