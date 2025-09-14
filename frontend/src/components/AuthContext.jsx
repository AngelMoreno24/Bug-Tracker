// src/components/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // store access token in memory

  // ✅ Configure axios to send cookies by default
  axios.defaults.withCredentials = true;

  // 🔹 On mount, refresh token
  useEffect(() => {
    const refreshUser = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,
          {},
          { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true }
        );
        setToken(res.data.token); // new access token
        setUser(res.data.user);

        // redirect if user exists
        //navigate("/accounts/dashboard", { replace: true });
      } catch {
        console.log("User not logged in");
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    refreshUser();
  }, [token]);

  // 🔹 Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setToken(res.data.token);
      setUser(res.data.user);

      // redirect after successful login
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

      // redirect after successful demo login
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

      // redirect after logout
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, demoLogin, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;