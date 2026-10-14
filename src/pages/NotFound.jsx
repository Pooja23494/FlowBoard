import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiHome,
  FiSearch,
} from "react-icons/fi";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 dark:bg-slate-950">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-600/10"
      />

      <section className="relative z-10 w-full max-w-lg text-center">
        {/* Logo */}
        <Link
          to="/dashboard"
          aria-label="FlowBoard home"
          className="mb-10 inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-600/20">
            F
          </span>

          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            FlowBoard
          </span>
        </Link>

        {/* 404 Illustration */}
        <div className="relative mx-auto mb-7 flex h-36 w-36 items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-violet-200 dark:border-violet-500/20"
          />

          <div
            aria-hidden="true"
            className="absolute inset-3 rounded-full border border-dashed border-violet-300 dark:border-violet-500/30"
          />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-100 text-violet-600 shadow-lg shadow-violet-500/10 dark:bg-violet-500/10 dark:text-violet-400">
            <FiSearch size={36} strokeWidth={1.7} />
          </div>

          <span className="absolute right-1 top-4 h-3 w-3 rounded-full bg-violet-500 ring-4 ring-slate-50 dark:ring-slate-950" />
          <span className="absolute bottom-3 left-3 h-2.5 w-2.5 rounded-full bg-indigo-400 ring-4 ring-slate-50 dark:ring-slate-950" />
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">
          Error 404
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Lost your way?
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
          Sorry, we couldn't find the page you're looking for. It may
          have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/dashboard"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            <FiHome size={17} />
            Back to Dashboard
            <FiArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
          >
            <FiArrowLeft size={17} />
            Go Back
          </button>
        </div>

        <p className="mt-10 text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} FlowBoard. Keep your work moving.
        </p>
      </section>
    </main>
  );
};

export default NotFound;