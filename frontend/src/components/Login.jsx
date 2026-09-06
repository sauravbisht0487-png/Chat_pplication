// frontend/src/components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/v1/user/login", form);
      setAuthUser(data);
      localStorage.setItem("chatUser", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex lg:w-5/12 bg-indigo-700 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-indigo-600/40" />
        <div className="absolute -left-16 bottom-0 w-72 h-72 rounded-full bg-indigo-800/50" />
        <span className="relative text-white text-xl font-semibold tracking-tight">Pulse</span>
        <div className="relative space-y-3">
          <div className="max-w-[75%] bg-white/95 rounded-2xl rounded-bl-sm px-4 py-3 shadow-lg">
            <p className="text-sm text-gray-800">good to have you back</p>
            <span className="text-[11px] text-gray-400 mt-1 block">just now</span>
          </div>
          <div className="max-w-[75%] bg-indigo-500 rounded-2xl rounded-br-sm px-4 py-3 shadow-lg ml-auto">
            <p className="text-sm text-white">missed this 👋</p>
            <span className="text-[11px] text-indigo-100 mt-1 block">just now</span>
          </div>
        </div>
        <p className="relative text-indigo-100 text-sm leading-relaxed max-w-xs">
          Conversations that keep up with you. Real-time, everywhere, no delay.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-2 mb-8">
            New here?{" "}
            <Link to="/register" className="text-indigo-600 font-medium hover:text-indigo-700">
              Create an account
            </Link>
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="yourname"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition mt-2 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;