import { FiInbox, FiArrowRight } from "react-icons/fi";

const EmptyState = ({
  icon: Icon = FiInbox,
  title = "Nothing here yet",
  description = "Your items will appear here when they're available.",
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  children,
  className = "",
}) => {
  const showPrimaryAction = Boolean(actionLabel && onAction);
  const showSecondaryAction = Boolean(
    secondaryActionLabel && onSecondaryAction
  );

  return (
    <div
      className={`
        flex min-w-0 flex-col
        items-center justify-center
        rounded-2xl
        border border-dashed
        border-slate-300
        bg-white
        px-5 py-10
        text-center
        sm:px-8 sm:py-12
        dark:border-slate-700
        dark:bg-slate-900
        ${className}
      `}
    >
      {/* Icon */}
      <div
        className="
          flex h-14 w-14
          items-center justify-center
          rounded-2xl
          bg-violet-100
          text-violet-600
          ring-1 ring-inset ring-violet-200/70
          dark:bg-violet-500/10
          dark:text-violet-400
          dark:ring-violet-500/20
        "
        aria-hidden="true"
      >
        <Icon size={26} strokeWidth={1.8} />
      </div>

      {/* Heading */}
      <h3
        className="
          mt-5
          text-base font-semibold
          tracking-tight
          text-slate-900
          sm:text-lg
          dark:text-white
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          mt-2 max-w-sm
          text-sm leading-6
          text-slate-500
          dark:text-slate-400
        "
      >
        {description}
      </p>

      {/* Optional custom content */}
      {children && (
        <div className="mt-4 w-full max-w-md">
          {children}
        </div>
      )}

      {/* Actions */}
      {(showPrimaryAction || showSecondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {showPrimaryAction && (
            <button
              type="button"
              onClick={onAction}
              className="
                inline-flex min-h-10
                items-center justify-center gap-2
                rounded-xl
                bg-violet-600
                px-4 py-2.5
                text-sm font-semibold text-white
                shadow-sm
                transition-colors
                hover:bg-violet-700
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500
                focus-visible:ring-offset-2
                dark:focus-visible:ring-offset-slate-900
              "
            >
              {actionLabel}
              <FiArrowRight size={16} aria-hidden="true" />
            </button>
          )}

          {showSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="
                inline-flex min-h-10
                items-center justify-center
                rounded-xl
                border border-slate-200
                px-4 py-2.5
                text-sm font-semibold
                text-slate-700
                transition-colors
                hover:bg-slate-50
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-violet-500
                dark:border-slate-700
                dark:text-slate-300
                dark:hover:bg-slate-800
              "
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;