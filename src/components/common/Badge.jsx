const variants = {
  default:
    "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",

  primary:
    "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/20",

  success:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",

  warning:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",

  danger:
    "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20",

  info:
    "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20",

  purple:
    "bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:ring-purple-500/20",
};

const Badge = ({
  children,
  variant = "default",
  className = "",
}) => {
  const variantClasses = variants[variant] ?? variants.default;

  return (
    <span
      className={`
        inline-flex
        max-w-full
        items-center
        justify-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        leading-4
        ring-1
        ring-inset
        whitespace-nowrap
        transition-colors
        ${variantClasses}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;