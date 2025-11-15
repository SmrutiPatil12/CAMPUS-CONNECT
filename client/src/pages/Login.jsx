import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();  
    navigate("/dashboard");  // redirect after login
  };

  return (
    <div className="form-container login-container">
      <p className="title">Welcome back</p>

      <form className="form" onSubmit={handleLogin}>
        <input type="email" className="input" placeholder="Email" />
        <input type="password" className="input" placeholder="Password" />

        <p className="page-link">
          <span className="page-link-label">Forgot Password?</span>
        </p>

        <button type="submit" className="form-btn">Log in</button>
      </form>

      <p className="sign-up-label">
        Don't have an account? 
        <Link to="/signup" className="sign-up-link">Sign up</Link>
      </p>
    </div>
  );
}
