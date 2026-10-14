import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const ProjectForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    members: "1",
  });

  const [error, setError] = useState("");

  // Prevent background scrolling while the modal is open.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (name === "name" && value.trim()) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const members = Number(formData.members);

    if (!name) {
      setError("Project name is required.");
      return;
    }

    if (!Number.isInteger(members) || members < 1) {
      setError("Enter at least one team member.");
      return;
    }

    onSubmit({
      name,
      description: formData.description.trim(),
      progress: 0,
      tasks: 0,
      completedTasks: 0,
      members,
      status: "Planning",
    });

    // The parent component controls closing after submission.
  };

  const inputClasses = `
    w-full min-w-0 rounded-xl border border-slate-200
    bg-slate-50 px-4 py-3 text-sm text-slate-900
    outline-none transition
    placeholder:text-slate-400
    focus:border-violet-500 focus:ring-4
    focus:ring-violet-500/10
    dark:border-slate-700 dark:bg-slate-800
    dark:text-white dark:placeholder:text-slate-500
  `;

  const labelClasses = `
    mb-2 block text-sm font-medium
    text-slate-700 dark:text-slate-300
  `;

  return (
    <div
      className="
        fixed inset-0 z-60 flex items-center
        justify-center bg-black/50 p-3
        backdrop-blur-sm sm:p-5
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-form-title"
        className="
          flex max-h-[90dvh] w-full max-w-lg
          min-w-0 flex-col overflow-hidden
          rounded-2xl border border-slate-200
          bg-white shadow-2xl
          dark:border-slate-800 dark:bg-slate-900
        "
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex shrink-0 items-start justify-between
            gap-3 border-b border-slate-200
            p-4 sm:p-5
            dark:border-slate-800
          "
        >
          <div className="min-w-0">
            <h2
              id="project-form-title"
              className="text-lg font-semibold text-slate-900 sm:text-xl dark:text-white"
            >
              Create New Project
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
              Add a new project to your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close create project dialog"
            className="
              shrink-0 rounded-lg p-2
              text-slate-400 transition
              hover:bg-slate-100 hover:text-slate-700
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500
              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 space-y-5 overflow-y-auto p-4 sm:p-5"
        >
          {/* Project Name */}
          <div>
            <label htmlFor="name" className={labelClasses}>
              Project Name <span className="text-red-500">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. E-commerce Website"
              maxLength={100}
              autoFocus
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "project-name-error" : undefined}
              className={inputClasses}
            />

            {error && (
              <p
                id="project-name-error"
                role="alert"
                className="mt-2 text-xs font-medium text-red-500"
              >
                {error}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClasses}>
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              maxLength={500}
              placeholder="Describe your project..."
              className={`${inputClasses} resize-y`}
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {formData.description.length}/500
            </p>
          </div>

          {/* Team Members */}
          <div>
            <label htmlFor="members" className={labelClasses}>
              Team Members
            </label>

            <input
              id="members"
              name="members"
              type="number"
              min="1"
              step="1"
              value={formData.members}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          {/* Actions */}
          <div
            className="
              flex flex-col-reverse gap-3
              border-t border-slate-100 pt-4
              sm:flex-row sm:justify-end
              dark:border-slate-800
            "
          >
            <button
              type="button"
              onClick={onClose}
              className="
                w-full rounded-xl border
                border-slate-200 px-4 py-3
                text-sm font-medium text-slate-700
                transition hover:bg-slate-50
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500
                sm:w-auto sm:py-2.5
                dark:border-slate-700
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                w-full rounded-xl bg-violet-600
                px-5 py-3 text-sm font-semibold
                text-white shadow-sm transition
                hover:bg-violet-700
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-violet-500/20
                sm:w-auto sm:py-2.5
              "
            >
              Create Project
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProjectForm;