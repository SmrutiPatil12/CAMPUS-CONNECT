import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/dashboard");  // redirect
  };

  return (
    <div className="form-container">
      <p className="title">Create Account</p>

      <form className="form" onSubmit={handleSignup}>
        <input type="text" className="input" placeholder="Full Name" required />
        <input type="email" className="input" placeholder="Email" required />
        <input type="password" className="input" placeholder="Password" required />
        <input type="password" className="input" placeholder="Confirm Password" required />
        <input type="text" className="input" placeholder="Department / Branch" required />

        <select className="input" onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="authority">Higher Authority</option>
        </select>

        {role === "student" && (
          <input type="text" className="input" placeholder="Roll No / PRN" required />
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
    </div>
  );
};

export default Signup;
