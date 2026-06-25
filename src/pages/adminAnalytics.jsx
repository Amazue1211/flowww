// Pages.jsx
// Install dependencies if needed:
// npm install react-chartjs-2 chart.js

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
);

// ----------------------------------------------------------------------
// Reusable small components (to keep each page clean)
// ----------------------------------------------------------------------
const PageHeader = ({ title, breadcrumb }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-serif font-semibold text-white">{title}</h2>
    <p className="text-sm text-gray-500 mt-1">{breadcrumb}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    active: "bg-green-500/10 text-green-400",
    inactive: "bg-gray-500/10 text-gray-400",
    pending: "bg-amber-500/10 text-amber-400",
    completed: "bg-green-500/10 text-green-400",
    failed: "bg-red-500/10 text-red-400",
    processing: "bg-blue-500/10 text-blue-400",
    paid: "bg-green-500/10 text-green-400",
    overdue: "bg-red-500/10 text-red-400",
    draft: "bg-gray-500/10 text-gray-400",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${colors[status] || "bg-gray-500/10 text-gray-400"}`}
    >
      {status}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-gray-900 border border-gray-800 rounded-xl p-5 ${className}`}
  >
    {children}
  </div>
);

// ----------------------------------------------------------------------
// 1. ANALYTICS PAGE
// ----------------------------------------------------------------------
const AdminAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("monthly");

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [1200, 1900, 2300, 2100, 2800, 3200],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.08)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "#f59e0b",
      },
      {
        label: "Active Users",
        data: [8000, 9500, 11200, 12800, 14100, 16200],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        fill: true,
        tension: 0.3,
        pointBackgroundColor: "#3b82f6",
      },
    ],
  };

  const transactionVolumeData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Transaction Volume",
        data: [540, 620, 780, 590, 810, 430, 280],
        backgroundColor: "#f59e0b",
        borderRadius: 6,
        barThickness: 16,
      },
    ],
  };

  const kpi = [
    { label: "Total Revenue", value: "$1.24M", change: "+14.2%", up: true },
    { label: "Active Users", value: "16.2k", change: "+8.7%", up: true },
    { label: "Avg. Transaction", value: "$842", change: "+5.3%", up: true },
    { label: "Bounce Rate", value: "23.4%", change: "-2.1%", up: false },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" breadcrumb="Insights / Overview" />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpi.map((item, idx) => (
          <Card key={idx}>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-400">{item.label}</span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.up ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}
              >
                {item.change}
              </span>
            </div>
            <div className="text-2xl font-serif font-bold text-white mt-2">
              {item.value}
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">User Growth</h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-300"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="h-64">
            <Line
              data={userGrowthData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { labels: { color: "#9ca3af", usePointStyle: true } },
                },
                scales: {
                  x: {
                    grid: { color: "rgba(75,85,99,0.2)" },
                    ticks: { color: "#9ca3af" },
                  },
                  y: {
                    grid: { color: "rgba(75,85,99,0.2)" },
                    ticks: { color: "#9ca3af" },
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">
            Transaction Volume (This Week)
          </h3>
          <div className="h-64">
            <Bar
              data={transactionVolumeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false }, ticks: { color: "#9ca3af" } },
                  y: {
                    grid: { color: "rgba(75,85,99,0.2)" },
                    ticks: { color: "#9ca3af" },
                  },
                },
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
export default AdminAnalyticsPage;
