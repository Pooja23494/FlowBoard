import { useDroppable } from "@dnd-kit/core";
import { FiMoreHorizontal } from "react-icons/fi";

import DraggableTask from "./DraggableTask";

const columnStyles = {
  todo: {
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  },
  "in-progress": {
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  review: {
    dot: "bg-orange-500",
    badge:
      "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  },
  done: {
    dot: "bg-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
};

const KanbanColumn = ({ column, tasks = [] }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const styles = columnStyles[column.id] ?? columnStyles.todo;

  return (
    <section className="flex min-w-0 flex-col">
      {/* Column Header */}
      <div className="mb-3 flex min-w-0 items-center justify-between gap-2 px-0.5">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${styles.dot}`}
            aria-hidden="true"
          />

          <h2 className="truncate text-sm font-bold text-slate-800 dark:text-slate-200">
            {column.title}
          </h2>

          <span
            className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${styles.badge}`}
            aria-label={`${tasks.length} tasks`}
          >
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          aria-label={`More options for ${column.title}`}
          title={`More options for ${column.title}`}
          className="
            flex h-8 w-8 shrink-0 items-center justify-center
            rounded-lg text-slate-400 transition-colors
            hover:bg-slate-200 hover:text-slate-700
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-violet-500
            dark:hover:bg-slate-800 dark:hover:text-slate-200
          "
        >
          <FiMoreHorizontal size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className={`
          flex min-h-80 min-w-0 flex-1 flex-col
          gap-3 rounded-xl border p-2.5
          transition-colors duration-200
          sm:min-h-100 sm:rounded-2xl sm:p-3
          lg:min-h-125
          ${
            isOver
              ? "border-violet-400 bg-violet-50/70 ring-2 ring-violet-200/60 dark:border-violet-500/60 dark:bg-violet-500/10 dark:ring-violet-500/10"
              : "border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-950/50"
          }
        `}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => <DraggableTask key={task.id} task={task} />)
        ) : (
          <div
            className={`
              flex min-h-36 flex-1 flex-col
              items-center justify-center
              rounded-xl border border-dashed
              px-3 py-6 text-center
              transition-colors duration-200
              ${
                isOver
                  ? "border-violet-400 bg-violet-100/60 dark:bg-violet-500/10"
                  : "border-slate-300 dark:border-slate-700"
              }
            `}
          >
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {isOver ? "Release to move task" : "No tasks yet"}
            </p>

            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
              {isOver ? "Drop the task in this column" : "Drop a task here"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default KanbanColumn;
