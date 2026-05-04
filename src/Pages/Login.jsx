import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../Services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const login = async () => {
  setError("");

  // ✅ Validation FIRST (outside try)
  if (!form.email && !form.password) {
    setError("Please enter email and password");
    return;
  }

  if (!form.email) {
    setError("Please enter email");
    return;
  }
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    setError("Please enter a valid email address");
    return;
  }
  if (!form.password) {
    setError("Please enter password");
    return;
  }

  // Email format
  

  try {
    setLoading(true);

    await authAPI.login(form.email, form.password);

    navigate("/chat");
  } catch (err) {
    setError(err.response?.data?.message || "Invalid credentials");
  } finally {
    setLoading(false);
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
  disabled={loading}
  className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 py-4 font-semibold text-white flex items-center justify-center shadow-md hover:opacity-90 transition"
>
  {loading ? (
    <div className="flex items-center gap-2">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      <span>Signing in...</span>
    </div>
  ) : (
    "Login"
  )}
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
