// Dashboard.jsx
// Install dependencies:
// npm install react-chartjs-2 chart.js

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
);

import { useContext } from "react";
import { AppContent } from "../context/AppContext";

// ---------------- Mock Data (fallback) ----------------
let KPIData = [
  {
    title: "Total Revenue (MTD)",
    value: "$0",
    trend: "+0%",
    icon: "💰",
    color: "amber",
  },
  {
    title: "Active Users",
    value: "0",
    trend: "+0%",
    icon: "👥",
    color: "blue",
  },
  {
    title: "Transactions",
    value: "0",
    trend: "+0%",
    icon: "🔄",
    color: "teal",
  },
  {
    title: "Success Rate",
    value: "0%",
    trend: "+0%",
    icon: "✅",
    color: "green",
  },
];

let transactions = [];

// ---------------- Sub Components ----------------

const Sidebar = ({ mobileOpen, onClose }) => {
  const navItems = [
    { label: "Dashboard", icon: "📊", active: true },
    { label: "Analytics", icon: "📈", badge: 4 },
    { label: "Customers", icon: "👤" },
    { label: "Transactions", icon: "💸" },
    { label: "Invoices", icon: "📄" },
    { label: "Compliance", icon: "🛡️" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-950 border-r border-gray-800 z-50 transform transition-transform duration-300 ease-in-out 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:z-0`}
      >
        <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-800">
          <div className="w-10 h-10 bg-amber-900/30 border border-amber-500/40 rounded-lg flex items-center justify-center">
            <span className="text-amber-400 text-xl">🏦</span>
          </div>
          <div>
            <h1 className="font-serif text-lg font-semibold text-white">
              FinTrust
            </h1>
            <span className="text-xs uppercase tracking-widest text-amber-600/80">
              Admin
            </span>
          </div>
        </div>

        <nav className="mt-4 px-3 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors 
                ${
                  item.active
                    ? "bg-amber-500/10 text-amber-300 border-l-2 border-amber-500"
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                }
              `}
            >
              <span className="w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-amber-800 border border-amber-500/40 flex items-center justify-center text-white text-sm font-bold">
              AR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Alexander R.
              </p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ onMenuClick }) => (
  <header className="bg-gray-900 border-b border-gray-800 px-4 md:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-30">
    <div className="flex items-center gap-3">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-400 hover:text-white p-1 rounded"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <h2 className="text-xl font-serif font-semibold text-white">Dashboard</h2>
      <span className="text-xs text-gray-500 hidden sm:block">/ Overview</span>
    </div>

    <div className="flex items-center gap-3 md:gap-4">
      <div className="relative hidden sm:block">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 border border-gray-700 rounded-full pl-9 pr-4 py-1.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500/50 w-40 md:w-56"
        />
        <svg
          className="absolute left-3 top-2 w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <button className="relative p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </button>

      <div className="w-8 h-8 rounded-full bg-amber-800 border border-amber-500/40 flex items-center justify-center text-white text-sm font-bold">
        AR
      </div>
    </div>
  </header>
);

const KPICard = ({ title, value, trend, icon, color }) => {
  const colorClasses = {
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colorClasses[color]}`}
        >
          {icon}
        </span>
        <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
          {trend}
        </span>
      </div>
      <div className="font-serif text-2xl font-bold text-white mb-1">
        {value}
      </div>
      <div className="text-xs text-gray-500 uppercase tracking-wide">
        {title}
      </div>
    </div>
  );
};

const RevenueChart = () => {
  const [period, setPeriod] = useState("6M");

  const dataSets = {
    "6M": {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [62000, 78500, 91000, 84000, 102000, 118000],
    },
    "1Y": {
      labels: [
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
      ],
      data: [
        54000, 58000, 67000, 72000, 69000, 81000, 62000, 78500, 91000, 84000,
        102000, 118000,
      ],
    },
    ALL: {
      labels: ["2022", "Q1 23", "Q2 23", "Q3 23", "Q4 23", "Q1 24", "Q2 24"],
      data: [380000, 145000, 168000, 192000, 225000, 268000, 304000],
    },
  };

  const current = dataSets[period];

  const chartData = {
    labels: current.labels,
    datasets: [
      {
        label: "Revenue (USD)",
        data: current.data,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.05)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: "#f59e0b",
        pointBorderColor: "#111827",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#e5e7eb",
        bodyColor: "#fbbf24",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (ctx) => `$${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(75, 85, 99, 0.2)" },
        ticks: { color: "#9ca3af" },
      },
      y: {
        grid: { color: "rgba(75, 85, 99, 0.2)" },
        ticks: {
          color: "#9ca3af",
          callback: (v) => `$${(v / 1000).toFixed(0)}k`,
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Monthly breakdown
          </p>
        </div>
        <div className="flex gap-1">
          {["6M", "1Y", "ALL"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                period === p
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

const DonutChart = () => {
  const data = {
    labels: ["Wire Transfer", "ACH", "Card Payment", "Crypto", "Check"],
    datasets: [
      {
        data: [38, 27, 22, 9, 4],
        backgroundColor: [
          "#f59e0b",
          "#3b82f6",
          "#10b981",
          "#f97316",
          "#6b7280",
        ],
        borderColor: "#111827",
        borderWidth: 3,
      },
    ],
  };

  const options = {
    cutout: "65%",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#9ca3af",
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8,
          font: { size: 11 },
        },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#e5e7eb",
        bodyColor: "#fbbf24",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Transaction Types</h3>
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Distribution by method
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center max-w-[220px] mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

const TransactionTable = () => {
  const statusColors = {
    completed: "text-green-400 bg-green-400/10",
    pending: "text-amber-400 bg-amber-400/10",
    processing: "text-blue-400 bg-blue-400/10",
    failed: "text-red-400 bg-red-400/10",
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border-b border-gray-800 gap-3">
        <h3 className="text-lg font-semibold text-white">
          Recent Transactions
        </h3>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white border border-gray-700 rounded-full hover:bg-gray-800 transition-colors">
            Filter
          </button>
          <button className="px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full hover:bg-amber-500/20 transition-colors">
            View All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-950 text-xs text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Transaction ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-amber-600/80 text-xs">
                  {txn.id}
                </td>
                <td className="px-4 py-3 font-medium text-white">
                  {txn.customer}
                </td>
                <td className="px-4 py-3 font-mono text-white">{txn.amount}</td>
                <td className="px-4 py-3 text-gray-400">{txn.date}</td>
                <td className="px-4 py-3 text-gray-300">{txn.method}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[txn.status]}`}
                  >
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-4 border-t border-gray-800 text-xs text-gray-500">
        <span>
          Showing <strong className="text-gray-300">1-8</strong> of{" "}
          <strong className="text-gray-300">1,284</strong>
        </span>
        <div className="flex gap-1">
          <button className="w-7 h-7 rounded bg-amber-500/20 text-amber-300 font-medium">
            1
          </button>
          <button className="w-7 h-7 rounded hover:bg-gray-800 text-gray-400">
            2
          </button>
          <button className="w-7 h-7 rounded hover:bg-gray-800 text-gray-400">
            3
          </button>
          <button className="w-7 h-7 rounded hover:bg-gray-800 text-gray-400">
            →
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------------- Main Dashboard ----------------
export default function Dashboard() {
  const { backendUrl } = useContext(AppContent);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch overview
  useEffect(() => {
    setSidebarOpen(false);
    (async () => {
      try {
        const res = await fetch(`${backendUrl}/api/admin/overview`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setOverview(data.overview);
        }
      } catch (e) {
        console.error("Failed to load admin overview", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [backendUrl]);

  // derive KPIData and transactions from overview if available
  if (overview) {
    KPIData = [
      {
        title: "Total Revenue",
        value: `$${Number(overview.totalRevenue || 0).toLocaleString()}`,
        trend: "+0%",
        icon: "💰",
        color: "amber",
      },
      {
        title: "Active Users",
        value: `${overview.usersCount || 0}`,
        trend: "+0%",
        icon: "👥",
        color: "blue",
      },
      {
        title: "Transactions",
        value: `${overview.transactionsCount || 0}`,
        trend: "+0%",
        icon: "🔄",
        color: "teal",
      },
      {
        title: "Success Rate",
        value: "98.7%",
        trend: "+0.3%",
        icon: "✅",
        color: "green",
      },
    ];

    transactions = (overview.recentTransactions || []).map((t) => ({
      id: t._id,
      customer: t.name || t.userId || "—",
      amount: `$${Number(t.amount).toLocaleString()}`,
      method: t.method || t.type || "—",
      status: t.status || "completed",
      date: t.date ? new Date(t.date).toISOString().split("T")[0] : "—",
    }));
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
          {/* KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KPIData.map((kpi, idx) => (
              <KPICard key={idx} {...kpi} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <div className="lg:col-span-1">
              <DonutChart />
            </div>
          </div>

          {/* Transactions Table */}
          {loading ? (
            <div className="text-center text-gray-400">Loading overview...</div>
          ) : (
            <TransactionTable />
          )}
        </main>
      </div>
    </div>
  );
}
