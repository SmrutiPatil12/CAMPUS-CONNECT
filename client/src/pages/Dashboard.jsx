import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome Back 👋</h1>

        <div className="dashboard-cards">

          {/* Announcements */}
          <div className="dash-card">
            <h2>Announcements</h2>
            <p>Check the latest updates and notifications.</p>
            <button onClick={() => navigate("/announcements")}>View All</button>
          </div>

          {/* Events */}
          <div className="dash-card">
            <h2>Events Calendar</h2>
            <p>Explore upcoming important events.</p>
            <button onClick={() => navigate("/events")}>View Calendar</button>
          </div>

          {/* Community */}
          <div className="dash-card">
            <h2>Community</h2>
            <p>Join discussions & connect with others.</p>
            <button onClick={() => navigate("/community")}>Explore</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
