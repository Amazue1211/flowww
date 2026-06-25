import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!form.email || !form.password) return alert("Fill all fields");

    // fake login (replace with backend later)
    localStorage.setItem("token", "demo-token");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
      >

        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Welcome Back
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 mb-4 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 transition"
        >
          Login
        </button>

        {/* Link */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-500">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;