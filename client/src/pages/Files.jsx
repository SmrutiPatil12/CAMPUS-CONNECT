// src/pages/Files.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";  // ← THIS IS THE KEY
import Sidebar from "../components/Sidebar";
import "../styles/files.css";

const Files = () => {
  const [files, setFiles] = useState([]);
  const location = useLocation(); // ← Detect route changes

  const fetchFiles = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3200/api/files");
      setFiles(res.data);
      console.log("Files refreshed:", res.data.length);
    } catch (err) {
      console.error("Failed to load files");
    }
  }, []);

  // Run every time this page becomes active
  useEffect(() => {
    fetchFiles();
  }, [location.pathname, fetchFiles]); // ← This line fixes everything

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3200/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFiles(prev => [res.data.file, ...prev]);
      e.target.value = "";
    } catch (err) {
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete permanently?")) return;
    try {
      await axios.delete(`http://localhost:3200/api/files/${id}`);
      setFiles(prev => prev.filter(f => f._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="files-page">
      <Sidebar />
      <div className="files-content">
        <h2 className="files-title">Files & Notes</h2>

        <div className="upload-box">
          <label className="upload-label">
            <input type="file" onChange={handleUpload} />
            <span>Upload Study Material</span>
          </label>
        </div>

        <div className="files-grid">
          {files.length === 0 ? (
            <p>No files uploaded yet.</p>
          ) : (
            files.map((file) => (
              <div className="file-card" key={file._id}>
                <h4>
                  <a href={file.downloadUrl} target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                </h4>
                <p>{file.size}</p>
                <span className="file-date">Uploaded on {file.uploaded}</span>
                <button onClick={() => handleDelete(file._id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Files;