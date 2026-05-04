import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../Services/api";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      setError("");
      await authAPI.signup(form.email, form.password);
      alert("Account created!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating account");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12">
    
    <div className="w-full max-w-md animate-fade-in">
      
      <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-md text-white">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8.5 12H15.5M12 8.5V15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AI Chat</h1>
            <p className="text-sm text-gray-500">Gemini powered</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-8">
            Join thousands chatting with AI
          </p>

          <div className="space-y-4">
            
            {/* Email */}
            <input
              type="email"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              placeholder="Email address"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            {/* Password */}
            <input
              type="password"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              placeholder="Password"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 p-3 bg-red-50 rounded-lg border border-red-200">
                {error}
              </p>
            )}

            {/* Button */}
            <button
              onClick={register}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
            >
              Create Account
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Have an account?{" "}
            <button
              className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2 transition"
              onClick={() => navigate("/")}
            >
              Sign In
            </button>
          </p>
        </div>

      </div>
    </div>
  </div>
);
}
