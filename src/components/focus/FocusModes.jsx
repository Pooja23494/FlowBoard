import { FiCoffee, FiTarget, FiZap } from "react-icons/fi";

const modes = [
  {
    id: "focus",
    label: "Focus",
    minutes: 25,
    icon: FiTarget,
    activeClass:
      "bg-violet-600 text-white shadow-md shadow-violet-500/20",
  },
  {
    id: "short",
    label: "Short Break",
    minutes: 5,
    icon: FiCoffee,
    activeClass:
      "bg-emerald-600 text-white shadow-md shadow-emerald-500/20",
  },
  {
    id: "long",
    label: "Long Break",
    minutes: 15,
    icon: FiZap,
    activeClass:
      "bg-sky-600 text-white shadow-md shadow-sky-500/20",
  },
];

const FocusModes = ({ mode, setMode, disabled = false }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Choose your session
        </h2>

        {disabled && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Pause timer to switch
          </span>
        )}
      </div>

      <div
        role="group"
        aria-label="Focus timer modes"
        className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-950/50"
      >
        {modes.map((item) => {
          const Icon = item.icon;
          const isActive = mode === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              disabled={disabled}
              aria-pressed={isActive}
              className={`flex min-w-0 flex-col items-center justify-center gap-2 rounded-xl px-2 py-3 text-center transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 sm:flex-row sm:gap-2 sm:px-3 ${
                isActive
                  ? item.activeClass
                  : "text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              } ${
                disabled
                  ? "cursor-not-allowed opacity-60"
                  : "active:scale-[0.98]"
              }`}
            >
              <Icon size={17} aria-hidden="true" />

              <span className="min-w-0">
                <span className="block text-xs font-semibold sm:text-sm">
                  {item.label}
                </span>
                <span
                  className={`mt-1 block text-[11px] ${
                    isActive
                      ? "text-white/80"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {item.minutes} minutes
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FocusModes;