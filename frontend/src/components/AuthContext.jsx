import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // only in memory
  const [loading, setLoading] = useState(true);

  // ✅ Send cookies on all requests
  axios.defaults.withCredentials = true;

  // 🔹 On mount, try refreshing the session
  useEffect(() => {
    const refreshUser = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        setToken(res.data.token);
        setUser(res.data.user);
      } catch {
        console.log("No valid session found");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    refreshUser();
  }, []);

  // 🔹 Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setToken(res.data.token);
      setUser(res.data.user);

      navigate("/accounts/dashboard", { replace: true });
      return true;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return false;
    }
  };

  // 🔹 Demo login
  const demoLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email: "demo@example.com", password: "demopassword" },
        { withCredentials: true }
      );

      setToken(res.data.token);
      setUser(res.data.user);

      navigate("/accounts/dashboard", { replace: true });
      return true;
    } catch (err) {
      console.error("Demo login failed:", err.response?.data || err.message);
      return false;
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null);
      setToken(null);

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  // Prevent rendering until refresh check finishes
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, demoLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;