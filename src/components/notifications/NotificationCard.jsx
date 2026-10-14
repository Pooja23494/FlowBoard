import {
  FiBell,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiFolder,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";

const notificationTypes = {
  task: {
    icon: FiCheckCircle,
    label: "Task",
    iconStyle:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  project: {
    icon: FiFolder,
    label: "Project",
    iconStyle:
      "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  },
  team: {
    icon: FiUsers,
    label: "Team",
    iconStyle:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  },
};

const NotificationCard = ({
  notification,
  onMarkRead,
  onDelete,
}) => {
  const type =
    notificationTypes[notification?.type] ?? {
      icon: FiBell,
      label: "General",
      iconStyle:
        "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    };

  const Icon = type.icon;
  const isRead = Boolean(notification?.read);

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border p-4 transition duration-200 hover:shadow-md sm:p-5 ${
        isRead
          ? "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
          : "border-violet-200 bg-violet-50/50 hover:border-violet-300 dark:border-violet-500/20 dark:bg-violet-500/5 dark:hover:border-violet-500/40"
      }`}
    >
      {!isRead && (
        <span
          className="absolute bottom-0 left-0 top-0 w-1 rounded-r-full bg-violet-500"
          aria-hidden="true"
        />
      )}

      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        {/* Notification icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${type.iconStyle}`}
        >
          <Icon size={20} aria-hidden="true" />
        </div>

        {/* Notification content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {type.label}
            </span>

            {!isRead && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-violet-500"
                  aria-hidden="true"
                />
                New
              </span>
            )}
          </div>

          <h3
            className={`mt-2 wrap-break-word text-sm sm:text-base ${
              isRead
                ? "font-medium text-slate-800 dark:text-slate-200"
                : "font-semibold text-slate-900 dark:text-white"
            }`}
          >
            {notification?.title || "Notification"}
          </h3>

          <p className="mt-1 wrap-break-word text-sm leading-6 text-slate-500 dark:text-slate-400">
            {notification?.message || "No additional details available."}
          </p>

          {/* Timestamp and actions */}
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200/70 pt-3 dark:border-slate-800 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
              <FiClock size={13} aria-hidden="true" />
              {notification?.time || "Time unavailable"}
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {!isRead && (
                <button
                  type="button"
                  onClick={() => onMarkRead(notification.id)}
                  aria-label={`Mark ${notification?.title || "notification"} as read`}
                  className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-violet-400 dark:hover:bg-violet-500/10"
                >
                  <FiCheck size={15} aria-hidden="true" />
                  Mark as read
                </button>
              )}

              <button
                type="button"
                onClick={() => onDelete(notification.id)}
                aria-label={`Delete ${notification?.title || "notification"}`}
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              >
                <FiTrash2 size={14} aria-hidden="true" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NotificationCard;