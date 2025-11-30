import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="sidebar-light">
      <h2 className="sidebar-logo">Campus Connect</h2>

      <ul className="sidebar-menu">

        <li>
          <NavLink to="/dashboard" className="sidebar-item">
            <span>🏠</span> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/announcements" className="sidebar-item">
            <span>📢</span> Announcements
          </NavLink>
        </li>

        <li>
          <NavLink to="/community" className="sidebar-item">
            <span>👥</span> Community
          </NavLink>
        </li>

        <li>
          <NavLink to="/events" className="sidebar-item">
            <span>📅</span> Events
          </NavLink>
        </li>

        <li>
          <NavLink to="/files" className="sidebar-item">
            <span>📂</span> Files & Notes
          </NavLink>
        </li>

        <li>
          <NavLink to="/notifications" className="sidebar-item">
            <span>🔔</span> Notifications
          </NavLink>
        </li>

        <li>
          <NavLink to="/profile" className="sidebar-item">
            <span>👤</span> Profile
          </NavLink>
        </li>

      </ul>

      <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
}
