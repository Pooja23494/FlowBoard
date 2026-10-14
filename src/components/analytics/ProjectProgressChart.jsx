import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LabelList,
} from "recharts";
import { FiTrendingUp, FiFolder } from "react-icons/fi";

const getProgressColor = (progress) => {
  if (progress >= 75) return "#22c55e";
  if (progress >= 40) return "#8b5cf6";
  if (progress > 0) return "#f59e0b";
  return "#94a3b8";
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const project = payload[0].payload;
  const progress = Math.min(
    100,
    Math.max(0, Number(project.progress) || 0),
  );

  return (
    <div className="min-w-36 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <p className="mb-2 max-w-48 truncate text-sm font-semibold text-slate-800 dark:text-white">
        {project.name}
      </p>

      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${progress}%`,
            backgroundColor: getProgressColor(progress),
          }}
        />
      </div>

      <p className="text-lg font-bold text-slate-900 dark:text-white">
        {progress}%
        <span className="ml-1 text-xs font-normal text-slate-500 dark:text-slate-400">
          completed
        </span>
      </p>
    </div>
  );
};

const ProjectProgressChart = ({ data = [] }) => {
  const projects = Array.isArray(data)
    ? data.map((project, index) => ({
        ...project,
        name: project.name || `Project ${index + 1}`,
        progress: Math.min(
          100,
          Math.max(0, Number(project.progress) || 0),
        ),
      }))
    : [];

  const hasProjects = projects.length > 0;

  const averageProgress = hasProjects
    ? Math.round(
        projects.reduce((total, project) => total + project.progress, 0) /
          projects.length,
      )
    : 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Project Progress
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Current completion percentage by project.
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiTrendingUp size={20} />
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total projects
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {projects.length}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Average progress
          </p>
          <p className="mt-1 flex items-center gap-1 text-xl font-bold text-violet-600 dark:text-violet-400">
            {averageProgress}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div
        className="w-full"
        style={{ height: Math.max(240, projects.length * 54 + 48) }}
      >
        {hasProjects ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projects}
              layout="vertical"
              margin={{ top: 8, right: 28, left: 0, bottom: 8 }}
              barCategoryGap="35%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#94a3b8"
                strokeOpacity={0.2}
              />

              <XAxis
                type="number"
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                unit="%"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={95}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                tickFormatter={(name) =>
                  name.length > 14 ? `${name.slice(0, 13)}…` : name
                }
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#94a3b8", fillOpacity: 0.1 }}
              />

              <Bar
                dataKey="progress"
                name="Progress"
                radius={[0, 6, 6, 0]}
                maxBarSize={24}
                background={{ fill: "#94a3b8", fillOpacity: 0.1 }}
                isAnimationActive
              >
                {projects.map((project, index) => (
                  <Cell
                    key={`${project.name}-${index}`}
                    fill={getProgressColor(project.progress)}
                  />
                ))}

                <LabelList
                  dataKey="progress"
                  position="right"
                  formatter={(value) => `${value}%`}
                  style={{
                    fill: "#94a3b8",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 text-center dark:border-slate-700">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <FiFolder size={22} />
            </div>

            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              No projects yet
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Create a project to track its completion progress.
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      {hasProjects && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
          {[
            { label: "On track", color: "#22c55e" },
            { label: "In progress", color: "#8b5cf6" },
            { label: "Getting started", color: "#f59e0b" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectProgressChart;