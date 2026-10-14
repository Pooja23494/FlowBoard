import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { FiAlertCircle, FiBarChart2 } from "react-icons/fi";

const priorityColors = {
  Urgent: "#ef4444",
  High: "#f97316",
  Medium: "#eab308",
  Low: "#22c55e",
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;
  const color = priorityColors[item.name] ?? "#6366f1";

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

      <p className="text-xl font-bold text-slate-900 dark:text-white">
        {item.value ?? 0}
        <span className="ml-1 text-xs font-normal text-slate-500 dark:text-slate-400">
          tasks
        </span>
      </p>
    </div>
  );
};

const PriorityChart = ({ data = [] }) => {
  const chartData = Array.isArray(data) ? data : [];
  const hasData = chartData.some((item) => Number(item.value) > 0);

  const totalTasks = chartData.reduce(
    (total, item) => total + (Number(item.value) || 0),
    0,
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Task Priority
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Tasks grouped by priority level.
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiAlertCircle size={20} />
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Total tasks
        </span>

        <span className="text-lg font-bold text-slate-900 dark:text-white">
          {totalTasks}
        </span>
      </div>

      {/* Chart */}
      <div className="h-64 w-full sm:h-72">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 12, right: 8, left: -18, bottom: 4 }}
              barCategoryGap="30%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#94a3b8"
                strokeOpacity={0.2}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                tickMargin={10}
              />

              <YAxis
                allowDecimals={false}
                allowDataOverflow={false}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                width={35}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#94a3b8", fillOpacity: 0.1 }}
              />

              <Bar
                dataKey="value"
                name="Tasks"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
                isAnimationActive
              >
                {chartData.map((item, index) => (
                  <Cell
                    key={`${item.name}-${index}`}
                    fill={priorityColors[item.name] ?? "#6366f1"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 text-center dark:border-slate-700">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <FiBarChart2 size={22} />
            </div>

            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              No priority data yet
            </p>

            <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">
              Add tasks and assign priorities to see your distribution.
            </p>
          </div>
        )}
      </div>

      {/* Priority legend */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        {Object.entries(priorityColors).map(([name, color]) => (
          <div key={name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriorityChart;