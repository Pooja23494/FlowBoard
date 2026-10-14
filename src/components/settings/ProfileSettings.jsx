import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiSave,
  FiUser,
  FiMail,
  FiBriefcase,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import { updateProfile } from "../../redux/slices/authSlice";

const getInitials = (name = "") => {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("") || ""
  );
};

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [feedback, setFeedback] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setFeedback({ type: "", text: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const role = formData.role.trim();

    if (!name) {
      setFeedback({
        type: "error",
        text: "Please enter your full name.",
      });
      return;
    }

    if (!email) {
      setFeedback({
        type: "error",
        text: "Please enter your email address.",
      });
      return;
    }

    try {
      dispatch(
        updateProfile({
          name,
          email,
          role,
        }),
      );

      setFormData({ name, email, role });

      setFeedback({
        type: "success",
        text: "Profile update submitted successfully.",
      });
    } catch {
      setFeedback({
        type: "error",
        text: "Unable to update your profile. Please try again.",
      });
    }
  };

  const inputClass = `
    w-full rounded-xl border border-slate-200
    bg-slate-50 px-4 py-3 text-sm text-slate-900
    outline-none transition
    placeholder:text-slate-400
    hover:border-slate-300
    focus:border-violet-500 focus:bg-white
    focus:ring-4 focus:ring-violet-500/10
    dark:border-slate-700 dark:bg-slate-800
    dark:text-white dark:placeholder:text-slate-500
    dark:hover:border-slate-600
    dark:focus:bg-slate-800
  `;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start gap-3 border-b border-slate-200 p-5 sm:p-6 dark:border-slate-800">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiUser size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Profile Settings
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Manage your personal information and how your team sees you.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6">
        {/* Profile Summary */}
        <div className="mb-8 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 text-xl font-bold text-white shadow-md shadow-violet-500/20">
            {getInitials(formData.name) || (
              <FiUser size={26} aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900 dark:text-white">
              {formData.name || "Your Name"}
            </h3>

            <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
              {formData.email || "Your email address"}
            </p>

            <span className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-lg bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
              <FiBriefcase size={12} aria-hidden="true" />
              <span className="truncate">{formData.role || "Team Member"}</span>
            </span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Personal Information
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Keep your profile details accurate and up to date.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Full Name <span className="text-rose-500">*</span>
            </label>

            <div className="relative">
              <FiUser
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />

              <input
                id="profile-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                maxLength={100}
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="profile-email"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email Address <span className="text-rose-500">*</span>
            </label>

            <div className="relative">
              <FiMail
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />

              <input
                id="profile-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                maxLength={254}
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="profile-role"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Job Role
            </label>

            <div className="relative">
              <FiBriefcase
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />

              <input
                id="profile-role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                maxLength={100}
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback.text && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-5 flex items-start gap-2.5 rounded-xl border p-3 text-sm ${
              feedback.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
            }`}
          >
            {feedback.type === "success" ? (
              <FiCheckCircle
                size={18}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
            ) : (
              <FiAlertCircle
                size={18}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
            )}

            <span>{feedback.text}</span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: user?.name || "",
                email: user?.email || "",
                role: user?.role || "",
              });

              setFeedback({ type: "", text: "" });
            }}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/20"
          >
            <FiSave size={17} aria-hidden="true" />
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfileSettings;