import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiArrowRight } from "react-icons/fi";

import { login } from "../redux/slices/authSlice";
import AuthInput from "../components/auth/AuthInput";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    const email = formData.email.trim();

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    // Demo login: replace with real credential verification
    // when authentication is connected to your backend.
    const user = {
      id: 1,
      name: "Pooja Patel",
      email: formData.email.trim(),
      role: "Developer",
      avatar: "",
    };

    dispatch(login(user));

    const requestedPath = location.state?.from?.pathname;
    const redirectPath =
      requestedPath?.startsWith("/") &&
      !requestedPath.startsWith("//") &&
      requestedPath !== "/login" &&
      requestedPath !== "/register"
        ? requestedPath
        : "/";

    navigate(redirectPath, { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Panel */}
        <section
          className="
            relative hidden flex-1 items-center justify-center
            overflow-hidden bg-linear-to-br from-violet-600
            via-indigo-600 to-blue-600 p-10 lg:flex xl:p-16
          "
        >
          <div
            aria-hidden="true"
            className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl"
          />

          <div className="relative z-10 max-w-lg text-white">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-3xl font-bold shadow-xl backdrop-blur">
              F
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Your workspace, simplified
            </p>

            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
              Welcome back to FlowBoard
            </h1>

            <p className="mt-5 max-w-md text-base leading-8 text-white/80">
              Manage projects, organize tasks, collaborate with your team, and
              track productivity from one powerful workspace.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["P", "R", "N"].map((initial, index) => (
                  <div
                    key={initial}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-500 text-sm font-bold text-white ${
                      index === 0
                        ? "bg-violet-400"
                        : index === 1
                          ? "bg-blue-400"
                          : "bg-indigo-400"
                    }`}
                  >
                    {initial}
                  </div>
                ))}
              </div>

              <p className="text-sm text-white/80">
                One workspace. Better teamwork.
              </p>
            </div>
          </div>
        </section>

        {/* Login Panel */}
        <section className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:max-w-xl lg:px-12 xl:max-w-2xl">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white shadow-lg shadow-violet-600/20">
                F
              </div>

              <span className="text-xl font-bold text-slate-900 dark:text-white">
                FlowBoard
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <AuthInput
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <AuthInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <button
                type="submit"
                className="
                  group flex h-12 w-full items-center justify-center
                  gap-2 rounded-xl bg-violet-600 px-4 text-sm
                  font-semibold text-white shadow-lg
                  shadow-violet-600/20 transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-violet-700
                  hover:shadow-xl hover:shadow-violet-600/25
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-violet-500
                  focus-visible:ring-offset-2
                  dark:focus-visible:ring-offset-slate-950
                  active:translate-y-0
                "
              >
                Sign in
                <FiArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              <span className="text-xs text-slate-400">
                FLOWBOARD WORKSPACE
              </span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-violet-600 transition hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:text-violet-400 dark:hover:text-violet-300 dark:focus-visible:ring-offset-slate-950"
              >
                Create account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} FlowBoard. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;