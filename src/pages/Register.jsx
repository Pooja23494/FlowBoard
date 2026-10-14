import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiArrowRight } from "react-icons/fi";

import { register } from "../redux/slices/authSlice";
import AuthInput from "../components/auth/AuthInput";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      ...(name === "password" ? { confirmPassword: "" } : {}),
    }));
  };

  const validate = () => {
    const newErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name) {
      newErrors.name = "Full name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const user = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: "Developer",
      avatar: "",
    };

    dispatch(register(user));

    navigate("/", { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Branding Panel */}
        <section className="relative hidden flex-1 items-center justify-center overflow-hidden bg-linear-to-br from-violet-600 via-indigo-600 to-blue-600 p-10 lg:flex xl:p-16">
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
              Plan. Collaborate. Achieve.
            </p>

            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
              Build better workflows with FlowBoard
            </h1>

            <p className="mt-5 max-w-md text-base leading-8 text-white/80">
              Create projects, organize tasks, collaborate with your team, and
              understand your productivity—all in one place.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { value: "Projects", label: "Stay organized" },
                { value: "Tasks", label: "Work smarter" },
                { value: "Insights", label: "Track progress" },
              ].map((item) => (
                <div
                  key={item.value}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold">{item.value}</p>
                  <p className="mt-1 text-xs text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
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
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Get started and bring your team's work together.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <AuthInput
                label="Full name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

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
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <AuthInput
                label="Confirm password"
                name="confirmPassword"
                type="password"
                placeholder="Enter your password again"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />

              <button
                type="submit"
                className="
                  group mt-2 flex h-12 w-full items-center
                  justify-center gap-2 rounded-xl bg-violet-600
                  px-4 text-sm font-semibold text-white
                  shadow-lg shadow-violet-600/20
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-violet-700
                  hover:shadow-xl hover:shadow-violet-600/25
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-violet-500
                  focus-visible:ring-offset-2
                  dark:focus-visible:ring-offset-slate-950
                  active:translate-y-0
                "
              >
                Create account
                <FiArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              <span className="text-xs text-slate-400">JOIN FLOWBOARD</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-violet-600 transition hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:text-violet-400 dark:hover:text-violet-300 dark:focus-visible:ring-offset-slate-950"
              >
                Sign in
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

export default Register;