import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiAlertCircle, FiLayers } from "react-icons/fi";

import BoardHeader from "../components/kanban/BoardHeader";
import KanbanBoard from "../components/kanban/KanbanBoard";

const Kanban = () => {
  const { projectId } = useParams();

  const projects = useSelector(
    (state) => state.projects?.projects ?? [],
  );

  const tasks = useSelector(
    (state) => state.tasks?.tasks ?? [],
  );

  const hasProjectId = projectId !== undefined && projectId !== "";

  const project = useMemo(() => {
    if (!hasProjectId || !Array.isArray(projects)) return null;

    return (
      projects.find(
        (item) => String(item.id) === String(projectId),
      ) ?? null
    );
  }, [projects, projectId, hasProjectId]);

  const projectTasks = useMemo(() => {
    if (!Array.isArray(tasks)) return [];

    // No project ID means show the complete Kanban board.
    if (!hasProjectId) return tasks;

    // An invalid project ID should not show unrelated tasks.
    if (!project) return [];

    return tasks.filter(
      (task) => String(task.projectId) === String(project.id),
    );
  }, [tasks, project, hasProjectId]);

  return (
    <main className="min-w-0 space-y-6">
      <BoardHeader project={project} />

      {hasProjectId && !project ? (
        <section className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <FiAlertCircle size={26} aria-hidden="true" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            Project not found
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
            This project may have been deleted or the link may be
            incorrect. Open a project from your project list to view
            its Kanban board.
          </p>
        </section>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                <FiLayers size={18} aria-hidden="true" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {project ? "Project Board" : "All Tasks Board"}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Organize work by status and track progress.
                </p>
              </div>
            </div>

            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              {projectTasks.length}{" "}
              {projectTasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          <div className="min-w-0">
            <KanbanBoard tasks={projectTasks} />
          </div>
        </>
      )}
    </main>
  );
};

export default Kanban;