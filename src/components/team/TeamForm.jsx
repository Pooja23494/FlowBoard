import { useEffect, useState } from "react";
import {
  FiX,
  FiUser,
  FiMail,
  FiBriefcase,
  FiUsers,
  FiUserPlus,
} from "react-icons/fi";

const initialFormData = {
  name: "",
  email: "",
  role: "Developer",
  department: "Engineering",
};

const TeamForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    const normalizedEmail = formData.email.trim();

    if (!normalizedEmail) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
      });
    } catch (error) {
      setErrors({
        form: "Unable to add the team member. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `h-12 w-full rounded-xl border ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
        : "border-slate-200 focus:border-violet-500 focus:ring-violet-500/10 dark:border-slate-700"
    } bg-slate-50/70 px-4 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-4 dark:bg-slate-950/60 dark:text-white dark:focus:bg-slate-950`;

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-form-title"
        className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 dark:border-slate-800 dark:bg-slate-900"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/70 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
              <FiUserPlus size={21} />
            </div>

            <div className="min-w-0">
              <h2
                id="team-form-title"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                Add Team Member
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Enter the details to add someone to your team.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <FiX size={19} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 p-5 sm:p-6"
        >
          {/* Full Name */}
          <div>
            <label htmlFor="member-name" className={labelClass}>
              Full Name <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <FiUser
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="member-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Pooja Patel"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "member-name-error" : undefined}
                className={`${inputClass("name")} pl-10`}
              />
            </div>

            {errors.name && (
              <p
                id="member-name-error"
                role="alert"
                className="mt-1.5 text-xs text-red-500"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="member-email" className={labelClass}>
              Email Address <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <FiMail
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="member-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "member-email-error" : undefined
                }
                className={`${inputClass("email")} pl-10`}
              />
            </div>

            {errors.email && (
              <p
                id="member-email-error"
                role="alert"
                className="mt-1.5 text-xs text-red-500"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Role and Department */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor="member-role" className={labelClass}>
                Role
              </label>

              <div className="relative">
                <FiUsers
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  id="member-role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`${inputClass("role")} appearance-none pl-10 pr-2`}
                >
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="QA Engineer">QA Engineer</option>
                </select>
              </div>
            </div>

            <div className="min-w-0">
              <label htmlFor="member-department" className={labelClass}>
                Department
              </label>

              <div className="relative">
                <FiBriefcase
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  id="member-department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`${inputClass("department")} appearance-none pl-10 pr-2`}
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Management">Management</option>
                  <option value="Quality">Quality</option>
                </select>
              </div>
            </div>
          </div>

          {/* General Error */}
          {errors.form && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400"
            >
              {errors.form}
            </p>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Fields marked with <span className="text-red-500">*</span> are
            required.
          </p>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-500/10 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiUserPlus size={16} />
              {isSubmitting ? "Adding Member..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
