// client/src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/profile.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    year: "",
    rollNo: "",
    department: "",
    role: "student",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        course: user.course || "B.Tech Computer Science",
        year: user.year || "3rd Year",
        rollNo: user.rollNo || "",
        department: user.department || "Computer Science",
        role: user.role || "student",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setMessage("Profile updated successfully!");
    setIsEditing(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isStudent = formData.role === "student";

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <Sidebar />

      <div className="profile-content">
        <div className="profile-header">
          <h2 className="profile-title">Your Profile</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {message && <div className="success-message">{message}</div>}

        <div className="profile-card">
          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-box">
              {getInitials(formData.name || "User")}
            </div>
            <h3>{formData.name}</h3>
            <p>{formData.email}</p>
            <span className={`role-badge ${formData.role}`}>
              {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
            </span>
          </div>

          {/* Form Section */}
          <div className="profile-form">
            {/* Name & Email */}
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Course & Year */}
            <div className="form-grid">
              <div className="form-group">
                <label>Course</label>
                <input
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Only Show Roll No for Students */}
            {isStudent && (
              <div className="form-grid">
                <div className="form-group">
                  <label>Roll No / PRN</label>
                  <input
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g. 2225331242021"
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            )}

            {/* For Faculty/Authority – Show Department Only */}
            {!isStudent && (
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Department</label>
                  <input
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button className="save-btn" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;