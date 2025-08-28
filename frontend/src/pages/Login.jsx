import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  // 🔹 State for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);

    // Example API call
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      email,
      password,
    })
    .then((response) => {
      console.log("Login successful:", response.data);
      navigate("/accounts"); // redirect after login
    })
    .catch((error) => {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed! Check your credentials.");
    });
  };

  // 🔹 Demo login handler
  const handleDemoLogin = () => {
    const demoEmail = "demo@example.com";
    const demoPassword = "demopassword";

    axios.post(`${process.env.VITE_BACKEND_URL}/api/auth/login`, {
      email: demoEmail,
      password: demoPassword,
    })
    .then((response) => {
      console.log("Demo login successful:", response.data);
      navigate("/accounts");
    })
    .catch((error) => {
      console.error("Demo login failed:", error.response?.data || error.message);
      alert("Demo login failed!");
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Demo User Button */}
        <button
          onClick={handleDemoLogin}
          className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Sign in as Demo User
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}