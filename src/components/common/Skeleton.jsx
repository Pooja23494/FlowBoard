const Skeleton = ({
  className = "",
  rounded = "lg",
  animation = true,
}) => {
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  return (
    <div
      aria-hidden="true"
      className={`
        min-w-0
        bg-slate-200
        dark:bg-slate-800
        ${animation ? "animate-pulse" : ""}
        ${roundedStyles[rounded] ?? roundedStyles.lg}
        ${className}
      `}
    />
  );
};

export const StatCardSkeleton = () => (
  <div
    aria-hidden="true"
    className="
      min-w-0 rounded-2xl
      border border-slate-200
      bg-white p-5
      dark:border-slate-800
      dark:bg-slate-900
    "
  >
    <div className="flex items-center justify-between gap-3">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-10 w-10 shrink-0" rounded="xl" />
    </div>

    <Skeleton className="mt-5 h-8 w-20" />
    <Skeleton className="mt-3 h-3 w-32 max-w-full" />
  </div>
);

export const ProjectCardSkeleton = () => (
  <div
    aria-hidden="true"
    className="
      min-w-0 rounded-2xl
      border border-slate-200
      bg-white p-5
      dark:border-slate-800
      dark:bg-slate-900
    "
  >
    <div className="flex items-start justify-between gap-3">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-8 w-8 shrink-0" rounded="lg" />
    </div>

    <Skeleton className="mt-4 h-3 w-full" />
    <Skeleton className="mt-2 h-3 w-3/4" />

    <div className="mt-6 flex items-center justify-between">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-12" />
    </div>

    <Skeleton className="mt-3 h-2 w-full" rounded="full" />

    <div className="mt-5 flex items-center justify-between gap-3">
      <Skeleton className="h-7 w-20" rounded="full" />
      <div className="flex -space-x-2">
        <Skeleton className="h-8 w-8 ring-2 ring-white dark:ring-slate-900" rounded="full" />
        <Skeleton className="h-8 w-8 ring-2 ring-white dark:ring-slate-900" rounded="full" />
        <Skeleton className="h-8 w-8 ring-2 ring-white dark:ring-slate-900" rounded="full" />
      </div>
    </div>
  </div>
);

export const TaskRowSkeleton = () => (
  <div
    aria-hidden="true"
    className="
      flex min-w-0 items-center gap-3
      border-b border-slate-100
      px-4 py-4 last:border-b-0
      dark:border-slate-800
      sm:gap-4 sm:px-5
    "
  >
    <Skeleton className="h-5 w-5 shrink-0" rounded="md" />

    <div className="min-w-0 flex-1">
      <Skeleton className="h-4 w-3/4 max-w-56" />
      <Skeleton className="mt-2 h-3 w-1/2 max-w-36" />
    </div>

    <Skeleton className="hidden h-7 w-20 sm:block" rounded="full" />
    <Skeleton className="hidden h-8 w-8 shrink-0 md:block" rounded="full" />
  </div>
);

export const ChartSkeleton = () => (
  <div
    aria-hidden="true"
    className="
      min-w-0 rounded-2xl
      border border-slate-200
      bg-white p-5 sm:p-6
      dark:border-slate-800
      dark:bg-slate-900
    "
  >
    <Skeleton className="h-5 w-36 max-w-full" />
    <Skeleton className="mt-2 h-3 w-52 max-w-full" />

    <div className="mt-8 flex h-40 items-end gap-3 sm:h-48 sm:gap-4">
      {["h-1/3", "h-2/3", "h-1/2", "h-full", "h-3/4", "h-2/5", "h-4/5"].map(
        (height, index) => (
          <Skeleton
            key={index}
            className={`flex-1 ${height}`}
            rounded="md"
          />
        )
      )}
    </div>

    <div className="mt-4 flex justify-between gap-2">
      {Array.from({ length: 5 }, (_, index) => (
        <Skeleton key={index} className="h-3 w-10 max-w-full" />
      ))}
    </div>
  </div>
);

export default Skeleton;