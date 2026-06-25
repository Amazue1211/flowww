// ----------------------------------------------------------------------
// 2. CUSTOMERS PAGE
// ----------------------------------------------------------------------
import PageHeader from "./adminAnalytics";
import Card from "./adminAnalytics";
import StatusBadge from "./adminAnalytics";
const CustomersPage = () => {
  const customers = [
    {
      id: 1,
      name: "Eleanor Vance",
      email: "e.vance@example.com",
      status: "active",
      joined: "2024-01-15",
      country: "US",
    },
    {
      id: 2,
      name: "Marcus Chen",
      email: "m.chen@example.com",
      status: "active",
      joined: "2024-03-22",
      country: "CA",
    },
    {
      id: 3,
      name: "Priya Kapoor",
      email: "p.kapoor@example.com",
      status: "inactive",
      joined: "2023-11-08",
      country: "IN",
    },
    {
      id: 4,
      name: "James O'Brien",
      email: "j.obrien@example.com",
      status: "active",
      joined: "2024-05-04",
      country: "UK",
    },
    {
      id: 5,
      name: "Sofia Ramirez",
      email: "s.ramirez@example.com",
      status: "pending",
      joined: "2024-06-01",
      country: "MX",
    },
    {
      id: 6,
      name: "Thomas Hartley",
      email: "t.hartley@example.com",
      status: "active",
      joined: "2023-09-18",
      country: "AU",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" breadcrumb="Manage / Customer List" />

      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500/50 w-64"
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
            + Add Customer
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-950 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Country</th>
                <th className="px-4 py-3 text-left">Joined</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {customers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-white">
                    {cust.name}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{cust.email}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={cust.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-300">{cust.country}</td>
                  <td className="px-4 py-3 text-gray-400">{cust.joined}</td>
                  <td className="px-4 py-3">
                    <button className="text-amber-400 hover:text-amber-300 text-xs font-medium">
                      View
                    </button>
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
export default CustomersPage;
