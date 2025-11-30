import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Smruti Patil",
    email: "smruti@example.com",
    course: "B.Tech Computer Science",
    year: "3rd Year",
  });

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  return (
    <div className="profile-page">
      <Sidebar />

      <div className="profile-content">
        <h2 className="profile-title">👤 Your Profile</h2>

        <div className="profile-card">
          <div className="avatar-box">SP</div>

          <div className="profile-form">
            <label>Full Name</label>
            <input name="name" value={user.name} onChange={handleChange} />

            <label>Email</label>
            <input name="email" value={user.email} onChange={handleChange} />

            <label>Course</label>
            <input name="course" value={user.course} onChange={handleChange} />

            <label>Year</label>
            <input name="year" value={user.year} onChange={handleChange} />

            <button className="save-btn">Save Changes</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
