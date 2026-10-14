import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const AuthInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  error,
  autoComplete,
  required = true,
  disabled = false,
}) => {
  const hasError = Boolean(error);

  const inputType =
    type === "email" || type === "password" || type === "text"
      ? type
      : "text";

  const defaultAutoComplete =
    autoComplete ||
    (name === "email"
      ? "email"
      : name === "name"
        ? "name"
        : name === "confirmPassword"
          ? "new-password"
          : name === "password"
            ? "current-password"
            : undefined);

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={defaultAutoComplete}
          required={required}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={`
            h-12 w-full rounded-xl border bg-white px-4
            text-sm text-slate-900 outline-none
            transition-all duration-200
            placeholder:text-slate-400
            disabled:cursor-not-allowed disabled:opacity-60
            dark:bg-slate-900 dark:text-white
            ${
              hasError
                ? "border-red-400 pr-10 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-red-500"
                : "border-slate-200 hover:border-slate-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:hover:border-slate-600"
            }
          `}
        />

        {hasError && (
          <FiAlertCircle
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500"
          />
        )}
      </div>

      {hasError && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-red-500"
        >
          <FiAlertCircle
            size={14}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default AuthInput;