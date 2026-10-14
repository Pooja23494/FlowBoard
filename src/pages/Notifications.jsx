import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiBell,
  FiCheck,
  FiCheckCircle,
  FiFilter,
  FiInbox,
  FiMail,
} from "react-icons/fi";

import NotificationCard from "../components/notifications/NotificationCard";

import {
  deleteNotification,
  markAllAsRead,
  markAsRead,
} from "../redux/slices/notificationSlice";

const FILTERS = [
  { value: "all", label: "All notifications", shortLabel: "All" },
  { value: "unread", label: "Unread notifications", shortLabel: "Unread" },
  { value: "read", label: "Read notifications", shortLabel: "Read" },
];

const Notifications = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notifications?.notifications ?? [],
  );

  const [filter, setFilter] = useState("all");

  const safeNotifications = Array.isArray(notifications)
    ? notifications
    : [];

  const unreadCount = useMemo(
    () => safeNotifications.filter((item) => !item.read).length,
    [safeNotifications],
  );

  const readCount = safeNotifications.length - unreadCount;

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return safeNotifications.filter((item) => !item.read);
    }

    if (filter === "read") {
      return safeNotifications.filter((item) => item.read);
    }

    return safeNotifications;
  }, [safeNotifications, filter]);

  const emptyState = {
    all: {
      title: "No notifications yet",
      description:
        "You're all caught up. New updates will appear here when they're available.",
      icon: FiInbox,
    },
    unread: {
      title: "You're all caught up!",
      description:
        "There are no unread notifications. Great job staying on top of things.",
      icon: FiCheckCircle,
    },
    read: {
      title: "No read notifications",
      description:
        "Notifications you mark as read will appear here.",
      icon: FiMail,
    },
  }[filter];

  const EmptyIcon = emptyState.icon;

  return (
    <main className="min-w-0 space-y-6 sm:space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-violet-600 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400">
            <FiBell size={23} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Keep track of your latest updates and activity.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => dispatch(markAllAsRead())}
          disabled={unreadCount === 0}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500/30 dark:hover:bg-violet-500/10 dark:hover:text-violet-300 dark:focus-visible:ring-offset-slate-950"
        >
          <FiCheck size={17} aria-hidden="true" />
          Mark all as read
        </button>
      </header>

      {/* Summary cards */}
      <section
        aria-label="Notification summary"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <SummaryCard
          icon={FiBell}
          label="Total notifications"
          value={safeNotifications.length}
          color="violet"
        />
        <SummaryCard
          icon={FiMail}
          label="Unread"
          value={unreadCount}
          color="amber"
        />
        <SummaryCard
          icon={FiCheckCircle}
          label="Read"
          value={readCount}
          color="emerald"
        />
      </section>

      {/* Filters and list */}
      <section className="min-w-0">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <FiFilter size={17} aria-hidden="true" />
            <span>Activity feed</span>
          </div>

          <div
            role="group"
            aria-label="Filter notifications"
            className="grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900"
          >
            {FILTERS.map((item) => {
              const isActive = filter === item.value;
              const count =
                item.value === "all"
                  ? safeNotifications.length
                  : item.value === "unread"
                    ? unreadCount
                    : readCount;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  aria-pressed={isActive}
                  aria-label={`${item.label}: ${count}`}
                  className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                    isActive
                      ? "bg-white text-violet-700 shadow-sm dark:bg-slate-800 dark:text-violet-300"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  <span>{item.shortLabel}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs ${
                      isActive
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
                        : "bg-slate-200/70 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
              <EmptyIcon size={29} aria-hidden="true" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
              {emptyState.title}
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              {emptyState.description}
            </p>

            {filter !== "all" && safeNotifications.length > 0 && (
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="mt-5 rounded-xl px-4 py-2 text-sm font-semibold text-violet-600 transition hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-500/10"
              >
                View all notifications
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkRead={(id) => dispatch(markAsRead(id))}
                onDelete={(id) => dispatch(deleteNotification(id))}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

const SummaryCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    violet:
      "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colorClasses[color]}`}
        >
          <Icon size={20} aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Notifications;