"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export function OccupancyDonut({
  occupied,
  vacant,
}: {
  occupied: number;
  vacant: number;
}) {
  const total = occupied + vacant;
  const rate = total ? Math.round((occupied / total) * 100) : 0;
  const data = [
    { name: "Occupied", value: occupied, color: "#2563eb" },
    { name: "Vacant", value: vacant, color: "#e2e8f0" },
  ];

  return (
    <div className="relative h-40 w-40">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="occGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={52}
            outerRadius={72}
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={i === 0 ? "url(#occGrad)" : d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">{rate}%</span>
        <span className="text-xs font-medium text-slate-400">occupied</span>
      </div>
    </div>
  );
}
