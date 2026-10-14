import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTheme } from "../../context/ThemeContext";

const ProductivityChart = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    grid: isDark ? "#334155" : "#e2e8f0",
    text: isDark ? "#94a3b8" : "#64748b",
    tooltipBg: isDark ? "#0f172a" : "#ffffff",
    tooltipBorder: isDark ? "#334155" : "#e2e8f0",
  };

  return (
    <div
      className="
        h-full min-w-0 overflow-hidden
        rounded-2xl border border-slate-200
        bg-white p-4 shadow-sm
        transition-colors duration-200
        sm:p-5
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
            Productivity
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Focus hours this week
          </p>
        </div>

        <div className="shrink-0 rounded-lg bg-blue-50 px-3 py-1.5 dark:bg-blue-500/10">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
            Weekly overview
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-5 h-56 min-w-0 sm:mt-6 sm:h-64 lg:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="productivityGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#3b82f6"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="#3b82f6"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={colors.grid}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: colors.text,
              }}
              tickMargin={10}
              minTickGap={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: colors.text,
              }}
              tickMargin={8}
              width={38}
              allowDecimals={false}
            />

            <Tooltip
              cursor={{
                stroke: colors.grid,
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                backgroundColor: colors.tooltipBg,
                border: `1px solid ${colors.tooltipBorder}`,
                borderRadius: "12px",
                color: colors.text,
                fontSize: "12px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
              }}
              labelStyle={{
                color: isDark ? "#f8fafc" : "#0f172a",
                fontWeight: 600,
                marginBottom: "4px",
              }}
              formatter={(value) => [`${value} hours`, "Focus time"]}
            />

            <Area
              type="monotone"
              dataKey="hours"
              name="Focus time"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#productivityGradient)"
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: isDark ? "#0f172a" : "#ffffff",
                fill: "#3b82f6",
              }}
              dot={false}
              connectNulls={false}
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductivityChart;
