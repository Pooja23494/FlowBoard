import {
  FiBell,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiFolder,
  FiUsers,
  FiX,
  FiInbox,
} from "react-icons/fi";

const getNotificationIcon = (type) => {
  switch (type) {
    case "task":
      return FiCheckCircle;
    case "project":
      return FiFolder;
    case "team":
      return FiUsers;
    default:
      return FiBell;
  }
};

const NotificationDropdown = ({
  notifications = [],
  onMarkRead,
  onMarkAllRead,
  onDelete,
  onViewAll,
}) => {
  const safeNotifications = Array.isArray(notifications)
    ? notifications
    : [];

  const unreadCount = safeNotifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <section
      role="region"
      aria-label="Notifications"
      className="absolute right-0 top-12 z-50 flex max-h-[min(80vh,36rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30"
    >
      {/* Header */}
      <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 dark:border-slate-800">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <FiBell size={20} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Notifications
              </h2>

              {unreadCount > 0 && (
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[11px] font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>

            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Stay updated with your workspace
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="shrink-0 rounded-lg px-2 py-2 text-xs font-semibold text-violet-600 transition hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-400 dark:hover:bg-violet-500/10"
        >
          Mark all read
        </button>
      </header>

      {/* Notification list */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {safeNotifications.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
              <FiInbox size={27} aria-hidden="true" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
              You're all caught up
            </h3>

            <p className="mt-1 max-w-55 text-xs leading-5 text-slate-500 dark:text-slate-400">
              New notifications will appear here when there's something to
              share.
            </p>
          </div>
        ) : (
          safeNotifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const isRead = Boolean(notification.read);

            return (
              <article
                key={notification.id}
                className={`group border-b border-slate-100 px-4 py-4 transition last:border-b-0 dark:border-slate-800 ${
                  isRead
                    ? "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/50"
                    : "bg-violet-50/60 hover:bg-violet-50 dark:bg-violet-500/5 dark:hover:bg-violet-500/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isRead
                        ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                        : "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <h3
                        className={`min-w-0 flex-1 wrap-break-word text-sm ${
                          isRead
                            ? "font-medium text-slate-700 dark:text-slate-300"
                            : "font-semibold text-slate-900 dark:text-white"
                        }`}
                      >
                        {notification.title || "Notification"}
                      </h3>

                      {!isRead && (
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-500"
                          aria-label="Unread"
                          title="Unread"
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => onDelete(notification.id)}
                        aria-label={`Delete ${notification.title || "notification"}`}
                        title="Delete notification"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                      >
                        <FiX size={16} aria-hidden="true" />
                      </button>
                    </div>

                    <p className="mt-1 wrap-break-word text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {notification.message || "No additional details."}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                        <FiClock size={12} aria-hidden="true" />
                        {notification.time || "Time unavailable"}
                      </span>

                      {!isRead && (
                        <button
                          type="button"
                          onClick={() => onMarkRead(notification.id)}
                          className="inline-flex min-h-7 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-violet-600 transition hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-violet-400 dark:hover:bg-violet-500/10"
                        >
                          <FiCheck size={13} aria-hidden="true" />
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={onViewAll}
          className="flex min-h-10 w-full items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-violet-600 transition hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-violet-400 dark:hover:bg-violet-500/10"
        >
          View all notifications
        </button>
      </footer>
    </section>
  );
};

export default NotificationDropdown;