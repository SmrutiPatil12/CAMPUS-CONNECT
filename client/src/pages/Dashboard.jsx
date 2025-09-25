import React from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">CampusConnect</h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Announcements</li>
            <li>Community</li>
            <li>Events</li>
            <li className="sidebar-section">Admin Tools</li>
            <li>Analytics</li>
            <li>Moderation</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="header">
          <h1>Welcome back!</h1>
          <p>Here's what's happening on campus today.</p>
        </header>

        <section className="grid">
          {/* Announcements */}
          <div className="card">
            <h3>📢 Announcements</h3>
            <ul>
              <li>
                <strong>Mid-term Exam Schedule</strong> <br />
                <span>Posted 2 hours ago</span>
              </li>
              <li>
                <strong>Library Hours Extended</strong> <br />
                <span>Posted 1 day ago</span>
              </li>
            </ul>
            <button>View All →</button>
          </div>

          {/* Events */}
          <div className="card">
            <h3>📅 Upcoming Events</h3>
            <ul>
              <li>
                <strong>Tech Fest 2024</strong> – Nov 15
              </li>
              <li>
                <strong>Guest Lecture on AI</strong> – Nov 20
              </li>
            </ul>
            <button>View Calendar →</button>
          </div>

          {/* Discussions */}
          <div className="card full">
            <h3>💬 Hot Discussions</h3>
            <p>Explore trending topics in the community forum.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;