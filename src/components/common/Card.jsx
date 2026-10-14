const Card = ({
  children,
  className = "",
  padding = "md",
  hover = false,
  as: Component = "div",
  ...props
}) => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  const paddingClasses = paddings[padding] ?? paddings.md;

  return (
    <Component
      className={`
        min-w-0
        rounded-2xl
        border
        border-slate-200/80
        bg-white
        shadow-sm
        transition-all
        duration-200
        dark:border-slate-800
        dark:bg-slate-900
        ${paddingClasses}
        ${
          hover
            ? "hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md dark:hover:border-violet-500/30"
            : ""
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;