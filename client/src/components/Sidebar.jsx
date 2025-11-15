import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // If you add token later:
    // localStorage.removeItem("token");
    navigate("/");  // redirect to login page
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Campus Connect</h2>

      <ul className="sidebar-menu">

        <li><Link to="/dashboard" className="sidebar-link">🏠 Dashboard</Link></li>

        <li><Link to="/announcements" className="sidebar-link">📢 Announcements</Link></li>

        <li><Link to="/community" className="sidebar-link">👥 Community</Link></li>

        <li><Link to="/events" className="sidebar-link">📅 Events</Link></li>

      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}
