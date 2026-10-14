import { useEffect, useState } from "react";
import { FiCheckCircle, FiMessageCircle, FiSend, FiUser } from "react-icons/fi";

const TaskActivity = ({ task }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const status = (task?.status || "todo").replaceAll("-", " ");

  // Reset comments when switching to a different task.
  useEffect(() => {
    setComments([]);
    setComment("");
  }, [task?.id]);

  const handleAddComment = (event) => {
    event.preventDefault();

    const message = comment.trim();

    if (!message) return;

    const newComment = {
      id: `${Date.now()}-${Math.random()}`,
      author: "Pooja Patel",
      message,
      createdAt: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setComments((previous) => [...previous, newComment]);
    setComment("");
  };

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Activity
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Updates and discussion about this task
          </p>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiMessageCircle size={18} />
        </span>
      </div>

      {/* Activity timeline */}
      <div className="relative space-y-5">
        <div className="absolute bottom-5 left-4 top-5 w-px bg-slate-200 dark:bg-slate-700" />

        <div className="relative flex min-w-0 gap-3">
          <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 ring-4 ring-white dark:bg-violet-500/15 dark:text-violet-400 dark:ring-slate-900">
            <FiCheckCircle size={16} />
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <p className="wrap-break-word text-sm leading-6 text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">
                Pooja Patel
              </span>{" "}
              created this task.
            </p>
            <p className="mt-1 text-xs text-slate-400">Task created</p>
          </div>
        </div>

        <div className="relative flex min-w-0 gap-3">
          <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 ring-4 ring-white dark:bg-blue-500/15 dark:text-blue-400 dark:ring-slate-900">
            <FiMessageCircle size={16} />
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <p className="wrap-break-word text-sm leading-6 text-slate-700 dark:text-slate-300">
              Task status is{" "}
              <span className="font-semibold capitalize text-slate-900 dark:text-white">
                {status}
              </span>
              .
            </p>
            <p className="mt-1 text-xs text-slate-400">Current status</p>
          </div>
        </div>

        {/* Saved in component state */}
        {comments.map((item) => (
          <div key={item.id} className="relative flex min-w-0 gap-3">
            <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-4 ring-white dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-slate-900">
              <FiUser size={16} />
            </div>

            <div className="min-w-0 flex-1 pt-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {item.author}
              </p>
              <p className="mt-1 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.message}
              </p>
              <p className="mt-1 text-xs text-slate-400">{item.createdAt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment form */}
      <form
        onSubmit={handleAddComment}
        className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800"
      >
        <label
          htmlFor="task-comment"
          className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200"
        >
          Add a comment
        </label>

        <div className="flex min-w-0 gap-3">
          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 sm:flex dark:bg-slate-800 dark:text-slate-300">
            <FiUser size={17} />
          </div>

          <div className="min-w-0 flex-1">
            <textarea
              id="task-comment"
              name="comment"
              rows={3}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Share an update or leave a comment..."
              maxLength={1000}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 sm:px-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-violet-500/10"
            />

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-400">
                {comment.length}/1000 characters
              </span>

              <button
                type="submit"
                disabled={!comment.trim()}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-slate-900"
              >
                <FiSend size={15} />
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default TaskActivity;
