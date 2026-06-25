import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../component/SideBar";
const Analytics = () => {
  // Sample Data
  const monthlyData = [
    { month: "Jan", income: 5800, expense: 4200 },
    { month: "Feb", income: 6200, expense: 4500 },
    { month: "Mar", income: 6500, expense: 4700 },
    { month: "Apr", income: 6700, expense: 4523 },
    { month: "May", income: 6900, expense: 4800 },
    { month: "Jun", income: 7100, expense: 5000 },
  ];

  const categories = [
    { name: "Food", value: 35 },
    { name: "Transport", value: 20 },
    { name: "Shopping", value: 25 },
    { name: "Bills", value: 20 },
  ];

  const totalIncome = monthlyData.reduce((a, b) => a + b.income, 0);
  const totalExpense = monthlyData.reduce((a, b) => a + b.expense, 0);
  const savingsRate = ((totalIncome - totalExpense) / totalIncome) * 100;

  return (
    <div className="flex">
        <Sidebar />
    <div className="min-h-screen w-[1000vw] p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Income" value={totalIncome} color="green" />
        <Card title="Total Expense" value={totalExpense} color="red" />
        <Card title="Savings Rate" value={savingsRate.toFixed(1) + "%"} color="indigo" />
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Bar Chart */}
        <motion.div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow">
          <h3 className="mb-4 font-semibold text-gray-700 dark:text-white">
            Monthly Overview
          </h3>

          <div className="flex items-end gap-3 h-64">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="flex gap-1 h-48">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.income / 8000) * 100}%` }}
                    className="w-4 bg-green-400 rounded-t"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.expense / 8000) * 100}%` }}
                    className="w-4 bg-red-400 rounded-t"
                  />
                </div>
                <span className="text-xs mt-2 text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow">
          <h3 className="mb-4 font-semibold text-gray-700 dark:text-white">
            Spending Breakdown
          </h3>

          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
              {totalExpense}
            </div>

            <div className="mt-4 space-y-2">
              {categories.map((cat, i) => (
                <div key={i} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>{cat.name}</span>
                  <span>{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insight Section */}
      <motion.div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">
          Insights
        </h3>

        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>💡 You spent 35% on food — consider reducing this.</li>
          <li>📈 Your income is steadily increasing month by month.</li>
          <li>💰 Savings rate is healthy at {savingsRate.toFixed(1)}%.</li>
        </ul>
      </motion.div>
    </div>
    </div>
  );
};

// Reusable Card Component
const Card = ({ title, value, color }) => {
  const colorMap = {
    green: "text-green-500",
    red: "text-red-500",
    indigo: "text-indigo-500",
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-xl font-bold ${colorMap[color]}`}>
        {typeof value === "number" ? `$${value.toLocaleString()}` : value}
      </h2>
    </div>
  );
};

export default Analytics;