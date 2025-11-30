// src/pages/Community.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/community.css";
import axios from "axios";

const Community = () => {
  const [data, setData] = useState({
    posts: [],
    categoryCounts: {},
    trendingTopics: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newPost, setNewPost] = useState("");
  const [selectedPostCategory, setSelectedPostCategory] = useState("General Discussion");

  const categories = [
    "General Discussion",
    "Doubts & Help",
    "Project Showcase",
    "Tech News",
  ];

  const fetchData = async (cat = "") => {
    try {
      const url = cat
        ? `http://localhost:3200/api/posts?category=${encodeURIComponent(cat)}`
        : "http://localhost:3200/api/posts";
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      console.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await axios.post("http://localhost:3200/api/posts/create", {
        content: newPost,
        category: selectedPostCategory,
      });
      setNewPost("");
      fetchData(selectedCategory);
    } catch (err) {
      alert("Failed to post");
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put(`http://localhost:3200/api/posts/like/${id}`);
      fetchData(selectedCategory);
    } catch (err) {
      console.log("Like failed");
    }
  };

  return (
    <div className="community-page">
      <Sidebar />

      <div className="community-content">
        <h2 className="community-title">Community Forum</h2>

        {/* Categories */}
        <div className="community-section">
          <h3 className="section-title">Categories</h3>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`category-card ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
              >
                <h4>{cat}</h4>
                <p>{data.categoryCounts[cat] || 0} posts</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="community-section">
          <h3 className="section-title">Trending Topics</h3>
          <ul className="trending-list">
            {data.trendingTopics.length === 0 ? (
              <li className="trending-item">No trends yet</li>
            ) : (
              data.trendingTopics.map((topic, i) => (
                <li key={i} className="trending-item">• {topic}</li>
              ))
            )}
          </ul>
        </div>

        {/* Create Post */}
        <div className="community-section">
          <form onSubmit={handlePost}>
            <textarea
              placeholder="Share your thoughts with the community..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              required
              rows="4"
            />
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", alignItems: "center" }}>
              <select
                value={selectedPostCategory}
                onChange={(e) => setSelectedPostCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button type="submit">Post</button>
            </div>
          </form>
        </div>

        {/* Recent Posts - STUNNING NEW DESIGN WITH HEART ICON */}
        <div className="community-section">
          <h3 className="section-title">
            Recent Posts {selectedCategory && `in ${selectedCategory}`}
          </h3>

          <div className="recent-posts">
            {data.posts.length === 0 ? (
              <p>No posts yet. Be the first to post!</p>
            ) : (
              data.posts.map((post) => (
                <div key={post._id} className="post-card">
                  <div className="post-header">
                    <div className="post-avatar">
                      {post.user.charAt(0).toUpperCase()}
                    </div>
                    <div className="post-info">
                      <h4>{post.user}</h4>
                      <small>#{post.category}</small>
                    </div>
                  </div>

                  <div className="post-content">
                    <p>{post.content}</p>
                  </div>

                  <div className="post-footer">
                    <span className="post-time">{post.time}</span>
                    <button onClick={() => handleLike(post._id)} className="like-btn">
                      <span>♥</span> {post.likes}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;