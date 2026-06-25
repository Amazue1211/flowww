import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import dashnoadimg from "../assets/icons8-dashboard-24 (1).png";
import transactionimg from "../assets/icons8-transaction-64.png";
import analyticsimg from "../assets/icons8-analytics-50 (1).png";
import budgetimg from "../assets/icons8-budget-50 (1).png";
import savingsimg from "../assets/icons8-savings-50 (1).png";
import aiimg from "../assets/icons8-ai-30.png";
import profileimg from "../assets/icons8-customer-48.png";
import sidebar from "../assets/icons8-menu-48.png";
import close from "../assets/icons8-close-48.png";
// import logoutimg from "../assets/icons8-log-out-50.png";
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/Dashboard",
      icon: <img src={dashnoadimg} alt="" />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <img className=" mr-4  w-4" src={transactionimg} alt="" />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <img src={analyticsimg} alt="" />,
    },
    { name: "Budget", path: "/budget", icon: <img src={budgetimg} alt="" /> },
    {
      name: "Savings",
      path: "/savings",
      icon: <img src={savingsimg} alt="" />,
    },
    { name: "AI Assistant", path: "/ai", icon: <img src={aiimg} alt="" /> },
    {
      name: "Profile",
      path: "/profile",
      icon: <img src={profileimg} alt="" />,
    },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 240 }}
      className=" bg-black  dark:bg-gray-900  shadow-lg flex flex-col justify-between transition-all duration-300"
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <img src="" alt="" />
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-900 hover:text-indigo-500 cursor-pointer"
          >
            {collapsed ? (
              <img src={sidebar} alt="Expand" />
            ) : (
              <img className="w-5" src={close} alt="Collapse" />
            )}
          </button>
          {!collapsed && (
            <h1 className="text-xl font-bold text-indigo-600">FinFlow</h1>
          )}
        </div>

        {/* Menu */}
        <nav className="mt-4 flex flex-col gap-2  ">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 mx-2 px-3 py-2 rounded-xl transition-all 
                ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "text-gray-100 dark:text-gray-100 hover:bg-indigo-100 dark:hover:bg-gray-800"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition">
          <span className="cursor-pointer"></span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
