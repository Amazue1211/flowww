import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../component/SideBar";
const Savings = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: "MacBook", target: 1500, saved: 900 },
    { id: 2, title: "Emergency Fund", target: 3000, saved: 1200 },
    { id: 3, title: "Vacation", target: 2000, saved: 2000 },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
  });

  const totalSaved = goals.reduce((a, b) => a + b.saved, 0);
  const totalTarget = goals.reduce((a, b) => a + b.target, 0);

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) return;

    setGoals([
      ...goals,
      {
        id: Date.now(),
        title: newGoal.title,
        target: Number(newGoal.target),
        saved: 0,
      },
    ]);

    setNewGoal({ title: "", target: "" });
  };

  const addMoney = (id, amount = 100) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, saved: Math.min(g.saved + amount, g.target) }
          : g
      )
    );
  };

  return (
    <div className="flex">
        <Sidebar />
    <div className="min-h-screen w-[1000vw] p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Savings Tracker
      </h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Saved" value={`$${totalSaved}`} />
        <Card title="Target Goal" value={`$${totalTarget}`} />
        <Card title="Remaining" value={`$${totalTarget - totalSaved}`} />
      </div>

      {/* Goals List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 mb-6">
        <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
          Savings Goals
        </h3>

        <div className="space-y-5">
          {goals.map((goal) => {
            const percent = (goal.saved / goal.target) * 100;
            const completed = percent >= 100;

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border dark:border-gray-700"
              >
                {/* Title */}
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium text-gray-700 dark:text-white">
                    {goal.title}
                  </h4>
                  <span className="text-sm text-gray-500">
                    ${goal.saved} / ${goal.target}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percent, 100)}%` }}
                    className={`h-3 rounded-full ${
                      completed
                        ? "bg-green-500"
                        : percent > 70
                        ? "bg-yellow-400"
                        : "bg-indigo-500"
                    }`}
                  />
                </div>

                {/* Status */}
                {completed && (
                  <p className="text-green-500 text-xs mt-1">
                    🎉 Goal Completed!
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => addMoney(goal.id, 100)}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600"
                  >
                    + Add $100
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Goal */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
          Add New Savings Goal
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Goal Title"
            value={newGoal.title}
            onChange={(e) =>
              setNewGoal({ ...newGoal, title: e.target.value })
            }
            className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Target Amount"
            value={newGoal.target}
            onChange={(e) =>
              setNewGoal({ ...newGoal, target: e.target.value })
            }
            className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <button
            onClick={addGoal}
            className="bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
          >
            Add Goal
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

export default Savings;