// ----------------------------------------------------------------------
// 3. TRANSACTIONS PAGE
// ----------------------------------------------------------------------
import PageHeader from "./adminAnalytics";
import { useState } from "react";
export const TransactionsPage = () => {
  const [filter, setFilter] = useState("all");
  const transactions = [
    {
      id: "TXN-08421",
      customer: "Eleanor Vance",
      amount: "$12,450",
      method: "Wire",
      status: "completed",
      date: "2024-06-18",
    },
    {
      id: "TXN-08420",
      customer: "Marcus Chen",
      amount: "$3,820",
      method: "ACH",
      status: "completed",
      date: "2024-06-18",
    },
    {
      id: "TXN-08419",
      customer: "Priya Kapoor",
      amount: "$28,900",
      method: "Wire",
      status: "pending",
      date: "2024-06-17",
    },
    {
      id: "TXN-08418",
      customer: "James O'Brien",
      amount: "$1,245",
      method: "Card",
      status: "completed",
      date: "2024-06-17",
    },
    {
      id: "TXN-08417",
      customer: "Sofia Ramirez",
      amount: "$8,600",
      method: "Crypto",
      status: "processing",
      date: "2024-06-16",
    },
    {
      id: "TXN-08416",
      customer: "Thomas Hartley",
      amount: "$15,320",
      method: "ACH",
      status: "completed",
      date: "2024-06-16",
    },
    {
      id: "TXN-08415",
      customer: "Yuki Tanaka",
      amount: "$4,100",
      method: "Card",
      status: "failed",
      date: "2024-06-15",
    },
    {
      id: "TXN-08414",
      customer: "David Sterling",
      amount: "$52,000",
      method: "Wire",
      status: "completed",
      date: "2024-06-15",
    },
  ];

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        breadcrumb="Finance / All Transactions"
      />

      <Card>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex gap-2 flex-wrap">
            {["all", "completed", "pending", "processing", "failed"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize ${
                    filter === f
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "text-gray-400 border border-gray-700 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ),
            )}
          </div>
          <div className="relative ml-auto">
            <input
              type="text"
              placeholder="Search by ID..."
              className="bg-gray-800 border border-gray-700 rounded-lg pl-8 pr-4 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500/50 w-48"
            />
            <svg
              className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-500"
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-950 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Transaction ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Method</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredTransactions.map((txn) => (
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
                  <td className="px-4 py-3 font-mono text-white">
                    {txn.amount}
                  </td>
                  <td className="px-4 py-3 text-gray-300">{txn.method}</td>
                  <td className="px-4 py-3 text-gray-400">{txn.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={txn.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
