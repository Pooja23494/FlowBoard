import { useMemo, useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { useSelector } from "react-redux";

import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarGrid from "../components/calendar/CalendarGrid";
import CalendarTaskList from "../components/calendar/CalendarTaskList";

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Calendar = () => {
  const tasks = useSelector((state) => state.tasks.tasks || []);

  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const selectedTasks = useMemo(() => {
    if (!selectedDate) return [];

    const selectedKey = getDateKey(selectedDate);

    return tasks.filter((task) => task?.dueDate === selectedKey);
  }, [tasks, selectedDate]);

  const todayTasks = useMemo(() => {
    const todayKey = getDateKey(new Date());

    return tasks.filter((task) => task?.dueDate === todayKey);
  }, [tasks]);

  const handlePrevious = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  };

  const handleNext = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  };

  const handleToday = () => {
    const today = new Date();

    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <main className="min-w-0 space-y-5 pb-6 sm:space-y-6">
      {/* Page heading */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <FiCalendar size={21} />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
              Calendar
            </h1>
            <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
              Plan your schedule and keep track of task deadlines.
            </p>
          </div>
        </div>

        {/* Today's task summary */}
        <div className="flex w-fit max-w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <FiClock className="shrink-0 text-violet-500" size={18} />

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Due today
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {todayTasks.length} {todayTasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>
        </div>
      </div>

      {/* Calendar navigation */}
      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5 lg:p-6 dark:border-slate-800 dark:bg-slate-900">
        <CalendarHeader
          currentDate={currentDate}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
        />

        <div className="mt-4 min-w-0">
          <CalendarGrid
            currentDate={currentDate}
            tasks={tasks}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
          />
        </div>
      </section>

      {/* Tasks for the selected date */}
      <section className="min-w-0">
        <CalendarTaskList selectedDate={selectedDate} tasks={selectedTasks} />
      </section>
    </main>
  );
};

export default Calendar;
