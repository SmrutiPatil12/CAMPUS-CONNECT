import React from "react";
import "../styles/NotificationItem.css";

const NotificationItem = ({ text }) => {
  return (
    <div className="notif-item">
      <p>{text}</p>
    </div>
  );
};

export default NotificationItem;
