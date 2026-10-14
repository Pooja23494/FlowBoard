import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { FiCheckCircle } from "react-icons/fi";

const STATUS_COLORS = {
  Todo: "#94a3b8",
  "In Progress": "#8b5cf6",
  Review: "#f59e0b",
  Done: "#10b981",
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;
  const color = STATUS_COLORS[item.name] ?? "#6366f1";

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-1 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {item.name}
        </span>
      </div>

      <p className="text-lg font-bold text-slate-900 dark:text-white">
        {item.value}{" "}
        <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
          {Number(item.value) === 1 ? "task" : "tasks"}
        </span>
      </p>
    </div>
  );
};

const TaskStatusChart = ({ data = [] }) => {
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        value: Math.max(0, Number(item.value) || 0),
      }))
    : [];

  const totalTasks = chartData.reduce(
    (total, item) => total + item.value,
    0,
  );

  const hasData = totalTasks > 0;

  const statusColors = {
    Todo: STATUS_COLORS.Todo,
    "In Progress": STATUS_COLORS["In Progress"],
    Review: STATUS_COLORS.Review,
    Done: STATUS_COLORS.Done,
    ...Object.fromEntries(
      chartData.map((item) => [
        item.name,
        STATUS_COLORS[item.name] ?? "#6366f1",
      ]),
    ),
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Task Status
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Current task distribution.
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiCheckCircle size={20} />
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 w-full sm:h-72">
        {hasData ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius="55%"
                  outerRadius="78%"
                  paddingAngle={3}
                  cornerRadius={4}
                  stroke="none"
                  isAnimationActive
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={statusColors[entry.name]}
                    />
                  ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center total */}
            <div className="pointer-events-none absolute inset-x-0 top-[45%] flex -translate-y-1/2 flex-col items-center justify-center">
              <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {totalTasks}
              </span>

              <span className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                Total tasks
              </span>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 text-center dark:border-slate-700">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <FiCheckCircle size={22} />
            </div>

            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              No tasks to display
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Add tasks to see their status distribution.
            </p>
          </div>
        )}
      </div>

      {/* Custom legend */}
      {hasData && (
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          {chartData.map((item, index) => {
            const percentage = Math.round(
              (item.value / totalTasks) * 100,
            );

            return (
              <div
                key={`${item.name}-${index}`}
                className="flex min-w-0 items-start gap-2"
              >
                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: statusColors[item.name] }}
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {item.name}
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
                    {item.value}
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      ({percentage}%)
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TaskStatusChart;