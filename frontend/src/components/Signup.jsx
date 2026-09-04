
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axiosInstance.post("/v1/user/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex bg-white">
      {/* Left: brand / preview panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-indigo-700 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-indigo-600/40" />
        <div className="absolute -left-16 bottom-0 w-72 h-72 rounded-full bg-indigo-800/50" />

        <span className="relative text-white text-xl font-semibold tracking-tight">
          Pulse
        </span>

        <div className="relative space-y-3">
          <div className="max-w-[75%] bg-white/95 rounded-2xl rounded-bl-sm px-4 py-3 shadow-lg">
            <p className="text-sm text-gray-800">hey, you free to review the deck tonight?</p>
            <span className="text-[11px] text-gray-400 mt-1 block">9:41 PM</span>
          </div>
          <div className="max-w-[75%] bg-indigo-500 rounded-2xl rounded-br-sm px-4 py-3 shadow-lg ml-auto">
            <p className="text-sm text-white">yep, send it over</p>
            <span className="text-[11px] text-indigo-100 mt-1 block">9:42 PM</span>
          </div>
          <div className="max-w-[75%] bg-white/95 rounded-2xl rounded-bl-sm px-4 py-3 shadow-lg">
            <p className="text-sm text-gray-800">on it 🚀</p>
            <span className="text-[11px] text-gray-400 mt-1 block">9:42 PM</span>
          </div>
        </div>

        <p className="relative text-indigo-100 text-sm leading-relaxed max-w-xs">
          Conversations that keep up with you. Real-time, everywhere, no delay.
        </p>
      </div>

      {/* Right: form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Create your account
          </h1>
          <p className="text-gray-500 text-sm mt-2 mb-8">
            Already have one?{" "}
            <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-700">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="yourname"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <input
                id="email"
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
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1.5">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
                placeholder="At least 8 characters"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition mt-2"
            >
              Create account
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-6 leading-relaxed">
            By signing up, you agree to Pulse's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;