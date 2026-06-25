import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../component/SideBar";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";

// ========== Animated Number Counter ==========
const AnimatedNumber = ({ value, prefix = "", suffix = "", decimals = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const end = parseFloat(value);
    if (isNaN(end)) return;

    const duration = 800;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const formatted = displayValue
    .toFixed(decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

// ========== Stat Card ==========
const StatCard = ({
  title,
  amount,
  change,
  changeType,
  icon,
  prefix = "$",
  delay = 0,
}) => {
  const isPositive = changeType === "positive";
  const changeColor =
    title === "Expenses" && changeType === "positive"
      ? "text-green-500"
      : isPositive
        ? "text-green-500"
        : "text-red-500";

  const changeArrow =
    title === "Expenses" && changeType === "positive"
      ? "↓"
      : isPositive
        ? "↑"
        : "↓";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all"
    >
      <div className="flex justify-between mb-4">
        <span className="text-gray-500 text-sm">{title}</span>
        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
          {icon}
        </div>
      </div>

      <div className="mb-2 text-2xl font-bold text-gray-800">
        <AnimatedNumber value={amount} prefix={prefix} />
      </div>

      <div className={`flex gap-1 text-sm ${changeColor}`}>
        <span>
          {changeArrow} {Math.abs(change)}%
        </span>
        <span className="text-gray-400 text-xs">from last month</span>
      </div>
    </motion.div>
  );
};

// ========== Spending Trends ==========
const SpendingTrends = () => {
  const data = [
    { month: "Jan", income: 5800, expense: 4200 },
    { month: "Feb", income: 6200, expense: 4500 },
    { month: "Mar", income: 6500, expense: 4700 },
    { month: "Apr", income: 6700, expense: 4523 },
    { month: "May", income: 6900, expense: 4800 },
    { month: "Jun", income: 7100, expense: 5000 },
  ];

  const max = 8000;

  return (
    <motion.div className="bg-white/80 rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Spending Trends</h3>

      <div className="flex items-end gap-2 h-64">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="flex gap-1 h-48">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.income / max) * 100}%` }}
                className="w-5 bg-green-400 rounded-t"
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.expense / max) * 100}%` }}
                className="w-5 bg-red-400 rounded-t"
              />
            </div>
            <span className="text-xs mt-2">{d.month}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ========== Recent Transactions ==========
const RecentTransactions = () => {
  const txs = [
    { name: "Salary", amount: "+$6,500", type: "income" },
    { name: "Netflix", amount: "-$15.99", type: "expense" },
    { name: "Groceries", amount: "-$120", type: "expense" },
  ];

  return (
    <motion.div className="bg-white/80 rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>

      {txs.map((tx, i) => (
        <div key={i} className="flex justify-between mb-3">
          <span>{tx.name}</span>
          <span
            className={tx.type === "income" ? "text-green-500" : "text-red-500"}
          >
            {tx.amount}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

// ========== Main Dashboard ==========
const Dashboard = () => {
  const stats = [
    {
      title: "Balance",
      amount: "16245.80",
      change: 12.5,
      changeType: "positive",
      icon: "💰",
    },
    {
      title: "Income",
      amount: "6500.00",
      change: 8.2,
      changeType: "positive",
      icon: "📈",
    },
    {
      title: "Expenses",
      amount: "4523.20",
      change: 3.1,
      changeType: "positive",
      icon: "📉",
    },
    {
      title: "Savings",
      amount: "8940.00",
      change: 15.8,
      changeType: "positive",
      icon: "🏦",
    },
  ];
  const { userData } = useContext(AppContent);
  return (
    <div className="flex">
      <Sidebar />
      <div className=" min-h-screen w-[1000vw] bg-gradient-to-br from-indigo-50 to-white p-6">
        <div className="flex align-center text-center gap-6">
          {" "}
          <h1 className="text-3xl font-bold mb-6">Finlumen Dashboard</h1>
          <br />{" "}
          <h1 className="mt-2 font-bold">
            Hey {userData ? userData.name : ""}!
          </h1>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} delay={i * 0.1} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <SpendingTrends />
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
