import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FiTarget } from "react-icons/fi";

import FocusHeader from "../components/focus/FocusHeader";
import FocusModes from "../components/focus/FocusModes";
import FocusTimer from "../components/focus/FocusTimer";
import FocusTaskSelector from "../components/focus/FocusTaskSelector";
import FocusStats from "../components/focus/FocusStats";

const TIMER_SETTINGS = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

const Focus = () => {
  const tasks = useSelector((state) => state.tasks?.tasks ?? []);

  const [mode, setMode] = useState("focus");
  const [seconds, setSeconds] = useState(TIMER_SETTINGS.focus);
  const [isRunning, setIsRunning] = useState(false);

  const [sessions, setSessions] = useState(0);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0);

  const [selectedTaskId, setSelectedTaskId] = useState("");

  // Keep only valid timer modes.
  const currentDuration = TIMER_SETTINGS[mode] ?? TIMER_SETTINGS.focus;

  // Find the currently selected task safely.
  const selectedTask = useMemo(() => {
    if (!Array.isArray(tasks) || selectedTaskId === "") {
      return null;
    }

    return (
      tasks.find(
        (task) => String(task.id) === String(selectedTaskId),
      ) ?? null
    );
  }, [tasks, selectedTaskId]);

  // Timer countdown.
  useEffect(() => {
    if (!isRunning) return undefined;

    const intervalId = setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Handle timer completion separately from the countdown.
  useEffect(() => {
    if (!isRunning || seconds !== 0) return;

    setIsRunning(false);

    if (mode === "focus") {
      setSessions((current) => current + 1);
      setTotalFocusMinutes(
        (current) => current + TIMER_SETTINGS.focus / 60,
      );
    }

    // Reset to the selected mode's duration.
    setSeconds(currentDuration);
  }, [isRunning, seconds, mode, currentDuration]);

  const changeMode = (newMode) => {
    if (!Object.hasOwn(TIMER_SETTINGS, newMode)) return;

    setIsRunning(false);
    setMode(newMode);
    setSeconds(TIMER_SETTINGS[newMode]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(currentDuration);
  };

  const handleStart = () => {
    if (seconds > 0) {
      setIsRunning(true);
    }
  };

  return (
    <div className="space-y-6">
      <FocusHeader />

      {/* Intro card */}
      <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 dark:border-violet-500/20 dark:bg-violet-500/5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiTarget size={22} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Make time for focused work
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400 sm:text-sm">
            Work in focused intervals, take breaks, and make steady progress.
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Timer panel */}
        <div className="min-w-0 xl:col-span-2">
          <section className="h-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <FocusModes mode={mode} setMode={changeMode} disabled={isRunning} />

            <div className="my-8">
              <FocusTimer
                seconds={seconds}
                totalSeconds={currentDuration}
                isRunning={isRunning}
                onStart={handleStart}
                onPause={() => setIsRunning(false)}
                onReset={handleReset}
              />
            </div>

            {/* Selected task */}
            {selectedTask && (
              <div className="mx-auto max-w-md rounded-2xl border border-violet-100 bg-violet-50 px-4 py-4 text-center dark:border-violet-500/20 dark:bg-violet-500/10">
                <p className="text-xs font-medium uppercase tracking-wide text-violet-500 dark:text-violet-400">
                  Currently focusing on
                </p>

                <p className="mt-2 wrap-break-word font-semibold text-violet-800 dark:text-violet-200">
                  {selectedTask.title || "Untitled task"}
                </p>
              </div>
            )}

            {!selectedTask && (
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Select a task to connect your focus session to your work.
              </p>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex min-w-0 flex-col gap-6">
          <FocusTaskSelector
            tasks={Array.isArray(tasks) ? tasks : []}
            selectedTaskId={selectedTaskId}
            setSelectedTaskId={setSelectedTaskId}
          />

          <FocusStats
            sessions={sessions}
            totalFocusMinutes={totalFocusMinutes}
          />
        </aside>
      </div>
    </div>
  );
};

export default Focus;
