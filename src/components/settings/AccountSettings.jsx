import { useState } from "react";
import {
  FiLock,
  FiSave,
  FiShield,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const PASSWORD_FIELDS = [
  {
    name: "currentPassword",
    label: "Current Password",
    placeholder: "Enter your current password",
  },
  {
    name: "newPassword",
    label: "New Password",
    placeholder: "Enter your new password",
  },
  {
    name: "confirmPassword",
    label: "Confirm New Password",
    placeholder: "Re-enter your new password",
  },
];

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage({ type: "", text: "" });
  };

  const togglePasswordVisibility = (name) => {
    setVisiblePasswords((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.currentPassword.trim()) {
      setMessage({
        type: "error",
        text: "Please enter your current password.",
      });
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage({
        type: "error",
        text: "Your new password must be at least 8 characters long.",
      });
      return;
    }

    if (formData.newPassword === formData.currentPassword) {
      setMessage({
        type: "error",
        text: "Your new password must be different from your current password.",
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: "error",
        text: "New password and confirmation do not match.",
      });
      return;
    }

    // Demo only: connect this action to your authenticated backend API.
    setMessage({
      type: "success",
      text: "Form validation passed. Connect your backend to update the password.",
    });
  };

  const handleReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setVisiblePasswords({});
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="space-y-6">
      {/* Password Settings */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5 sm:px-6 dark:border-slate-800">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <FiLock size={20} aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Change Password
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Keep your account secure with a strong password.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {PASSWORD_FIELDS.map(({ name, label, placeholder }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {label}
              </label>

              <div className="relative">
                <input
                  id={name}
                  type={visiblePasswords[name] ? "text" : "password"}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  autoComplete={
                    name === "currentPassword"
                      ? "current-password"
                      : name === "newPassword"
                        ? "new-password"
                        : "new-password"
                  }
                  minLength={name === "currentPassword" ? undefined : 8}
                  required
                  className="
                    w-full rounded-xl border border-slate-200
                    bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900
                    outline-none transition
                    placeholder:text-slate-400
                    hover:border-slate-300
                    focus:border-violet-500 focus:bg-white
                    focus:ring-4 focus:ring-violet-500/10
                    dark:border-slate-700 dark:bg-slate-800
                    dark:text-white dark:placeholder:text-slate-500
                    dark:hover:border-slate-600
                    dark:focus:bg-slate-800
                  "
                />

                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(name)}
                  aria-label={
                    visiblePasswords[name]
                      ? `Hide ${label.toLowerCase()}`
                      : `Show ${label.toLowerCase()}`
                  }
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    rounded-lg p-2 text-slate-400 transition
                    hover:bg-slate-200 hover:text-slate-700
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-violet-500
                    dark:hover:bg-slate-700 dark:hover:text-white
                  "
                >
                  {visiblePasswords[name] ? (
                    <FiEyeOff size={17} aria-hidden="true" />
                  ) : (
                    <FiEye size={17} aria-hidden="true" />
                  )}
                </button>
              </div>

              {name === "newPassword" && (
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Use at least 8 characters. Avoid reusing your current password.
                </p>
              )}
            </div>
          ))}

          {/* Feedback */}
          {message.text && (
            <div
              role="status"
              aria-live="polite"
              className={`flex items-start gap-2.5 rounded-xl border p-3 text-sm ${
                message.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                  : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
              }`}
            >
              {message.type === "success" ? (
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

              <p>{message.text}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end dark:border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="
                rounded-xl border border-slate-200 px-5 py-3
                text-sm font-semibold text-slate-600 transition
                hover:bg-slate-50 hover:text-slate-900
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-violet-500
                dark:border-slate-700 dark:text-slate-300
                dark:hover:bg-slate-800 dark:hover:text-white
              "
            >
              Clear Fields
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                inline-flex items-center justify-center gap-2
                rounded-xl bg-violet-600 px-5 py-3
                text-sm font-semibold text-white shadow-sm
                shadow-violet-600/20 transition
                hover:bg-violet-700
                focus-visible:outline-none focus-visible:ring-4
                focus-visible:ring-violet-500/20
                disabled:cursor-not-allowed disabled:opacity-60
              "
            >
              <FiSave size={17} aria-hidden="true" />
              Update Password
            </button>
          </div>
        </form>
      </section>

      {/* Security Information */}
      <section className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-5 sm:p-6 dark:border-emerald-500/20 dark:bg-emerald-500/5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <FiShield size={20} aria-hidden="true" />
          </div>

          <div>
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-300">
              Account Security
            </h3>

            <p className="mt-1 text-sm leading-6 text-emerald-800/80 dark:text-emerald-400">
              Never share your password. Use a unique password for your
              account and sign out on shared devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountSettings;