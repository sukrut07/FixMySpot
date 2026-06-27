"use client";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Analytics } from "@/types";

const colors = ["#FF6B35", "#2EC4B6", "#004E89", "#E71D36", "#F2C94C"];

export function DashboardCharts({ analytics }: { analytics: Analytics }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartShell title="Issues by category">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={analytics.byCategory} dataKey="value" nameKey="name" innerRadius={64} outerRadius={98}>
              {analytics.byCategory.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "#161B22", border: "1px solid #30363D" }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartShell>
      <ChartShell title="Reports over time">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={analytics.trend}>
            <CartesianGrid stroke="#30363D" />
            <XAxis dataKey="date" stroke="#8B949E" />
            <YAxis stroke="#8B949E" />
            <Tooltip contentStyle={{ background: "#161B22", border: "1px solid #30363D" }} />
            <Line type="monotone" dataKey="issues" stroke="#FF6B35" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartShell>
      <ChartShell title="Top issue areas">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={analytics.worstAreas}>
            <CartesianGrid stroke="#30363D" />
            <XAxis dataKey="area" stroke="#8B949E" />
            <YAxis stroke="#8B949E" />
            <Tooltip contentStyle={{ background: "#161B22", border: "1px solid #30363D" }} />
            <Bar dataKey="issues" fill="#2EC4B6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartShell>
      <ChartShell title="Resolution rate">
        <div className="flex h-[280px] flex-col justify-center">
          <div className="mb-4 text-6xl font-bold text-white">{analytics.resolutionRate}%</div>
          <div className="h-4 overflow-hidden rounded-full bg-background">
            <div className="h-full rounded-full bg-teal" style={{ width: `${analytics.resolutionRate}%` }} />
          </div>
          <p className="mt-4 text-sm text-muted">{analytics.resolved} resolved out of {analytics.total} tracked reports.</p>
        </div>
      </ChartShell>
    </div>
  );
}

function ChartShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-4 font-semibold text-white">{title}</h3>
      {children}
    </div>
  );
}
