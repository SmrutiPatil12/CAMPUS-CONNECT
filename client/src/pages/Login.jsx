// src/pages/Login.jsx (or wherever your Login component is)
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // This comes from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call the login function from AuthContext
      await login(email, password);

      // If successful, redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.msg || "Invalid email or password";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container login-container">
      <p className="title">Welcome back</p>

      {error && <p style={{ color: "#e74c3c", fontSize: "14px", margin: "10px 0" }}>{error}</p>}

      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p className="page-link">
          <span className="page-link-label">Forgot Password?</span>
        </p>

        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="sign-up-label">
        Don't have an account?{" "}
        <Link to="/signup" className="sign-up-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}