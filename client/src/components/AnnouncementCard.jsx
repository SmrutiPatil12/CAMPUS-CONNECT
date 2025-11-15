import React from "react";
import "../styles/announcementCard.css";

const AnnouncementCard = ({ title, description, date }) => {
  return (
    <div className="announcement-card">
      <div className="announcement-header">
        <h3>{title}</h3>
        <span className="announcement-date">{date}</span>
      </div>
      <p className="announcement-description">{description}</p>
    </div>
  );
};

export default AnnouncementCard;
