import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AnnouncementCard from "../components/AnnouncementCard";
import "../styles/announcements.css";
import API from "../api/api";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const fetchAnnouncements = async () => {
    try {
      const res = await API.get("/announcements");
      setAnnouncements(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load announcements");
      setLoading(false);
    }
  };

  const createAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/announcements", formData);
      setAnnouncements([res.data, ...announcements]);
      setIsCreateOpen(false);
      setFormData({ title: "", description: "", date: new Date().toISOString().split("T")[0] });
    } catch (err) {
      alert("Failed to create announcement");
    }
  };

  const openEditModal = (ann) => {
    setEditingId(ann._id);
    setFormData({
      title: ann.title,
      description: ann.description,
      date: ann.date.split("T")[0] || ann.date,
    });
    setIsEditOpen(true);
  };

  const updateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/announcements/${editingId}`, formData);
      setAnnouncements(announcements.map(a => a._id === editingId ? res.data : a));
      setIsEditOpen(false);
      setEditingId(null);
    } catch (err) {
      alert("Failed to update");
    }
  };

  const deleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await API.delete(`/announcements/${id}`);
      setAnnouncements(announcements.filter(a => a._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="announcements-page">
      <Sidebar />

      <div className="announcements-content">
        <div className="announcements-header">
          <h2 className="announcements-title">Announcements</h2>
          <button className="create-announcement-btn" onClick={() => setIsCreateOpen(true)}>
            Create New
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && announcements.length === 0 && <p>No announcements yet.</p>}

        <div className="announcements-grid">
          {announcements.map((item) => (
            <AnnouncementCard
              key={item._id}
              title={item.title}
              description={item.description}
              date={new Date(item.date).toLocaleDateString("en-GB")}
              onDelete={() => deleteAnnouncement(item._id)}
              onEdit={() => openEditModal(item)}
            />
          ))}
        </div>
      </div>

      {/* Create & Edit Modals */}
      {(isCreateOpen || isEditOpen) && (
        <div className="modal-overlay" onClick={() => { setIsCreateOpen(false); setIsEditOpen(false); }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{isCreateOpen ? "Create Announcement" : "Edit Announcement"}</h3>
            <form onSubmit={isCreateOpen ? createAnnouncement : updateAnnouncement}>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                rows="5"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => { setIsCreateOpen(false); setIsEditOpen(false); }}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {isCreateOpen ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;