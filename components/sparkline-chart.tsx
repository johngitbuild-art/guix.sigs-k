"use client";

import { ResponsiveContainer, LineChart, Line } from "recharts";

interface SparklineChartProps {
  data: number[];
  positive: boolean;
}

export function SparklineChart({ data, positive }: SparklineChartProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={positive ? "oklch(0.7 0.2 145)" : "oklch(0.55 0.22 25)"}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
