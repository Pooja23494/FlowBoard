import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import SettingsSidebar from "../components/settings/SettingsSidebar";
import ProfileSettings from "../components/settings/ProfileSettings";
import AccountSettings from "../components/settings/AccountSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";

const VALID_TABS = [
  "profile",
  "account",
  "appearance",
  "notifications",
];

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contentKey, setContentKey] = useState(0);

  const requestedTab = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(requestedTab)
    ? requestedTab
    : "profile";

  const handleTabChange = (tab) => {
    if (!VALID_TABS.includes(tab) || tab === activeTab) return;

    setSearchParams({ tab });
    setContentKey((previous) => previous + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettings />;

      case "appearance":
        return <AppearanceSettings />;

      case "notifications":
        return <NotificationSettings />;

      case "profile":
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <main className="mx-auto w-full max-w-[1600px] space-y-6 sm:space-y-8">
      {/* Page Header */}
      <header className="flex items-start gap-3 sm:gap-4">
        <div
          className="
            flex h-11 w-11 shrink-0 items-center justify-center
            rounded-2xl border border-violet-100
            bg-violet-50 text-violet-600
            shadow-sm shadow-violet-500/5
            dark:border-violet-500/20
            dark:bg-violet-500/10 dark:text-violet-400
            sm:h-12 sm:w-12
          "
        >
          <FiSettings size={22} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Settings
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Manage your profile, account security, appearance, and
            notification preferences.
          </p>
        </div>
      </header>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <SettingsSidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </aside>

        <section
          key={`${activeTab}-${contentKey}`}
          aria-label={`${activeTab} settings`}
          className="
            min-w-0
            animate-in fade-in-0 slide-in-from-bottom-1
            duration-200
          "
        >
          {renderContent()}
        </section>
      </div>
    </main>
  );
};

export default Settings;