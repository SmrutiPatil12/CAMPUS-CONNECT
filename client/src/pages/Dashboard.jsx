// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    announcements: 0,
    events: 0,
    notifications: 0,
    files: 0,
  });
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with real user when auth is added
  const user = { name: "John Doe", role: "Student", avatar: "https://i.pravatar.cc/100?img=12" };
  const USER_ID = "66f8a1b2c3d4e5f607182930";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [annRes, eventRes, notifRes, fileRes] = await Promise.all([
          axios.get("http://localhost:3200/api/announcements"),
          axios.get("http://localhost:3200/api/events"),
          axios.get(`http://localhost:3200/api/notifications/${USER_ID}`),
          axios.get("http://localhost:3200/api/files"),
        ]);

        setStats({
          announcements: annRes.data.length,
          events: eventRes.data.length,
          notifications: notifRes.data.filter(n => !n.read).length,
          files: fileRes.data.length,
        });

        setEvents(eventRes.data.slice(0, 3));
        setNotifications(notifRes.data.slice(0, 4));
        setAnnouncements(annRes.data.slice(0, 5));

        setLoading(false);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="dashboard-main">
        {/* Header */}
        <div className="dash-header">
          <h2>Welcome Back</h2>
          <div className="profile-mini">
            <img src={user.avatar} alt="profile" />
            <div>
              <h4>{user.name}</h4>
              <p>{user.role}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-title">Announcements</p>
            <h2 className="stat-value">{stats.announcements}</h2>
          </div>
          <div className="stat-card">
            <p className="stat-title">Upcoming Events</p>
            <h2 className="stat-value">{stats.events}</h2>
          </div>
          <div className="stat-card">
            <p className="stat-title">Unread Notifications</p>
            <h2 className="stat-value">{stats.notifications}</h2>
          </div>
          <div className="stat-card">
            <p className="stat-title">Files Uploaded</p>
            <h2 className="stat-value">{stats.files}</h2>
          </div>
        </div>

        {/* Live Marquee */}
        <div className="announcement-slider">
          <marquee behavior="scroll" direction="left">
            {announcements.length > 0 ? (
              announcements.map((a, i) => (
                <span key={i}>
                  {i > 0 && " | "} {a.title}
                </span>
              ))
            ) : (
              "No announcements yet"
            )}
          </marquee>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <Link to="/community" className="action-btn">Create Post</Link>
          <Link to="/files" className="action-btn">Upload File</Link>
          <Link to="/events" className="action-btn">Register Event</Link>
          <Link to="/community" className="action-btn">Ask Question</Link>
        </div>

        {/* Main Grid */}
        <div className="main-grid">
          {/* Upcoming Events */}
          <div className="events-box">
            <h3>Upcoming Events</h3>
            {events.length === 0 ? (
              <p className="no-data">No upcoming events</p>
            ) : (
              events.map((event) => (
                <div key={event._id} className="event-item">
                  <h4>{event.title}</h4>
                  <p>{formatDate(event.date)}</p>
                </div>
              ))
            )}
          </div>

          {/* Recent Activity */}
          <div className="activity-box">
            <h3>Recent Activity</h3>
            {notifications.length === 0 ? (
              <p className="no-data">No recent activity</p>
            ) : (
              notifications.map((n) => (
                <div key={n._id} className="activity-item">
                  <p>{n.message}</p>
                  <span>{new Date(n.createdAt).toLocaleTimeString()}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}