import { useState } from "react";
import {
  FiArrowUpRight,
  FiMoreVertical,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const name = project.name || "Untitled Project";
  const progress = Math.min(
    100,
    Math.max(0, Number(project.progress) || 0)
  );

  const completedTasks = Number(project.completedTasks) || 0;
  const totalTasks = Number(project.tasks) || 0;
  const members = Number(project.members) || 0;

  const handleDelete = () => {
    setShowMenu(false);
    onDelete?.(project.id);
  };

  return (
    <article
      className="
        group flex min-w-0 flex-col rounded-2xl
        border border-slate-200 bg-white p-4
        shadow-sm transition duration-200
        hover:shadow-md sm:p-5
        lg:hover:-translate-y-1 lg:hover:shadow-lg
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="
            flex h-10 w-10 shrink-0 items-center
            justify-center rounded-xl bg-blue-50
            text-blue-600 sm:h-11 sm:w-11
            dark:bg-blue-500/10 dark:text-blue-400
          "
          aria-hidden="true"
        >
          <span className="text-lg font-bold">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <button
            type="button"
            aria-label={`Actions for ${name}`}
            aria-expanded={showMenu}
            onClick={() => setShowMenu((previous) => !previous)}
            className="
              rounded-lg p-2 text-slate-400
              transition hover:bg-slate-100
              hover:text-slate-600
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            "
          >
            <FiMoreVertical size={18} />
          </button>

          {showMenu && (
            <div
              className="
                absolute right-0 top-full z-20 mt-2
                w-44 rounded-xl border border-slate-200
                bg-white p-1 shadow-lg
                dark:border-slate-700 dark:bg-slate-900
              "
            >
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false);
                  navigate(`/projects/${project.id}/board`);
                }}
                className="
                  flex w-full items-center gap-2
                  rounded-lg px-3 py-2.5 text-left
                  text-sm text-slate-700
                  hover:bg-slate-100
                  dark:text-slate-200
                  dark:hover:bg-slate-800
                "
              >
                <FiArrowUpRight size={16} />
                Open project
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="
                  w-full rounded-lg px-3 py-2.5
                  text-left text-sm text-red-600
                  hover:bg-red-50
                  dark:text-red-400
                  dark:hover:bg-red-500/10
                "
              >
                Delete project
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="mt-4 min-w-0 sm:mt-5">
        <h3
          className="
            wrap-break-word text-base font-semibold
            text-slate-900 sm:text-lg
            dark:text-white
          "
          title={name}
        >
          {name}
        </h3>

        <p
          className="
            mt-1 min-h-10 wrap-break-word text-sm
            leading-5 text-slate-500
            line-clamp-2 dark:text-slate-400
          "
        >
          {project.description || "No description provided."}
        </p>
      </div>

      {/* Progress */}
      <div className="mt-5 sm:mt-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Progress
          </span>

          <span className="shrink-0 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {progress}%
          </span>
        </div>

        <div
          className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
          role="progressbar"
          aria-label={`${name} progress`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="
              h-full rounded-full bg-blue-600
              transition-[width] duration-500
              dark:bg-blue-500
            "
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Project Stats */}
      <div
        className="
          mt-5 flex flex-wrap items-center
          gap-x-4 gap-y-2 border-t
          border-slate-100 pt-4
          dark:border-slate-800
        "
      >
        <span className="text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {completedTasks}/{totalTasks}
          </span>{" "}
          tasks
        </span>

        <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <FiUsers size={14} aria-hidden="true" />
          <span>
            {members} {members === 1 ? "member" : "members"}
          </span>
        </span>
      </div>

      {/* Footer Action */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => navigate(`/projects/${project.id}/board`)}
          className="
            flex w-full items-center justify-center
            gap-2 rounded-xl bg-violet-600
            px-4 py-2.5 text-sm font-semibold
            text-white transition
            hover:bg-violet-700
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-violet-500/20
          "
        >
          Open Project
          <FiArrowUpRight size={16} />
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="
            mt-2 w-full rounded-xl border
            border-red-100 px-3 py-2.5
            text-sm font-medium text-red-600
            transition hover:bg-red-50
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-red-500
            dark:border-red-900/40
            dark:text-red-400
            dark:hover:bg-red-500/10
          "
        >
          Delete Project
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
