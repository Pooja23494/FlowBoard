import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import { logout } from "../../redux/slices/authSlice";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);

  const name = user?.name?.trim() || "User";
  const email = user?.email || "";
  const role = user?.role || "Member";

  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase() || "U";

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handleNavigation = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleLogout = () => {
    closeMenu();
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Profile Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`Profile menu for ${name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="
          flex items-center gap-2 rounded-xl p-2
          transition-colors duration-200
          hover:bg-slate-100
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-violet-500
          dark:hover:bg-slate-800
        "
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
          {initials}
        </div>

        <div className="hidden min-w-0 text-left sm:block">
          <p className="max-w-36 truncate text-sm font-semibold text-slate-800 dark:text-white">
            {name}
          </p>

          <p className="max-w-36 truncate text-xs text-slate-500 dark:text-slate-400">
            {role}
          </p>
        </div>

        <FiChevronDown
          size={16}
          aria-hidden="true"
          className={`hidden shrink-0 text-slate-400 transition-transform duration-200 sm:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Profile options"
          className="
            absolute right-0 z-50 mt-2 w-64
            origin-top-right rounded-2xl
            border border-slate-200 bg-white p-2
            shadow-xl shadow-slate-900/10
            dark:border-slate-700 dark:bg-slate-900
            dark:shadow-black/20
          "
        >
          {/* User Information */}
          <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3 dark:border-slate-800">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {name}
              </p>

              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {email}
              </p>
            </div>
          </div>

          {/* Profile */}
          <button
            type="button"
            role="menuitem"
            onClick={() => handleNavigation("/settings?tab=profile")}
            className="
              mt-2 flex w-full items-center gap-3
              rounded-xl px-3 py-2.5 text-sm
              text-slate-700 transition-colors
              hover:bg-slate-100
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-violet-500
              dark:text-slate-200 dark:hover:bg-slate-800
            "
          >
            <FiUser size={17} aria-hidden="true" />
            My Profile
          </button>

          {/* Settings */}
          <button
            type="button"
            role="menuitem"
            onClick={() => handleNavigation("/settings?tab=account")}
            className="
              flex w-full items-center gap-3
              rounded-xl px-3 py-2.5 text-sm
              text-slate-700 transition-colors
              hover:bg-slate-100
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-violet-500
              dark:text-slate-200 dark:hover:bg-slate-800
            "
          >
            <FiSettings size={17} aria-hidden="true" />
            Settings
          </button>

          <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

          {/* Logout */}
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="
              flex w-full items-center gap-3
              rounded-xl px-3 py-2.5 text-sm
              text-red-600 transition-colors
              hover:bg-red-50
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-red-500
              dark:text-red-400 dark:hover:bg-red-500/10
            "
          >
            <FiLogOut size={17} aria-hidden="true" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;