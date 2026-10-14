import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FiCalendar,
  FiFlag,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const priorityStyles = {
  urgent:
    "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  high:
    "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  medium:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  low:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

const DraggableTask = ({ task }) => {
  const navigate = useNavigate();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const priority = (task.priority || "low").toLowerCase();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { zIndex: 10 } : {}),
  };

  const openTask = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDoubleClick={openTask}
      title="Double-click to view task details"
      className={`
        group min-w-0 rounded-xl border
        border-slate-200 bg-white p-3
        shadow-sm transition-colors
        hover:border-violet-300 hover:shadow-md
        sm:rounded-2xl sm:p-4
        dark:border-slate-700 dark:bg-slate-900
        dark:hover:border-violet-500/50
        ${isDragging ? "z-10 opacity-40 shadow-xl" : "opacity-100"}
        cursor-grab active:cursor-grabbing
      `}
    >
      {/* Task Title and Priority */}
      <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
        <h3
          className="
            min-w-0 flex-1 wrap-break-word text-sm
            font-semibold leading-5 text-slate-900
            dark:text-white
          "
        >
          {task.title || "Untitled Task"}
        </h3>

        <span
          className={`
            shrink-0 rounded-md px-2 py-1
            text-[9px] font-bold uppercase tracking-wide
            sm:rounded-lg sm:text-[10px]
            ${priorityStyles[priority] || priorityStyles.low}
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

      {/* Task Metadata */}
      <div
        className="
          mt-3 space-y-2 border-t border-slate-100
          pt-3 sm:mt-4 sm:space-y-2.5
          dark:border-slate-800
        "
      >
        {/* Assignee */}
        <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <FiUser size={14} className="shrink-0" aria-hidden="true" />

          <span className="min-w-0 truncate">
            {task.assignee || "Unassigned"}
          </span>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <FiCalendar size={14} className="shrink-0" aria-hidden="true" />

            <span className="min-w-0 wrap-break-word">{task.dueDate}</span>
          </div>
        )}

        {/* Priority */}
        <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <FiFlag size={14} className="shrink-0" aria-hidden="true" />

          <span className="capitalize">{priority} priority</span>
        </div>
      </div>

      {/* Details Hint */}
      <div className="mt-3 border-t border-slate-100 pt-2 dark:border-slate-800">
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          Double-click to view details
        </p>
      </div>
    </article>
  );
};

export default DraggableTask;