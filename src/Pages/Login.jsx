import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../Services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      setError("");
      await authAPI.login(form.email, form.password);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
    
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
      
      {/* Logo / Title */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-md text-xl">
          ⚡
        </div>
        <h1 className="text-xl font-semibold mt-3 text-gray-800">AI Chat</h1>
        <p className="text-sm text-gray-500">Gemini powered assistant</p>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Welcome Back
      </h2>
      <p className="text-sm text-gray-500 text-center mt-1 mb-6">
        Login to continue your chat
      </p>

      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        className="w-full mb-4 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
      )}

      {/* Button */}
      <button
        onClick={login}
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
      >
        Sign In
      </button>

      {/* Footer */}
      <p
        className="mt-6 text-center text-sm text-gray-500 hover:text-blue-600 cursor-pointer"
        onClick={() => navigate("/signup")}
      >
        New here?{" "}
        <span className="font-semibold underline underline-offset-4">
          Create account
        </span>
      </p>
    </div>
  </div>
);
}
