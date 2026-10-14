import {
  FiCheckCircle,
  FiPause,
  FiPlay,
  FiRotateCcw,
} from "react-icons/fi";

const RADIUS = 86;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const FocusTimer = ({
  seconds,
  totalSeconds,
  isRunning,
  onStart,
  onPause,
  onReset,
}) => {
  const safeTotal = Math.max(1, Number(totalSeconds) || 1);
  const safeSeconds = Math.max(0, Number(seconds) || 0);

  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;

  const progress = Math.min(
    100,
    Math.max(0, ((safeTotal - safeSeconds) / safeTotal) * 100),
  );

  const isComplete = safeSeconds === 0;

  const status = isComplete
    ? "Session completed"
    : isRunning
      ? "Stay in the zone"
      : safeSeconds < safeTotal
        ? "Timer paused"
        : "Ready to focus";

  const progressColor = isComplete
    ? "text-emerald-500"
    : "text-violet-500";

  return (
    <section className="flex flex-col items-center">
      {/* Circular countdown */}
      <div
        className="relative aspect-square w-full max-w-70 sm:max-w-[320px]"
        role="timer"
        aria-label={`Time remaining: ${minutes} minutes and ${remainingSeconds} seconds`}
      >
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            className="text-slate-100 dark:text-slate-800"
          />

          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100}
            className={`${progressColor} transition-[stroke-dashoffset,color] duration-500 ease-linear`}
          />
        </svg>

        {/* Timer content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div
            className={`mb-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
              isComplete
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : isRunning
                  ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {isComplete ? (
              <FiCheckCircle size={14} aria-hidden="true" />
            ) : (
              <span
                className={`h-2 w-2 rounded-full ${
                  isRunning ? "animate-pulse bg-violet-500" : "bg-slate-400"
                }`}
                aria-hidden="true"
              />
            )}

            {status}
          </div>

          <p
            className="font-mono text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            aria-live="off"
          >
            {formattedTime}
          </p>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            {Math.round(progress)}% completed
          </p>
        </div>
      </div>

      {/* Timer controls */}
      <div className="mt-7 flex w-full max-w-xs items-center gap-3">
        <button
          type="button"
          onClick={isRunning ? onPause : onStart}
          disabled={isComplete}
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition duration-200 hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-900"
        >
          {isRunning ? (
            <>
              <FiPause size={18} aria-hidden="true" />
              Pause
            </>
          ) : isComplete ? (
            <>
              <FiCheckCircle size={18} aria-hidden="true" />
              Completed
            </>
          ) : (
            <>
              <FiPlay size={18} aria-hidden="true" />
              {safeSeconds < safeTotal ? "Resume" : "Start Focus"}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onReset}
          aria-label="Reset timer"
          title="Reset timer"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500/30 dark:hover:bg-violet-500/10 dark:hover:text-violet-400 dark:focus-visible:ring-offset-slate-900"
        >
          <FiRotateCcw size={18} aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 max-w-xs text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
        {isComplete
          ? "Great work! Reset the timer to start another session."
          : isRunning
            ? "One task at a time. Keep going!"
            : "Start when you're ready. You can pause or reset anytime."}
      </p>
    </section>
  );
};

export default FocusTimer;