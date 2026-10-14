import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiCheckSquare } from "react-icons/fi";

import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import TaskFilters from "../components/tasks/TaskFilters";
import EmptyState from "../components/common/EmptyState";

import { addTask, deleteTask, updateTask } from "../redux/slices/taskSlice";

const Tasks = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);
  const projects = useSelector((state) => state.projects.projects);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const title = (task.title || "").toLowerCase();
      const description = (task.description || "").toLowerCase();

      const matchesSearch =
        title.includes(searchText) || description.includes(searchText);

      const matchesStatus = status === "all" || task.status === status;

      const matchesPriority = priority === "all" || task.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, status, priority]);

  const handleSubmit = (taskData) => {
    if (editingTask) {
      dispatch(
        updateTask({
          ...editingTask,
          ...taskData,
        }),
      );
    } else {
      dispatch(addTask(taskData));
    }

    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (confirmed) {
      dispatch(deleteTask(taskId));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("all");
    setPriority("all");
  };

  const hasActiveFilters =
    search.trim() !== "" || status !== "all" || priority !== "all";

  return (
    <main className="w-full min-w-0 space-y-6 sm:space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Tasks
          </h1>

          <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400 sm:mt-2">
            Organize, prioritize, and track your work.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
          className="
            inline-flex min-h-11 w-full shrink-0
            items-center justify-center gap-2
            rounded-xl bg-violet-600 px-4 py-2.5
            text-sm font-semibold text-white
            shadow-sm transition-colors
            hover:bg-violet-700
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-violet-500
            focus-visible:ring-offset-2
            dark:focus-visible:ring-offset-slate-950
            sm:w-auto
          "
        >
          <FiPlus size={18} />
          New Task
        </button>
      </header>

      {/* Filters */}
      <section aria-label="Task filters" className="min-w-0">
        <TaskFilters
          search={search}
          status={status}
          priority={priority}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
          onReset={resetFilters}
        />
      </section>

      {/* Results Summary */}
      <section
        className="
          flex flex-wrap items-center justify-between gap-2
          border-b border-slate-200 pb-4
          dark:border-slate-800
        "
        aria-live="polite"
      >
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {filteredTasks.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900 dark:text-white">
            {tasks.length}
          </span>{" "}
          tasks
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="
              rounded-lg px-2 py-1 text-xs font-semibold
              text-blue-600 transition-colors
              hover:bg-blue-50
              dark:text-blue-400 dark:hover:bg-blue-500/10
            "
          >
            Clear filters
          </button>
        )}
      </section>

      {/* Task Grid */}
      {filteredTasks.length > 0 ? (
        <section
          aria-label="Task list"
          className="
            grid min-w-0 grid-cols-1 gap-4
            sm:gap-5
            md:grid-cols-2
            2xl:grid-cols-3
          "
        >
          {filteredTasks.map((task) => (
            <div key={task.id} className="min-w-0">
              <TaskCard
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </section>
      ) : (
        <section className="pt-2">
          <EmptyState
            icon={FiCheckSquare}
            title={tasks.length === 0 ? "No tasks yet" : "No tasks found"}
            description={
              tasks.length === 0
                ? "Create your first task to start organizing your work."
                : "Try changing your search, status, or priority filters."
            }
            actionLabel={
              tasks.length === 0
                ? "Create Task"
                : hasActiveFilters
                  ? "Clear Filters"
                  : undefined
            }
            onAction={
              tasks.length === 0
                ? () => {
                    setEditingTask(null);
                    setShowForm(true);
                  }
                : hasActiveFilters
                  ? resetFilters
                  : undefined
            }
          />
        </section>
      )}

      {/* Create / Edit Task Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          projects={projects}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
};

export default Tasks;
