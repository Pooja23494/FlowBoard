import { FiCheckSquare, FiChevronDown, FiList } from "react-icons/fi";

const FocusTaskSelector = ({
  tasks = [],
  selectedTaskId = "",
  setSelectedTaskId,
}) => {
  const activeTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task.status !== "done")
    : [];

  const selectedTask = activeTasks.find(
    (task) => String(task.id) === String(selectedTaskId),
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <FiCheckSquare size={20} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Focus Task
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Choose what to work on
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {activeTasks.length} available
        </span>
      </div>

      {activeTasks.length > 0 ? (
        <>
          <label
            htmlFor="focus-task"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Select a task
          </label>

          <div className="relative">
            <select
              id="focus-task"
              value={selectedTaskId}
              onChange={(event) => setSelectedTaskId(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600"
            >
              <option value="">Choose a task to focus on</option>

              {activeTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title || "Untitled task"}
                </option>
              ))}
            </select>

            <FiChevronDown
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {selectedTask && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-violet-100 bg-violet-50/70 p-3 dark:border-violet-500/20 dark:bg-violet-500/5">
              <FiList
                size={17}
                className="mt-0.5 shrink-0 text-violet-600 dark:text-violet-400"
                aria-hidden="true"
              />

              <div className="min-w-0">
                <p className="text-xs font-medium text-violet-700 dark:text-violet-300">
                  Selected task
                </p>
                <p className="mt-1 wrap-break-word text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {selectedTask.title || "Untitled task"}
                </p>
              </div>
            </div>
          )}

          <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Pick one task to help keep your focus session organized.
          </p>
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center dark:border-slate-700">
          <FiCheckSquare
            size={24}
            className="mx-auto text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />
          <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            No active tasks
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Add a task or reopen an unfinished task to start focusing.
          </p>
        </div>
      )}
    </section>
  );
};

export default FocusTaskSelector;