import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../component/SideBar";
const Budget = () => {
  const [budgets, setBudgets] = useState([
    { category: "Food", limit: 500, spent: 420 },
    { category: "Transport", limit: 300, spent: 180 },
    { category: "Shopping", limit: 400, spent: 450 },
    { category: "Bills", limit: 600, spent: 520 },
  ]);

  const [newBudget, setNewBudget] = useState({
    category: "",
    limit: "",
  });

  const totalLimit = budgets.reduce((a, b) => a + b.limit, 0);
  const totalSpent = budgets.reduce((a, b) => a + b.spent, 0);

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.limit) return;

    setBudgets([
      ...budgets,
      { category: newBudget.category, limit: Number(newBudget.limit), spent: 0 },
    ]);

    setNewBudget({ category: "", limit: "" });
  };

  return (
    <div className="flex">
        <Sidebar />
    <div className="min-h-screen p-6 w-[1000vw] bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Budget Planner
      </h1>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Budget" value={`$${totalLimit}`} />
        <Card title="Total Spent" value={`$${totalSpent}`} />
        <Card
          title="Remaining"
          value={`$${totalLimit - totalSpent}`}
        />
      </div>

      {/* Budget List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 mb-6">
        <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
          Category Budgets
        </h3>

        <div className="space-y-4">
          {budgets.map((b, i) => {
            const percent = (b.spent / b.limit) * 100;
            const isOver = percent > 100;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border dark:border-gray-700"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700 dark:text-white">
                    {b.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    ${b.spent} / ${b.limit}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percent, 100)}%` }}
                    className={`h-3 rounded-full ${
                      isOver
                        ? "bg-red-500"
                        : percent > 70
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    }`}
                  />
                </div>

                {/* Warning */}
                {isOver && (
                  <p className="text-red-500 text-xs mt-1">
                    🚨 Budget exceeded!
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Budget */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
          Add New Budget
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Category"
            value={newBudget.category}
            onChange={(e) =>
              setNewBudget({ ...newBudget, category: e.target.value })
            }
            className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Limit"
            value={newBudget.limit}
            onChange={(e) =>
              setNewBudget({ ...newBudget, limit: e.target.value })
            }
            className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <button
            onClick={handleAddBudget}
            className="bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

// Reusable Card
const Card = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-xl font-bold text-indigo-500">{value}</h2>
  </div>
);

export default Budget;