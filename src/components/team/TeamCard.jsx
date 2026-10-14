import { useEffect, useRef, useState } from "react";
import {
  FiMail,
  FiMoreVertical,
  FiUsers,
  FiTrash2,
  FiCheckCircle,
  FiArrowUpRight,
} from "react-icons/fi";

const roleStyles = {
  Developer:
    "bg-violet-50 text-violet-700 ring-violet-600/10 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20",
  Designer:
    "bg-pink-50 text-pink-700 ring-pink-600/10 dark:bg-pink-500/10 dark:text-pink-300 dark:ring-pink-400/20",
  "Project Manager":
    "bg-blue-50 text-blue-700 ring-blue-600/10 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/20",
  "QA Engineer":
    "bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
};

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  return (
    parts
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "TM"
  );
};

const TeamCard = ({ member, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const name = member.name || "Team Member";
  const role = member.role || "Developer";
  const email = member.email || "No email provided";

  const totalTasks = Math.max(0, Number(member.tasks) || 0);
  const completedTasks = Math.max(
    0,
    Number(member.completedTasks) || 0,
  );

  const progress = Math.min(
    100,
    Math.max(0, Number(member.progress) || 0),
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleRemove = () => {
    setMenuOpen(false);
    onDelete?.(member.id);
  };

  return (
    <article className="group relative min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-slate-200/50 sm:p-5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-500/30 dark:hover:shadow-black/20">
      {/* Member Header */}
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-indigo-500 text-sm font-bold text-white shadow-md shadow-violet-500/20">
            {getInitials(name)}
          </div>

          <div className="min-w-0">
            <h3
              className="truncate text-sm font-bold text-slate-900 dark:text-white"
              title={name}
            >
              {name}
            </h3>

            <p
              className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400"
              title={member.department || "Team"}
            >
              {member.department || "Team"}
            </p>
          </div>
        </div>

        {/* Actions Menu */}
        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={`Actions for ${name}`}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-slate-500 transition hover:border-slate-200 hover:bg-slate-50 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <FiMoreVertical size={18} />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-11 z-20 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30"
            >
              <button
                type="button"
                role="menuitem"
                onClick={handleRemove}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <FiTrash2 size={15} />
                Remove member
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Role Badge */}
      <div className="mt-5">
        <span
          className={`inline-flex max-w-full items-center rounded-lg px-2.5 py-1.5 text-xs font-semibold ring-1 ring-inset ${
            roleStyles[role] ||
            "bg-slate-100 text-slate-700 ring-slate-600/10 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600/30"
          }`}
        >
          <span className="truncate">{role}</span>
        </span>
      </div>

      {/* Email */}
      <div className="mt-4 flex min-w-0 items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-3 dark:bg-slate-950/70">
        <FiMail size={15} className="shrink-0 text-slate-400" />
        <span
          className="truncate text-xs text-slate-600 dark:text-slate-300"
          title={email}
        >
          {email}
        </span>
      </div>

      {/* Task Statistics */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/60">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Total Tasks
          </p>

          <p className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {totalTasks}
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
            <FiCheckCircle size={12} />
            <span>{completedTasks} completed</span>
          </div>
        </div>

        <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex items-center justify-between gap-1">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Progress
            </p>

            <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
              {progress}%
            </span>
          </div>

          <p className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {progress === 100 ? "Done" : "Active"}
          </p>

          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
            role="progressbar"
            aria-label={`${name} task progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-linear-to-r from-violet-600 to-indigo-500 transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
            <FiUsers size={14} />
          </span>
          Team Member
        </div>

        <button
          type="button"
          onClick={handleRemove}
          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
          aria-label={`Remove ${name}`}
        >
          <FiTrash2 size={14} />
          Remove
          <FiArrowUpRight size={13} className="hidden sm:block" />
        </button>
      </div>
    </article>
  );
};

export default TeamCard;