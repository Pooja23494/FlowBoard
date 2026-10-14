import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { FiActivity } from "react-icons/fi";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const taskCount = Number(payload[0].value) || 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />

        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {taskCount} {taskCount === 1 ? "task" : "tasks"}
        </p>
      </div>
    </div>
  );
};

const TaskActivityChart = ({ data = [] }) => {
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        ...item,
        tasks: Math.max(0, Number(item.tasks) || 0),
      }))
    : [];

  const hasData = chartData.some((item) => item.tasks > 0);

  const totalTasks = chartData.reduce(
    (total, item) => total + item.tasks,
    0,
  );

  const peakActivity = chartData.reduce(
    (peak, item) => Math.max(peak, item.tasks),
    0,
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Task Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Tasks grouped by due date.
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <FiActivity size={20} />
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tasks in chart
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {totalTasks}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Peak daily activity
          </p>

          <p className="mt-1 text-xl font-bold text-violet-600 dark:text-violet-400">
            {peakActivity}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full sm:h-72">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 12, right: 8, left: -18, bottom: 4 }}
            >
              <defs>
                <linearGradient
                  id="flowboardTaskActivityGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#8b5cf6"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#94a3b8"
                strokeOpacity={0.2}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                tickMargin={10}
                minTickGap={12}
              />

              <YAxis
                allowDecimals={false}
                domain={[0, (max) => Math.max(4, max)]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                width={35}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#8b5cf6",
                  strokeDasharray: "4 4",
                }}
              />

              <Area
                type="monotone"
                dataKey="tasks"
                name="Tasks"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                fill="url(#flowboardTaskActivityGradient)"
                activeDot={{
                  r: 5,
                  fill: "#8b5cf6",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                dot={
                  chartData.length <= 10
                    ? {
                        r: 3,
                        fill: "#8b5cf6",
                        stroke: "#ffffff",
                        strokeWidth: 1.5,
                      }
                    : false
                }
                connectNulls
                isAnimationActive
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 text-center dark:border-slate-700">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <FiActivity size={22} />
            </div>

            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              No task activity yet
            </p>

            <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">
              Tasks with due dates will appear here when activity is available.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Tasks by due date
        </span>
      </div>
    </section>
  );
};

export default TaskActivityChart;