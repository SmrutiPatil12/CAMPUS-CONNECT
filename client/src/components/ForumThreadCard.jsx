import React from "react";
import "../styles/ForumThreadCard.css";

const ForumThreadCard = ({ title, author, replies }) => {
  return (
    <div className="thread-card">
      <h2>{title}</h2>
      <p>Posted by: <span>{author}</span></p>
      <p className="replies">{replies} Replies</p>
    </div>
  );
};

export default ForumThreadCard;
