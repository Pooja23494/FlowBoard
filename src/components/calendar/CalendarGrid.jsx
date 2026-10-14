import { useMemo } from "react";
import { FiCheckCircle } from "react-icons/fi";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const priorityStyles = {
  urgent: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-amber-500",
  low: "bg-emerald-500",
};

const CalendarGrid = ({
  currentDate,
  tasks = [],
  selectedDate,
  onSelectDate,
}) => {
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, previousMonthDays - i),
        isCurrentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        date: new Date(year, month + 1, nextDay++),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  const tasksByDate = useMemo(() => {
    const grouped = {};

    tasks.forEach((task) => {
      if (!task?.dueDate) return;

      if (!grouped[task.dueDate]) {
        grouped[task.dueDate] = [];
      }

      grouped[task.dueDate].push(task);
    });

    return grouped;
  }, [tasks]);

  const todayKey = getDateKey(new Date());
  const selectedKey = selectedDate ? getDateKey(selectedDate) : null;

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Weekday headings */}
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/40">
        {weekDays.map((day) => (
          <div
            key={day}
            className="border-r border-slate-200 px-0.5 py-3 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500 last:border-r-0 sm:px-2 sm:text-xs dark:border-slate-800 dark:text-slate-400"
          >
            <span className="sm:hidden">{day.slice(0, 1)}</span>
            <span className="hidden sm:inline">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7">
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const dateKey = getDateKey(date);
          const dayTasks = tasksByDate[dateKey] || [];
          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedKey;

          return (
            <button
              key={`${dateKey}-${index}`}
              type="button"
              onClick={() => onSelectDate(date)}
              aria-pressed={isSelected}
              aria-label={`${date.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}, ${dayTasks.length} ${
                dayTasks.length === 1 ? "task" : "tasks"
              }`}
              className={`
                group relative min-w-0 min-h-16 border-b border-r border-slate-100
                p-1.5 text-left transition-colors
                hover:bg-violet-50/70 focus-visible:z-10
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset
                focus-visible:ring-violet-500
                sm:min-h-24 sm:p-2.5 lg:min-h-28
                dark:border-slate-800 dark:hover:bg-violet-500/5
                ${
                  !isCurrentMonth
                    ? "bg-slate-50/70 dark:bg-slate-950/40"
                    : "bg-white dark:bg-slate-900"
                }
                ${isSelected ? "bg-violet-50/80 ring-2 ring-inset ring-violet-500 dark:bg-violet-500/10" : ""}
              `}
            >
              {/* Date number */}
              <div className="mb-1.5 flex items-center justify-between gap-1 sm:mb-2">
                <span
                  className={`
                    flex h-6 w-6 shrink-0 items-center justify-center rounded-full
                    text-[11px] font-semibold transition sm:h-7 sm:w-7 sm:text-xs
                    ${
                      isToday
                        ? "bg-violet-600 text-white shadow-sm"
                        : isCurrentMonth
                          ? "text-slate-700 group-hover:text-violet-700 dark:text-slate-200 dark:group-hover:text-violet-300"
                          : "text-slate-300 dark:text-slate-600"
                    }
                  `}
                >
                  {date.getDate()}
                </span>

                {dayTasks.length > 0 && (
                  <span className="hidden text-[10px] font-medium text-slate-400 lg:inline">
                    {dayTasks.length}
                  </span>
                )}
              </div>

              {/* Task previews: desktop and tablet */}
              <div className="hidden space-y-1 sm:block">
                {dayTasks.slice(0, 2).map((task) => (
                  <div
                    key={task.id}
                    title={task.title || "Untitled task"}
                    className="flex min-w-0 items-center gap-1.5 rounded-md bg-violet-50 px-1.5 py-1 text-[10px] font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300 lg:text-[11px]"
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        priorityStyles[task.priority] || "bg-violet-500"
                      }`}
                    />
                    <span className="min-w-0 truncate">
                      {task.title || "Untitled task"}
                    </span>
                  </div>
                ))}

                {dayTasks.length > 2 && (
                  <p className="truncate px-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    +{dayTasks.length - 2} more
                  </p>
                )}
              </div>

              {/* Compact task indicators on mobile */}
              {dayTasks.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1 sm:hidden">
                  {dayTasks.slice(0, 3).map((task, taskIndex) => (
                    <span
                      key={task.id ?? taskIndex}
                      className={`h-1.5 w-1.5 rounded-full ${
                        priorityStyles[task.priority] || "bg-violet-500"
                      }`}
                    />
                  ))}

                  {dayTasks.length > 3 && (
                    <span className="text-[9px] leading-none text-slate-500 dark:text-slate-400">
                      +{dayTasks.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Selected date indicator */}
              {isSelected && (
                <span className="absolute bottom-1 right-1 hidden text-violet-600 sm:block dark:text-violet-400">
                  <FiCheckCircle size={12} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
