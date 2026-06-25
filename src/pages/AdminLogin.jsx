import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function AdminLogin() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }

      setLoading(true);
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`${backendUrl}/api/auth/admin-login`, {
        email,
        password,
      });

      if (data.success) {
        setIsLoggedin(true);
        toast.success("Admin login successful", { autoClose: 1000 });
        await getUserData();
        navigate("/admindashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-slate-800 p-10 rounded-lg shadow-2xl w-full sm:w-96 text-indigo-300 text-sm border border-purple-500/30">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-600 mb-3">
            <span className="text-white text-xl">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
          <p className="text-xs text-gray-400 mt-1">Secure admin access</p>
        </div>

        <form onSubmit={onSubmitHandler}>
          {/* EMAIL INPUT */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#1a1f3a] border border-purple-500/40 focus-within:border-purple-400">
            <svg
              className="w-4 h-4 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Admin Email"
              required
              className="bg-transparent outline-none text-sm text-gray-300 w-full placeholder-gray-500"
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#1a1f3a] border border-purple-500/40 focus-within:border-purple-400">
            <svg
              className="w-4 h-4 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none text-sm text-gray-300 w-full placeholder-gray-500"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Admin Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-gray-400 text-center text-xs mt-6 border-t border-purple-500/30 pt-4">
          Not an admin?{" "}
          <span
            onClick={() => navigate("/loginpage")}
            className="text-purple-400 hover:text-purple-300 underline cursor-pointer"
          >
            User Login
          </span>
        </p>

        <div className="text-xs text-gray-500 text-center mt-4">
          <p>⚠️ This is a restricted area for administrators only</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
