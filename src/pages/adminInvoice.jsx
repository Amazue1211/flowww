// ----------------------------------------------------------------------
// 4. INVOICES PAGE
// ----------------------------------------------------------------------
import PageHeader from "./adminAnalytics";
const InvoicesPage = () => {
  const invoices = [
    {
      id: "INV-2024-001",
      client: "Acme Corp",
      amount: "$4,800",
      issued: "2024-06-01",
      due: "2024-07-01",
      status: "paid",
    },
    {
      id: "INV-2024-002",
      client: "Globex Inc",
      amount: "$12,500",
      issued: "2024-06-05",
      due: "2024-07-05",
      status: "pending",
    },
    {
      id: "INV-2024-003",
      client: "Initech",
      amount: "$3,200",
      issued: "2024-05-20",
      due: "2024-06-20",
      status: "overdue",
    },
    {
      id: "INV-2024-004",
      client: "Umbrella Co",
      amount: "$7,100",
      issued: "2024-06-10",
      due: "2024-07-10",
      status: "draft",
    },
    {
      id: "INV-2024-005",
      client: "Stark Industries",
      amount: "$22,000",
      issued: "2024-05-15",
      due: "2024-06-15",
      status: "paid",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" breadcrumb="Billing / Invoice List" />

      <Card>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search invoices..."
              className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500/50 w-56"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-500"
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
          <button className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-lg text-sm font-medium hover:bg-amber-500/20">
            + Create Invoice
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-950 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Invoice #</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Issued</th>
                <th className="px-4 py-3 text-left">Due Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-amber-600/80 text-xs">
                    {inv.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">
                    {inv.client}
                  </td>
                  <td className="px-4 py-3 font-mono text-white">
                    {inv.amount}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{inv.issued}</td>
                  <td className="px-4 py-3 text-gray-400">{inv.due}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-amber-400 hover:text-amber-300 text-xs font-medium">
                        View
                      </button>
                      <button className="text-gray-400 hover:text-white text-xs font-medium">
                        Download
                      </button>
                    </div>
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
export default InvoicesPage;
