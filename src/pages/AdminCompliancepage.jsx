import PageHeader from "./adminAnalytics";
import Card from "./adminAnalytics";
const CompliancePage = () => {
  const complianceItems = [
    { title: "KYC Verification", progress: 94, status: "on track" },
    { title: "AML Screening", progress: 88, status: "attention" },
    { title: "GDPR Readiness", progress: 100, status: "complete" },
    { title: "PCI DSS", progress: 76, status: "in progress" },
  ];

  const recentAudits = [
    { id: 1, name: "Q2 AML Audit", date: "2024-04-15", result: "Passed" },
    {
      id: 2,
      name: "Data Protection Review",
      date: "2024-02-28",
      result: "Minor Findings",
    },
    {
      id: 3,
      name: "Transaction Monitoring Check",
      date: "2023-12-10",
      result: "Passed",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Compliance" breadcrumb="Regulatory / Overview" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compliance Progress Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">
            Compliance Readiness
          </h3>
          {complianceItems.map((item, idx) => (
            <Card key={idx} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-200">
                  {item.title}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    item.status === "on track"
                      ? "text-green-400 bg-green-500/10"
                      : item.status === "attention"
                        ? "text-amber-400 bg-amber-500/10"
                        : "text-blue-400 bg-blue-500/10"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">
                {item.progress}% complete
              </span>
            </Card>
          ))}
        </div>

        {/* Recent Audits */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Audits
          </h3>
          <Card className="divide-y divide-gray-800">
            {recentAudits.map((audit) => (
              <div
                key={audit.id}
                className="py-3 first:pt-0 last:pb-0 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium text-white">{audit.name}</p>
                  <p className="text-xs text-gray-500">{audit.date}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    audit.result === "Passed"
                      ? "text-green-400 bg-green-500/10"
                      : "text-amber-400 bg-amber-500/10"
                  }`}
                >
                  {audit.result}
                </span>
              </div>
            ))}
            <button className="w-full text-center text-amber-400 hover:text-amber-300 text-sm font-medium py-2 mt-2">
              View All Reports →
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CompliancePage;
