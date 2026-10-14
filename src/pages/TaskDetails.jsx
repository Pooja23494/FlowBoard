import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import TaskDetailHeader from "../components/task-details/TaskDetailHeader";
import TaskInfoCard from "../components/task-details/TaskInfoCard";
import TaskActivity from "../components/task-details/TaskActivity";
import TaskForm from "../components/tasks/TaskForm";

import {
  deleteTask,
  updateTask,
} from "../redux/slices/taskSlice";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showEditForm, setShowEditForm] = useState(false);

  const tasks = useSelector((state) => state.tasks.tasks || []);
  const projects = useSelector((state) => state.projects.projects || []);

  const task = tasks.find(
    (item) => String(item.id) === String(taskId),
  );

  const project = projects.find(
    (item) => String(item.id) === String(task?.projectId),
  );

  const handleUpdate = (taskData) => {
    dispatch(
      updateTask({
        ...task,
        ...taskData,
        id: task.id,
      }),
    );

    setShowEditForm(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    dispatch(deleteTask(task.id));
    navigate("/tasks");
  };

  // Task not found
  if (!task) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl dark:bg-slate-800">
            📝
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            Task not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            This task may have been deleted or the link may be incorrect.
          </p>

          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="
              mt-6 inline-flex min-h-11 items-center
              justify-center rounded-xl bg-violet-600
              px-5 py-2.5 text-sm font-semibold text-white
              transition-colors hover:bg-violet-700
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-violet-500
              focus-visible:ring-offset-2
              dark:focus-visible:ring-offset-slate-950
            "
          >
            Back to Tasks
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-w-0 space-y-5 sm:space-y-6">
      {/* Header */}
      <TaskDetailHeader
        task={task}
        onEdit={() => setShowEditForm(true)}
        onDelete={handleDelete}
      />

      {/* Main Content */}
      <div className="grid min-w-0 grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Description and Activity */}
        <div className="min-w-0 space-y-5 sm:space-y-6">
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-3 text-base font-bold text-slate-900 dark:text-white sm:mb-4">
              Description
            </h2>

            <p className="wrap-break-word whitespace-pre-wrap text-sm leading-6 text-slate-600 sm:leading-7 dark:text-slate-300">
              {task.description || "No description provided."}
            </p>
          </section>

          <section className="min-w-0">
            <TaskActivity task={task} />
          </section>
        </div>

        {/* Task Information */}
        <aside className="min-w-0">
          <TaskInfoCard task={task} project={project} />
        </aside>
      </div>

      {/* Edit Task Modal */}
      {showEditForm && (
        <TaskForm
          task={task}
          projects={projects}
          onClose={() => setShowEditForm(false)}
          onSubmit={handleUpdate}
        />
      )}
    </main>
  );
};

export default TaskDetails;
