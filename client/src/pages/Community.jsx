import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Community.css";
import { FiMessageCircle } from "react-icons/fi";

const posts = [
  {
    id: 1,
    title: "Best places to study on campus?",
    content:
      "Looking for quiet spots with good wifi. Any recommendations besides the main library?",
    tags: ["study-spots", "campus-life"],
    author: "Emily R.",
    time: "2 days ago",
    comments: 12,
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    title: "Feedback on Prof. Alan Turing's 'Advanced Algorithms' course",
    content:
      "Thinking of taking this course next semester. How is the workload and teaching style?",
    tags: ["academics", "computer-science", "course-review"],
    author: "John S.",
    time: "5 days ago",
    comments: 8,
    avatar:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=200&q=80",
  },
];

function Community() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="community-container">
        <div className="community-header">
          <div>
            <h1>Community Forum</h1>
            <p>Discuss topics with the entire campus community.</p>
          </div>

          <button className="new-post-btn">
            <span>+</span> New Post
          </button>
        </div>

        <div className="community-list">
          {posts.map((post) => (
            <div className="community-card" key={post.id}>
              <h2>{post.title}</h2>
              <p className="community-content">{post.content}</p>

              <div className="community-tags">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="community-footer">
                <div className="author-info">
                  <img src={post.avatar} alt="user" />
                  <span>
                    {post.author} • {post.time}
                  </span>
                </div>

                <div className="comments">
                  <FiMessageCircle size={18} />
                  <span>{post.comments} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Community;
