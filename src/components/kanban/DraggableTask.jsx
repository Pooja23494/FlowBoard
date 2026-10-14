import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { FiCalendar, FiFlag, FiMove, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const priorityStyles = {
  urgent:
    "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  high:
    "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  medium:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  low:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

const DraggableTask = ({ task }) => {
  const navigate = useNavigate();

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const priority = String(task.priority || "low").toLowerCase();
  const priorityClass = priorityStyles[priority] || priorityStyles.low;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };

  const openTask = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`
        group min-w-0 rounded-xl border
        border-slate-200 bg-white p-3
        shadow-sm transition-[border-color,box-shadow,opacity]
        hover:border-violet-300 hover:shadow-md
        sm:rounded-2xl sm:p-4
        dark:border-slate-700 dark:bg-slate-900
        dark:hover:border-violet-500/50
        ${isDragging ? "opacity-40 shadow-xl" : "opacity-100"}
      `}
    >
      {/* Title and actions */}
      <div className="flex min-w-0 items-start gap-2">
        <button
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          type="button"
          aria-label={`Drag task: ${task.title || "Untitled task"}`}
          title="Press and hold to drag"
          className="
            mt-0.5 flex h-8 w-8 shrink-0
            touch-none items-center justify-center
            rounded-lg text-slate-400
            cursor-grab active:cursor-grabbing
            hover:bg-violet-50 hover:text-violet-600
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-violet-500
            dark:text-slate-500
            dark:hover:bg-violet-500/10
            dark:hover:text-violet-400
          "
        >
          <FiMove size={18} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={openTask}
          className="
            min-w-0 flex-1 text-left
            rounded-md
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-violet-500
          "
          aria-label={`View task: ${task.title || "Untitled task"}`}
        >
          <span
            className="
              block wrap-break-word text-sm
              font-semibold leading-5
              text-slate-900
              dark:text-white
            "
          >
            {task.title || "Untitled Task"}
          </span>
        </button>

        <span
          className={`
            mt-0.5 shrink-0 rounded-md
            px-2 py-1 text-[9px]
            font-bold uppercase tracking-wide
            sm:rounded-lg sm:text-[10px]
            ${priorityClass}
          `}
        >
          {priority}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className="
            mt-2 line-clamp-2 wrap-break-word
            text-xs leading-5 text-slate-500
            dark:text-slate-400
          "
        >
          {task.description}
        </p>
      )}

      {/* Task metadata */}
      <div
        className="
          mt-3 space-y-2 border-t
          border-slate-100 pt-3
          sm:mt-4 sm:space-y-2.5
          dark:border-slate-800
        "
      >
        <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <FiUser size={14} className="shrink-0" aria-hidden="true" />
          <span className="min-w-0 truncate">
            {task.assignee || "Unassigned"}
          </span>
        </div>

        {task.dueDate && (
          <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <FiCalendar size={14} className="shrink-0" aria-hidden="true" />
            <span className="min-w-0 wrap-break-word">{task.dueDate}</span>
          </div>
        )}

        <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <FiFlag size={14} className="shrink-0" aria-hidden="true" />
          <span className="capitalize">{priority} priority</span>
        </div>
      </div>

      {/* Task details hint */}
      <button
        type="button"
        onClick={openTask}
        className="
          mt-3 w-full border-t border-slate-100
          pt-3 text-left text-xs font-medium
          text-violet-600 transition-colors
          hover:text-violet-700
          focus-visible:outline-none
          focus-visible:underline
          dark:border-slate-800
          dark:text-violet-400
          dark:hover:text-violet-300
        "
      >
        View task details →
      </button>
    </article>
  );
};

export default DraggableTask;