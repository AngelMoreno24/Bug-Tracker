import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  const [loading, setLoading] = useState(true);

  // Configure axios to send cookies
  axios.defaults.withCredentials = true;

  // Refresh access token on mount
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

        // store token in localStorage so reloads keep it
        localStorage.setItem("accessToken", res.data.token);
      } catch (err) {
        console.log("User not logged in");
        setUser(null);
        setToken(null);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    refreshUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("accessToken", res.data.token);

      navigate("/accounts/dashboard", { replace: true });
      return true;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return false;
    }
  };

  // Demo login
  const demoLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email: "demo@example.com", password: "demopassword" },
        { withCredentials: true }
      );

      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("accessToken", res.data.token);

      navigate("/accounts/dashboard", { replace: true });
      return true;
    } catch (err) {
      console.error("Demo login failed:", err.response?.data || err.message);
      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      setToken(null);
      localStorage.removeItem("accessToken");

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  // Block rendering until refresh completes
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, demoLogin, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;