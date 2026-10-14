import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated ?? false
  );

  // Optional: support an authentication loading state
  const isLoading = useSelector(
    (state) => state.auth?.isLoading ?? false
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600"
            role="status"
            aria-label="Loading"
          />

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;