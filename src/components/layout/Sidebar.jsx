import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiTarget,
  FiSettings,
  FiX,
  FiBell,
  FiChevronRight,
} from "react-icons/fi";

const menuItems = [
  { label: "Dashboard", path: "/", icon: FiHome },
  { label: "Projects", path: "/projects", icon: FiFolder },
  { label: "Tasks", path: "/tasks", icon: FiCheckSquare },
  { label: "Calendar", path: "/calendar", icon: FiCalendar },
  { label: "Team", path: "/team", icon: FiUsers },
  { label: "Analytics", path: "/analytics", icon: FiBarChart2 },
  { label: "Focus Mode", path: "/focus", icon: FiTarget },
  { label: "Notifications", path: "/notifications", icon: FiBell },
  { label: "Settings", path: "/settings", icon: FiSettings },
];

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[2px]
          transition-opacity duration-300 lg:hidden
          ${
            isOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        id="flowboard-sidebar"
        aria-label="Main navigation"
        aria-hidden={!isOpen && undefined}
        className={`
          fixed inset-y-0 left-0 z-50 flex h-dvh w-64
          flex-col border-r border-slate-200 bg-white
          shadow-xl shadow-slate-900/5
          transition-transform duration-300 ease-in-out
          dark:border-slate-800 dark:bg-slate-950
          lg:translate-x-0 lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-5 dark:border-slate-800">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="FlowBoard dashboard"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-violet-600/20">
              F
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                FlowBoard
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Work smarter
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Workspace navigation"
          className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-5"
        >
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
            Workspace
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) => `
                  group relative flex items-center gap-3
                  rounded-xl px-3 py-3 text-sm
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-violet-500
                  ${
                    isActive
                      ? "bg-violet-50 font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300"
                      : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-violet-600 dark:bg-violet-400"
                      />
                    )}

                    <Icon
                      size={19}
                      aria-hidden="true"
                      className={`shrink-0 transition-transform duration-200 ${
                        isActive
                          ? "text-violet-600 dark:text-violet-400"
                          : "group-hover:scale-105"
                      }`}
                    />

                    <span className="flex-1">{item.label}</span>

                    <FiChevronRight
                      size={15}
                      aria-hidden="true"
                      className={`transition-all duration-200 ${
                        isActive
                          ? "translate-x-0 opacity-100 text-violet-500"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Workspace Plan */}
        <div className="shrink-0 border-t border-slate-100 p-4 dark:border-slate-800">
          <div className="rounded-2xl border border-violet-100 bg-linear-to-br from-violet-50 to-indigo-50 p-4 dark:border-violet-500/15 dark:from-violet-500/10 dark:to-indigo-500/5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Current Plan
              </p>

              <span className="rounded-md bg-violet-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                Pro
              </span>
            </div>

            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
              Pro Workspace
            </p>

            <div
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
              role="progressbar"
              aria-label="Workspace usage"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={70}
            >
              <div className="h-full w-[70%] rounded-full bg-linear-to-r from-violet-600 to-indigo-500" />
            </div>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              70% workspace usage
            </p>
          </div>

          <p className="mt-4 text-center text-[11px] text-slate-400 dark:text-slate-600">
            © {new Date().getFullYear()} FlowBoard
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;