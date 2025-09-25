import React from "react";
import "../styles/announcements.css";

const Announcements = () => {
  return (
    <div className="announcements">
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
    <h1>Announcements</h1>
    <p>Find all campus-wide news and updates here.</p>
  </header>

  <section className="filters">
    <input type="text" placeholder="Filter by Class" />
    <select name="department">
      <option value="">Filter by Department</option>
      {/* Add department options as needed */}
    </select>
    <select name="club">
      <option value="">Filter by Club</option>
      {/* Add club options as needed */}
    </select>
  </section>

  <section className="announcements-grid">
    <div className="announcement-card">
      <h3>Mid-term Exam Schedule Released</h3>
      <p>October 26, 2024</p>
      <span className="category">Academics</span>
      <span className="subcategory">Computer Science</span>
      <button className="close-btn">×</button>
    </div>
    <div className="announcement-card">
      <h3>Annual Tech Fest Innovate 2024</h3>
      <p>October 25, 2024</p>
      <button className="close-btn">×</button>
    </div>
  </section>
</main>
    </div>
  );
};

export default Announcements;
