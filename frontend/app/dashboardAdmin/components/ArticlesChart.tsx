"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ArticlesChart({ articles }: any) {
  const data = articles
    .filter((a: any) => a.status === "published")
    .map((a: any) => ({
      name: a.title.length > 12
        ? a.title.slice(0, 12) + "…"
        : a.title,
      views: a.views || 0,
      likes: a.likes || 0,
    }));

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">
        📊 Performances des articles
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          {/* 👁️ Vues */}
          <Line
            type="monotone"
            dataKey="views"
            stroke="#2563eb"
            strokeWidth={3}
          />

          {/* ❤️ Likes */}
          <Line
            type="monotone"
            dataKey="likes"
            stroke="#dc2626"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
