import { FiArrowUpRight, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProjectOverview = ({ projects = [] }) => {
  const navigate = useNavigate();

  return (
    <section
      className="
        h-full min-w-0 overflow-hidden
        rounded-2xl border border-slate-200
        bg-white shadow-sm
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Header */}
      <div
        className="
          flex flex-wrap items-center justify-between gap-3
          border-b border-slate-200 p-4
          sm:p-5
          dark:border-slate-800
        "
      >
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Project Overview
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Track your active projects
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="
            inline-flex shrink-0 items-center gap-1
            rounded-lg px-2 py-1.5
            text-xs font-medium text-blue-600
            transition hover:bg-blue-50 hover:text-blue-700
            sm:text-sm
            dark:text-blue-400 dark:hover:bg-blue-500/10
          "
        >
          View all
          <FiArrowUpRight size={15} />
        </button>
      </div>

      {/* Project List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {projects.length > 0 ? (
          projects.map((project) => {
            const progress = Math.min(
              100,
              Math.max(0, Number(project.progress) || 0)
            );

            return (
              <article
                key={project.id}
                className="
                  min-w-0 p-4 transition-colors
                  hover:bg-slate-50/70
                  sm:p-5
                  dark:hover:bg-slate-800/30
                "
              >
                {/* Project Name and Progress */}
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="wrap-break-word text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
                      {project.name}
                    </h3>

                    <p className="mt-1 wrap-break-word text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
                      {project.description || "No description available"}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    {progress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div
                  className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                  role="progressbar"
                  aria-label={`${project.name} progress`}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="
                      h-full rounded-full bg-blue-600
                      transition-[width] duration-500 ease-out
                    "
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Project Statistics */}
                <div
                  className="
                    mt-3 flex flex-wrap items-center
                    justify-between gap-x-3 gap-y-2
                    text-xs text-slate-500
                    dark:text-slate-400
                  "
                >
                  <span>{project.tasks ?? 0} tasks completed</span>

                  <span className="inline-flex items-center gap-1.5">
                    <FiUsers size={14} />
                    {project.members ?? 0} members
                  </span>
                </div>
              </article>
            );
          })
        ) : (
          /* Empty State */
          <div className="px-4 py-10 text-center sm:px-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <FiUsers size={21} />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
              No projects yet
            </h3>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Your projects will appear here when they're added.
            </p>

            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Explore projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectOverview;
