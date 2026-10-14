import { FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BoardHeader = ({ project }) => {
  const navigate = useNavigate();

  return (
    <header
      className="
        mb-5 flex min-w-0 flex-col gap-4
        sm:mb-6 sm:flex-row
        sm:items-center sm:justify-between
      "
    >
      {/* Project Information */}
      <div className="min-w-0 flex-1">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="
              text-sm font-medium text-slate-500
              transition hover:text-violet-600
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500
              focus-visible:ring-offset-2
              dark:text-slate-400
              dark:hover:text-violet-400
              dark:focus-visible:ring-offset-slate-900
            "
          >
            Projects
          </button>

          <span
            aria-hidden="true"
            className="text-slate-300 dark:text-slate-600"
          >
            /
          </span>

          <span
            aria-current="page"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Board
          </span>
        </nav>

        {/* Title */}
        <h1
          className="
            mt-3 wrap-break-word text-2xl font-bold
            tracking-tight text-slate-900
            sm:text-3xl dark:text-white
          "
        >
          {project?.name || "Task Board"}
        </h1>

        {/* Description */}
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Drag and drop tasks to update their status.
        </p>
      </div>

      {/* List View Button */}
      <button
        type="button"
        onClick={() => navigate("/tasks")}
        className="
          inline-flex w-full shrink-0
          items-center justify-center gap-2
          rounded-xl border border-slate-200
          bg-white px-4 py-3 text-sm
          font-semibold text-slate-700
          shadow-sm transition
          hover:border-violet-300
          hover:bg-violet-50 hover:text-violet-700
          focus-visible:outline-none
          focus-visible:ring-4
          focus-visible:ring-violet-500/20
          sm:w-auto sm:py-2.5
          dark:border-slate-700
          dark:bg-slate-900 dark:text-slate-300
          dark:hover:border-violet-500
          dark:hover:bg-violet-500/10
          dark:hover:text-violet-400
        "
      >
        <FiList size={17} aria-hidden="true" />
        List View
      </button>
    </header>
  );
};

export default BoardHeader;
