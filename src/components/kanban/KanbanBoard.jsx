import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateTaskStatus } from "../../redux/slices/taskSlice";
import KanbanColumn from "./KanbanColumn";

const columns = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "in-progress",
    title: "In Progress",
  },
  {
    id: "review",
    title: "Review",
  },
  {
    id: "done",
    title: "Done",
  },
];

const KanbanBoard = ({ tasks = [] }) => {
  const dispatch = useDispatch();
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
      },
    }),
  );

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  const handleDragStart = ({ active }) => {
    const task = tasks.find(
      (item) => String(item.id) === String(active.id),
    );

    setActiveTask(task || null);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveTask(null);

    if (!over) return;

    const draggedTask = tasks.find(
      (task) => String(task.id) === String(active.id),
    );

    if (!draggedTask) return;

    const targetColumn = columns.find(
      (column) => column.id === String(over.id),
    );

    const targetTask = tasks.find(
      (task) => String(task.id) === String(over.id),
    );

    const newStatus = targetColumn?.id || targetTask?.status;

    if (newStatus && newStatus !== draggedTask.status) {
      dispatch(
        updateTaskStatus({
          taskId: draggedTask.id,
          status: newStatus,
        }),
      );
    }
  };

  return (
    <section className="w-full min-w-0">
      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <div
          className="
            flex w-full min-w-0
            gap-3 overflow-x-auto overflow-y-hidden
            pb-4
            snap-x snap-proximity
            sm:gap-4 sm:pb-5
            lg:gap-5
          "
        >
          {columns.map((column) => (
            <div
              key={column.id}
              className="
                w-[82vw] min-w-65 max-w-85
                shrink-0 snap-start
                sm:w-75
                lg:w-77.5
                xl:w-[320px]
              "
            >
              <KanbanColumn
                column={column}
                tasks={getTasksByStatus(column.id)}
              />
            </div>
          ))}
        </div>

        {/* Drag preview */}
        <DragOverlay>
          {activeTask ? (
            <div
              className="
                w-[min(300px,80vw)]
                rotate-2 rounded-xl
                border border-violet-200
                bg-white p-4
                shadow-2xl shadow-violet-950/15
                dark:border-violet-500/40
                dark:bg-slate-900
              "
            >
              <h3 className="wrap-break-word text-sm font-semibold text-slate-900 dark:text-white">
                {activeTask.title || "Untitled task"}
              </h3>

              <p className="mt-2 truncate text-xs text-slate-500 dark:text-slate-400">
                {activeTask.assignee || "Unassigned"}
              </p>

              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
                {columns.find((column) => column.id === activeTask.status)
                  ?.title || activeTask.status}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
};

export default KanbanBoard;
