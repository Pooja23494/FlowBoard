import { FiBell } from "react-icons/fi";

const NotificationIcon = ({ unreadCount = 0, onClick }) => {
  const count = Math.max(0, Number(unreadCount) || 0);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        count > 0 ? `Notifications, ${count} unread` : "Notifications"
      }
      title="Notifications"
      className="
        group relative flex h-10 w-10 shrink-0
        items-center justify-center rounded-xl
        border border-transparent
        text-slate-500
        transition-all duration-200
        hover:border-slate-200 hover:bg-slate-100
        hover:text-violet-600
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-violet-500
        focus-visible:ring-offset-2
        dark:text-slate-400
        dark:hover:border-slate-700
        dark:hover:bg-slate-800
        dark:hover:text-violet-400
        dark:focus-visible:ring-offset-slate-950
      "
    >
      <FiBell
        size={20}
        strokeWidth={1.8}
        className="transition-transform duration-200 group-hover:rotate-[-8deg]"
        aria-hidden="true"
      />

      {count > 0 && (
        <span
          aria-hidden="true"
          className="
            absolute -right-0.5 -top-0.5
            flex h-4.5 min-w-4.5
            items-center justify-center
            rounded-full border-2 border-white
            bg-rose-500 px-1
            text-[10px] font-bold leading-none text-white
            shadow-sm
            dark:border-slate-950
          "
        >
          {count > 9 ? "9+" : count}
        </span>
      )}

      {count > 0 && (
        <span className="sr-only">
          {count} unread {count === 1 ? "notification" : "notifications"}
        </span>
      )}
    </button>
  );
};

export default NotificationIcon;