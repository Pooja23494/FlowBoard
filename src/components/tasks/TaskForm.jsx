import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const createEmptyTask = (projects = []) => ({
  title: "",
  description: "",
  projectId: projects.length ? projects[0].id : "",
  assignee: "Pooja Patel",
  status: "todo",
  priority: "medium",
  dueDate: "",
});

const fieldStyles = `
  min-h-11 w-full min-w-0 rounded-xl
  border border-slate-200 bg-slate-50
  px-3 py-2.5 text-sm text-slate-900
  outline-none transition-colors
  placeholder:text-slate-400
  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15
  dark:border-slate-700 dark:bg-slate-800
  dark:text-white dark:placeholder:text-slate-500
`;

const labelStyles =
  "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

const TaskForm = ({ task, projects = [], onClose, onSubmit }) => {
  const [formData, setFormData] = useState(() => createEmptyTask(projects));
  const [error, setError] = useState("");

  const isEditing = Boolean(task);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        projectId: task.projectId ?? "",
        assignee: task.assignee || "Pooja Patel",
        status: task.status || "todo",
        priority: task.priority || "medium",
        dueDate: task.dueDate || "",
      });
    } else {
      setFormData(createEmptyTask(projects));
    }

    setError("");
  }, [task, projects]);

  // Prevent the page behind the modal from scrolling.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "projectId" && value !== "" ? Number(value) : value,
    }));

    if (name === "title" && value.trim()) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = formData.title.trim();

    if (!title) {
      setError("Please enter a task title.");
      return;
    }

    onSubmit({
      ...formData,
      title,
      projectId: formData.projectId === "" ? "" : Number(formData.projectId),
    });

    // The parent component controls closing the modal.
  };

  return (
    <div
      className="
        fixed inset-0 z-60 flex items-center
        justify-center overflow-y-auto
        bg-slate-950/60 p-3 backdrop-blur-sm
        sm:p-5
      "
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        className="
          my-auto flex max-h-[calc(100dvh-1.5rem)]
          w-full max-w-2xl min-w-0 flex-col
          overflow-hidden rounded-2xl
          border border-slate-200 bg-white shadow-2xl
          sm:max-h-[90dvh]
          dark:border-slate-800 dark:bg-slate-900
        "
      >
        {/* Header */}
        <header
          className="
            flex shrink-0 items-center justify-between gap-3
            border-b border-slate-200 px-4 py-4
            sm:px-6 sm:py-5
            dark:border-slate-800
          "
        >
          <div className="min-w-0">
            <h2
              id="task-form-title"
              className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl"
            >
              {isEditing ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
              {isEditing
                ? "Update your task information."
                : "Add a new task to your workspace."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task form"
            className="
              flex h-10 w-10 shrink-0 items-center
              justify-center rounded-xl text-slate-400
              transition-colors hover:bg-slate-100
              hover:text-slate-700
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-blue-500
              dark:hover:bg-slate-800 dark:hover:text-white
            "
          >
            <FiX size={20} />
          </button>
        </header>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
            {/* Title */}
            <div>
              <label htmlFor="task-title" className={labelStyles}>
                Task Title <span className="text-red-500">*</span>
              </label>

              <input
                id="task-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Design login page"
                required
                autoFocus
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "task-title-error" : undefined}
                className={`${fieldStyles} ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                    : ""
                }`}
              />

              {error && (
                <p
                  id="task-title-error"
                  role="alert"
                  className="mt-2 text-xs font-medium text-red-500"
                >
                  {error}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="task-description" className={labelStyles}>
                Description
              </label>

              <textarea
                id="task-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the task..."
                className={`${fieldStyles} min-h-24 resize-y`}
              />
            </div>

            {/* Project and Assignee */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="projectId" className={labelStyles}>
                  Project
                </label>

                <select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className={fieldStyles}
                >
                  {projects.length === 0 && (
                    <option value="">No projects available</option>
                  )}

                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="min-w-0">
                <label htmlFor="assignee" className={labelStyles}>
                  Assignee
                </label>

                <select
                  id="assignee"
                  name="assignee"
                  value={formData.assignee}
                  onChange={handleChange}
                  className={fieldStyles}
                >
                  <option value="Pooja Patel">Pooja Patel</option>
                  <option value="Rahul Shah">Rahul Shah</option>
                  <option value="Neha Mehta">Neha Mehta</option>
                </select>
              </div>
            </div>

            {/* Status, Priority and Due Date */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="min-w-0">
                <label htmlFor="status" className={labelStyles}>
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={fieldStyles}
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div className="min-w-0">
                <label htmlFor="priority" className={labelStyles}>
                  Priority
                </label>

                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={fieldStyles}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="min-w-0">
                <label htmlFor="dueDate" className={labelStyles}>
                  Due Date
                </label>

                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={fieldStyles}
                />
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <footer
            className="
              sticky bottom-0 flex flex-col-reverse gap-3
              border-t border-slate-200 bg-white
              px-4 py-4 sm:flex-row sm:justify-end sm:px-6
              dark:border-slate-800 dark:bg-slate-900
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                inline-flex min-h-11 items-center justify-center
                rounded-xl border border-slate-200
                bg-white px-5 py-2.5 text-sm font-semibold
                text-slate-700 transition-colors
                hover:bg-slate-50
                dark:border-slate-700 dark:bg-slate-800
                dark:text-slate-200 dark:hover:bg-slate-700
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                inline-flex min-h-11 items-center justify-center
                rounded-xl bg-violet-600 px-5 py-2.5
                text-sm font-semibold text-white
                shadow-sm transition-colors
                hover:bg-violet-700
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-violet-500
                focus-visible:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              {isEditing ? "Save Changes" : "Create Task"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
};

export default TaskForm;
