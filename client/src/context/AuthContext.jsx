// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // THIS LINE IS CRITICAL — adds token to ALL requests
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        console.log("Token invalid or expired");
        localStorage.removeItem("token");
        delete API.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/api/auth/login", { email, password });
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`; // THIS LINE FIXES EVERYTHING
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};