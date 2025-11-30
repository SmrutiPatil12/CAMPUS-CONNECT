// src/pages/Notifications.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/notifications.css";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with real user ID when you add auth
  const CURRENT_USER_ID = "66f8a1b2c3d4e5f607182930";

  // Fetch all notifications (global + personal)
  const fetchNotifications = async () => {
    axios
      .get(`http://localhost:3200/api/notifications/${CURRENT_USER_ID}`)
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch notifications:", err);
        setLoading(false);
      });
  };

  // Auto-refresh every 8 seconds → you see new notifications instantly!
  useEffect(() => {
    fetchNotifications(); // first load

    const interval = setInterval(() => {
      fetchNotifications();
    }, 8000); // refresh every 8 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  // Mark single notification as read
  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:3200/api/notifications/read/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read");
    }
  };

  // Mark ALL as read
  const markAllAsRead = async () => {
    try {
      const unread = notifications.filter((n) => !n.read);
      await Promise.all(
        unread.map((n) =>
          axios.put(`http://localhost:3200/api/notifications/read/${n._id}`)
        )
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark all as read");
    }
  };

  // Format time like "2m ago", "3h ago", "5d ago"
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notifications-page">
      <Sidebar />

      <div className="notifications-content">
        <div className="notifications-header">
          <h2>Notifications {unreadCount > 0 && `(${unreadCount})`}</h2>
          {unreadCount > 0 && (
            <button className="mark-btn" onClick={markAllAsRead}>
              Mark All as Read
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-state">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="empty-state">
            <p>No notifications yet</p>
            <span>You're all caught up!</span>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map((notif) => (
              <div
                key={notif._id}
                className={`notification-card ${notif.read ? "read" : "unread"}`}
                onClick={() => !notif.read && markAsRead(notif._id)}
                style={{ cursor: notif.read ? "default" : "pointer" }}
              >
                <div className="notification-content">
                  <p className="notification-text">{notif.message}</p>
                  <span className="notification-time">
                    {formatTime(notif.createdAt)}
                  </span>
                </div>

                {!notif.read && <div className="unread-dot"></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;