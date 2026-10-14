import { useState } from "react";
import {
  FiMail,
  FiSave,
  FiBell,
  FiCheckCircle,
  FiAlertCircle,
  FiRotateCcw,
} from "react-icons/fi";

const DEFAULT_SETTINGS = {
  taskUpdates: true,
  deadlineReminders: true,
  projectUpdates: true,
  teamActivity: true,
  emailNotifications: false,
};

const OPTIONS = [
  {
    id: "taskUpdates",
    title: "Task Updates",
    description: "Get notified when tasks are created or updated.",
  },
  {
    id: "deadlineReminders",
    title: "Deadline Reminders",
    description: "Stay on top of upcoming deadlines and overdue tasks.",
  },
  {
    id: "projectUpdates",
    title: "Project Updates",
    description: "Receive updates about project progress and changes.",
  },
  {
    id: "teamActivity",
    title: "Team Activity",
    description: "Keep up with team activity and collaboration.",
  },
  {
    id: "emailNotifications",
    title: "Email Notifications",
    description: "Receive important updates in your email inbox.",
  },
];

const NotificationSettings = () => {
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS });
  const [savedSettings, setSavedSettings] = useState({
    ...DEFAULT_SETTINGS,
  });
  const [feedback, setFeedback] = useState("");

  const hasChanges = OPTIONS.some(
    ({ id }) => settings[id] !== savedSettings[id],
  );

  const enabledCount = OPTIONS.filter(
    ({ id }) => settings[id],
  ).length;

  const handleChange = (name) => {
    setSettings((current) => ({
      ...current,
      [name]: !current[name],
    }));

    setFeedback("");
  };

  const handleSave = () => {
    // Demo only: connect this to localStorage or your backend API.
    setSavedSettings({ ...settings });
    setFeedback("saved");
  };

  const handleReset = () => {
    setSettings({ ...DEFAULT_SETTINGS });
    setFeedback("");
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start gap-3 border-b border-slate-200 p-5 sm:p-6 dark:border-slate-800">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiMail size={20} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
            Notification Preferences
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Choose how and when FlowBoard keeps you informed.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/30 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <FiBell
              size={17}
              className="text-violet-600 dark:text-violet-400"
              aria-hidden="true"
            />

            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Notification options enabled
            </span>
          </div>

          <span className="rounded-lg bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
            {enabledCount} of {OPTIONS.length}
          </span>
        </div>

        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
          role="progressbar"
          aria-label="Enabled notification options"
          aria-valuemin={0}
          aria-valuemax={OPTIONS.length}
          aria-valuenow={enabledCount}
        >
          <div
            className="h-full rounded-full bg-violet-600 transition-all duration-300 dark:bg-violet-400"
            style={{
              width: `${(enabledCount / OPTIONS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Options */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {OPTIONS.map((option) => {
          const checked = settings[option.id];

          return (
            <div
              key={option.id}
              className="flex items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-slate-50/70 sm:px-6 dark:hover:bg-slate-800/30"
            >
              <div className="min-w-0 flex-1">
                <label
                  htmlFor={option.id}
                  className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100"
                >
                  {option.title}
                </label>

                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
                  {option.description}
                </p>
              </div>

              <button
                id={option.id}
                type="button"
                role="switch"
                aria-checked={checked}
                aria-label={option.title}
                onClick={() => handleChange(option.id)}
                className={`
                  relative inline-flex h-6 w-11 shrink-0 items-center
                  rounded-full transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-4
                  focus-visible:ring-violet-500/20
                  ${
                    checked
                      ? "bg-violet-600 dark:bg-violet-500"
                      : "bg-slate-300 dark:bg-slate-700"
                  }
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 rounded-full bg-white shadow-sm
                    transition-transform duration-200
                    ${checked ? "translate-x-6" : "translate-x-1"}
                  `}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback === "saved" && (
        <div
          role="status"
          aria-live="polite"
          className="mx-5 mt-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 sm:mx-6 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
        >
          <FiCheckCircle
            size={18}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <span>
            Preferences saved for this session. Connect persistent storage to
            retain them after refreshing.
          </span>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-slate-800">
        <button
          type="button"
          onClick={handleReset}
          disabled={
            OPTIONS.every(
              ({ id }) => settings[id] === DEFAULT_SETTINGS[id],
            ) && !feedback
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <FiRotateCcw size={16} aria-hidden="true" />
          Reset Defaults
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={!hasChanges}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiSave size={17} aria-hidden="true" />
          Save Preferences
        </button>
      </div>
    </section>
  );
};

export default NotificationSettings;