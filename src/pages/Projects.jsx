import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiFolderPlus,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";

import EmptyState from "../components/common/EmptyState";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectForm from "../components/projects/ProjectForm";

import {
  addProject,
  deleteProject,
} from "../redux/slices/projectSlice";

const Projects = () => {
  const dispatch = useDispatch();

  const projects = useSelector(
    (state) => state.projects.projects
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filteredProjects = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return projects.filter((project) => {
      const name = (project.name || "").toLowerCase();
      const description = (
        project.description || ""
      ).toLowerCase();

      const projectStatus = (project.status || "")
        .toLowerCase()
        .replace(/-/g, " ");

      const matchesSearch =
        name.includes(searchText) ||
        description.includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        projectStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const handleCreateProject = (project) => {
    dispatch(addProject(project));
    setShowForm(false);
  };

  const handleDeleteProject = (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmed) {
      dispatch(deleteProject(projectId));
    }
  };

  return (
    <main className="mx-auto w-full min-w-0 max-w-[1600px] space-y-6 sm:space-y-8">
      {/* Header */}
      <section
        className="
          flex min-w-0 flex-col gap-4
          sm:flex-row sm:items-center
          sm:justify-between
        "
      >
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Projects
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Manage and track all your projects in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="
            inline-flex w-full shrink-0 items-center
            justify-center gap-2 rounded-xl
            bg-violet-600 px-4 py-3
            text-sm font-semibold text-white
            shadow-sm transition
            hover:bg-violet-700
            focus:outline-none focus:ring-4
            focus:ring-violet-500/20
            sm:w-auto
          "
        >
          <FiFolderPlus size={18} />
          Create Project
        </button>
      </section>

      {/* Search and Filters */}
      <section
        className="
          flex min-w-0 flex-col gap-3
          sm:flex-row sm:items-center
        "
      >
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <FiSearch
            size={18}
            aria-hidden="true"
            className="
              pointer-events-none absolute left-3
              top-1/2 -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects..."
            aria-label="Search projects"
            className="
              w-full min-w-0 rounded-xl
              border border-slate-200 bg-white
              py-3 pl-10 pr-4 text-sm
              text-slate-900 outline-none
              transition
              placeholder:text-slate-400
              focus:border-violet-500
              focus:ring-4 focus:ring-violet-500/10
              dark:border-slate-800
              dark:bg-slate-900 dark:text-white
            "
          />
        </div>

        {/* Status Filter */}
        <div className="relative w-full shrink-0 sm:w-48">
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            aria-label="Filter projects by status"
            className="
              w-full appearance-none rounded-xl
              border border-slate-200 bg-white
              px-4 py-3 pr-10 text-sm font-medium
              text-slate-700 shadow-sm outline-none
              transition
              hover:border-violet-300
              focus:border-violet-500
              focus:ring-4 focus:ring-violet-500/10
              dark:border-slate-700
              dark:bg-slate-900 dark:text-slate-200
              dark:hover:border-violet-500/50
            "
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <FiChevronDown
            size={16}
            aria-hidden="true"
            className="
              pointer-events-none absolute right-4
              top-1/2 -translate-y-1/2
              text-slate-400
            "
          />
        </div>
      </section>

      {/* Results Summary */}
      <section className="flex flex-wrap items-center justify-between gap-2">
        <p
          className="text-sm text-slate-500 dark:text-slate-400"
          aria-live="polite"
        >
          Showing{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {filteredProjects.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {projects.length}
          </span>{" "}
          projects
        </p>

        {(search || statusFilter !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
            }}
            className="
              text-sm font-medium text-violet-600
              transition hover:text-violet-700
              dark:text-violet-400
              dark:hover:text-violet-300
            "
          >
            Clear filters
          </button>
        )}
      </section>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <section
          className="
            grid min-w-0 grid-cols-1 gap-4
            sm:gap-5
            md:grid-cols-2
            2xl:grid-cols-3
          "
          aria-label="Project list"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
        </section>
      ) : (
        <div className="min-w-0">
          <EmptyState
            icon={FiFolderPlus}
            title={
              projects.length === 0
                ? "No projects yet"
                : "No projects found"
            }
            description={
              projects.length === 0
                ? "Create your first project to start organizing your team's work."
                : "Try changing your search or status filter."
            }
            actionLabel={
              projects.length === 0
                ? "Create Project"
                : undefined
            }
            onAction={
              projects.length === 0
                ? () => setShowForm(true)
                : undefined
            }
          />
        </div>
      )}

      {/* Create Project Modal */}
      {showForm && (
        <ProjectForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </main>
  );
};

export default Projects;
