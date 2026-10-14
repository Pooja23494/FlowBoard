import {
  FiBell,
  FiLock,
  FiMoon,
  FiUser,
  FiChevronRight,
} from "react-icons/fi";

const ITEMS = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal information",
    icon: FiUser,
  },
  {
    id: "account",
    label: "Account",
    description: "Security and account",
    icon: FiLock,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme preferences",
    icon: FiMoon,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Notification preferences",
    icon: FiBell,
  },
];

const SettingsSidebar = ({ activeTab, onTabChange, setActiveTab }) => {
  // Supports both prop names for compatibility.
  const handleTabChange = onTabChange ?? setActiveTab;

  return (
    <nav
      aria-label="Settings navigation"
      className="
        rounded-2xl border border-slate-200 bg-white p-2 shadow-sm
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      <div className="px-3 pb-3 pt-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Preferences
        </p>
      </div>

      <div className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabChange?.(item.id)}
              aria-current={active ? "page" : undefined}
              aria-pressed={active}
              className={`
                group flex min-w-37.5 flex-1 items-center gap-3
                rounded-xl border border-transparent p-3 text-left
                transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-violet-500
                lg:min-w-0 lg:flex-none
                ${
                  active
                    ? "border-violet-100 bg-violet-50 text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                }
              `}
            >
              <span
                className={`
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl transition-colors duration-200
                  ${
                    active
                      ? "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"
                      : "bg-slate-100 text-slate-500 group-hover:bg-white dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-slate-700"
                  }
                `}
              >
                <Icon size={18} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">
                  {item.label}
                </span>

                <span
                  className={`
                    mt-1 block text-xs leading-4
                    ${
                      active
                        ? "text-violet-600/80 dark:text-violet-300/80"
                        : "text-slate-400 dark:text-slate-500"
                    }
                  `}
                >
                  {item.description}
                </span>
              </span>

              <FiChevronRight
                size={16}
                aria-hidden="true"
                className={`
                  hidden shrink-0 transition-transform lg:block
                  ${
                    active
                      ? "translate-x-0 text-violet-500"
                      : "-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 dark:text-slate-600"
                  }
                `}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SettingsSidebar;