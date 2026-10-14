import { FiCheck, FiMoon, FiSun, FiMonitor } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const AppearanceSettings = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const themes = [
    {
      id: "light",
      title: "Light",
      description: "Clean and bright interface for daytime work.",
      icon: FiSun,
      iconColor: "text-amber-500",
      preview: "bg-slate-100",
      previewCard: "bg-white border-slate-200",
      previewLines: "bg-slate-200",
      previewAccent: "bg-violet-500",
    },
    {
      id: "dark",
      title: "Dark",
      description: "A comfortable interface for low-light environments.",
      icon: FiMoon,
      iconColor: "text-violet-400",
      preview: "bg-slate-950",
      previewCard: "bg-slate-900 border-slate-700",
      previewLines: "bg-slate-700",
      previewAccent: "bg-violet-400",
    },
  ];

  const handleThemeChange = (selectedTheme) => {
    if (selectedTheme !== theme) {
      toggleTheme();
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-start gap-3 border-b border-slate-200 p-5 sm:p-6 dark:border-slate-800">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiMonitor size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Appearance
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Personalize your FlowBoard workspace to suit your preferences.
          </p>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="p-5 sm:p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Choose your theme
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Select the appearance you prefer across your workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {themes.map((item) => {
            const selected = item.id === theme;
            const ThemeIcon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleThemeChange(item.id)}
                aria-pressed={selected}
                className={`
                  group relative min-w-0 rounded-2xl border p-3
                  text-left transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-4
                  focus-visible:ring-violet-500/20
                  ${
                    selected
                      ? "border-violet-500 bg-violet-50/40 ring-2 ring-violet-500/15 dark:border-violet-400 dark:bg-violet-500/5"
                      : "border-slate-200 hover:border-violet-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-violet-500/50 dark:hover:bg-slate-800/60"
                  }
                `}
              >
                {/* Selected Indicator */}
                {selected && (
                  <span className="absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white shadow-sm dark:bg-violet-500">
                    <FiCheck size={14} strokeWidth={3} aria-hidden="true" />
                  </span>
                )}

                {/* Theme Preview */}
                <div
                  className={`relative mb-4 flex h-32 items-center justify-center overflow-hidden rounded-xl ${item.preview}`}
                  aria-hidden="true"
                >
                  <div
                    className={`w-[78%] max-w-55 rounded-xl border p-3 shadow-sm transition-transform duration-200 group-hover:scale-[1.02] ${item.previewCard}`}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <div
                        className={`h-6 w-6 rounded-lg ${item.previewAccent}`}
                      />
                      <div className="flex-1 space-y-1.5">
                        <div
                          className={`h-2 w-3/5 rounded-full ${item.previewLines}`}
                        />
                        <div
                          className={`h-1.5 w-2/5 rounded-full ${item.previewLines}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div
                        className={`h-8 rounded-md ${item.previewLines} opacity-70`}
                      />
                      <div
                        className={`h-8 rounded-md ${item.previewLines} opacity-50`}
                      />
                      <div
                        className={`h-8 rounded-md ${item.previewLines} opacity-30`}
                      />
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div
                        className={`h-1.5 w-full rounded-full ${item.previewLines}`}
                      />
                      <div
                        className={`h-1.5 w-4/5 rounded-full ${item.previewLines}`}
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 shadow-sm dark:bg-slate-800/90">
                    <ThemeIcon size={19} className={item.iconColor} />
                  </div>
                </div>

                {/* Theme Details */}
                <div className="flex items-start justify-between gap-3 px-1 pb-1">
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  {selected && (
                    <span className="mt-0.5 shrink-0 text-xs font-semibold text-violet-600 dark:text-violet-400">
                      Active
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Theme Status */}
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
          {isDark ? (
            <FiMoon size={17} className="shrink-0 text-violet-500" />
          ) : (
            <FiSun size={17} className="shrink-0 text-amber-500" />
          )}

          <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">
            Currently using{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {isDark ? "Dark" : "Light"} Mode
            </span>
            . Your selection applies to the workspace.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppearanceSettings;