import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../component/SideBar";
const Transactions = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const transactions = [
    { id: 1, name: "Amazon", category: "Shopping", amount: -124.99, type: "expense", date: "Today" },
    { id: 2, name: "Salary", category: "Income", amount: 6500, type: "income", date: "Today" },
    { id: 3, name: "Starbucks", category: "Food", amount: -8.5, type: "expense", date: "Yesterday" },
    { id: 4, name: "Freelance", category: "Work", amount: 1200, type: "income", date: "Apr 5" },
    { id: 5, name: "Electric Bill", category: "Utilities", amount: -88.4, type: "expense", date: "Apr 7" },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    const matchesFilter = filter === "all" || tx.type === filter;
    const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex">
        <Sidebar />
    <div className="h-[1000px]  w-[1000vw] p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Transactions
        </h1>

        <div className="flex gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none"
          />

          {/* Add Button */}
          <button className="px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition">
            + Add
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["all", "income", "expense"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1 rounded-full text-sm capitalize transition 
              ${filter === type
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4">
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-gray-400 py-6">
            No transactions found
          </p>
        ) : (
          filteredTransactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className="flex justify-between items-center p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
            >
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {tx.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {tx.category} • {tx.date}
                </p>
              </div>

              <div
                className={`font-semibold ${
                  tx.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}$
                {Math.abs(tx.amount).toFixed(2)}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default Transactions;