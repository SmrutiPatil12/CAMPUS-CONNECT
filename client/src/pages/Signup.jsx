import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";


const Signup = () => {
  const [role, setRole] = useState("student");

  return (
    <div className="form-container">
      <p className="title">Create Account</p>
      <form className="form">
        <input type="text" className="input" placeholder="Full Name" required />
        <input type="email" className="input" placeholder="Email" required />
        <input
          type="password"
          className="input"
          placeholder="Password"
          required
        />
        <input
          type="password"
          className="input"
          placeholder="Confirm Password"
          required
        />
        <input
          type="text"
          className="input"
          placeholder="Department / Branch"
          required
        />
        <select
          className="input"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="authority">Higher Authority</option>
        </select>
        {role === "student" && (
          <input
            type="text"
            className="input"
            placeholder="Roll No / PRN"
            required
          />
        )}
        <select className="input">
          <option value="">Select Year</option>
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="4th">Final Year</option>
        </select>

        <button className="form-btn">Sign Up</button>
      </form>

      <p className="sign-up-label">
        Already have an account?{" "}
        <Link to="/" className="sign-up-link">Login</Link>
      </p>

      <div className="buttons-container">
        <div className="apple-login-button">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            className="apple-icon"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M747.4 535.7c-.4-68.2 30.5-119.6..."></path>
          </svg>
          <span>Sign up with Apple</span>
        </div>
        <div className="google-login-button">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            x="0px"
            y="0px"
            className="google-icon"
            viewBox="0 0 48 48"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M43.611,20.083H42V20H24v8h11.303..."></path>
          </svg>
          <span>Sign up with Google</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
