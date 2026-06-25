// ----------------------------------------------------------------------
// 6. SETTINGS PAGE
// ----------------------------------------------------------------------
import PageHeader from "./adminAnalytics";
import { useState } from "react";
import Card from "./adminAnalytics";
const SettingsPage = () => {
  const [formData, setFormData] = useState({
    companyName: "FinTrust Inc.",
    supportEmail: "support@fintrust.com",
    timezone: "UTC-5",
    twoFactor: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Settings" breadcrumb="System / Configuration" />

      <Card>
        <h3 className="text-lg font-semibold text-white mb-5">
          Organization Profile
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Support Email
            </label>
            <input
              type="email"
              name="supportEmail"
              value={formData.supportEmail}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Timezone</label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
            >
              <option>UTC-5</option>
              <option>UTC+0</option>
              <option>UTC+1</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-5">Security</h3>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-200">
            Two-Factor Authentication
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="twoFactor"
              checked={formData.twoFactor}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>
        <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-amber-500/20 border border-amber-500/30 rounded-lg hover:bg-amber-500/30 transition-colors">
          Change Password
        </button>
      </Card>

      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors text-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
};
export default SettingsPage;
