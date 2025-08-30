import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
  });

  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;
      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,
            {},
            { withCredentials: true }
          );
          setUser(res.data.user);
          return api(originalRequest);
        } catch (refreshErr) {
          setUser(null);
          return Promise.reject(refreshErr);
        }
      }
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      setUser(res.data.user);
      return true;
    } catch {
      return false;
    }
  };

  const demoLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email: "demo@example.com",
        password: "demopassword",
      });
      setUser(res.data.user);
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, login, demoLogin, logout, loading, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;