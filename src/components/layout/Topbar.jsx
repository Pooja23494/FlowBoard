import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";

import GlobalSearch from "../search/GlobalSearch";
import NotificationIcon from "../notifications/NotificationIcon";
import NotificationDropdown from "../notifications/NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";

import { useTheme } from "../../context/ThemeContext";

import {
  markAllAsRead,
  markAsRead,
  deleteNotification,
} from "../../redux/slices/notificationSlice";

const Topbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef(null);

  const notifications = useSelector(
    (state) => state.notifications?.notifications ?? []
  );

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Close notifications when clicking outside the dropdown.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  // Close notifications when pressing Escape.
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Close the dropdown when navigating to another page.
  useEffect(() => {
    setShowNotifications(false);
  }, [location.pathname]);

  const handleViewAll = () => {
    setShowNotifications(false);
    navigate("/notifications");
  };

  return (
    <header
      className="
        sticky top-0 z-30
        h-16 sm:h-18 lg:h-20
        border-b border-slate-200/80
        bg-white/90 backdrop-blur-xl
        dark:border-slate-800
        dark:bg-slate-950/90
      "
    >
      <div
        className="
          flex h-full w-full min-w-0
          items-center justify-between
          gap-2 px-3
          sm:gap-4 sm:px-5
          lg:px-8
        "
      >
        {/* Left: Mobile Menu and Search */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              text-slate-600
              transition-colors
              hover:bg-slate-100
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500
              dark:text-slate-300
              dark:hover:bg-slate-800
              lg:hidden
            "
          >
            <FiMenu size={21} />
          </button>

          <div className="min-w-0 flex-1">
            <GlobalSearch />
          </div>
        </div>

        {/* Right: Header Actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
            }
            title={
              theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
            }
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              text-slate-600
              transition-colors
              hover:bg-slate-100
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-violet-500
              dark:text-slate-300
              dark:hover:bg-slate-800
            "
          >
            {theme === "light" ? <FiMoon size={19} /> : <FiSun size={19} />}
          </button>

          {/* Notifications */}
          <div ref={notificationRef} className="relative shrink-0">
            <NotificationIcon
              unreadCount={unreadCount}
              onClick={() => setShowNotifications((current) => !current)}
            />

            {showNotifications && (
              <NotificationDropdown
                notifications={notifications.slice(0, 5)}
                onMarkRead={(id) => dispatch(markAsRead(id))}
                onMarkAllRead={() => dispatch(markAllAsRead())}
                onDelete={(id) => dispatch(deleteNotification(id))}
                onViewAll={handleViewAll}
              />
            )}
          </div>

          {/* Divider */}
          <div
            aria-hidden="true"
            className="
              mx-1 hidden h-8 w-px
              bg-slate-200
              dark:bg-slate-800
              sm:block
            "
          />

          {/* Profile Menu */}
          <div className="shrink-0">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;