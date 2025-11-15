import React from "react";
import Sidebar from "../components/Sidebar";
import AnnouncementCard from "../components/AnnouncementCard";
import "../styles/announcements.css";

const Announcements = () => {
  const announcementData = [
    {
      title: "System Maintenance",
      description:
        "The server will be under maintenance on 18th Nov from 10 PM to 12 AM. Please save your work.",
      date: "15 Nov 2025",
    },
    {
      title: "New Feature Release",
      description:
        "We have added new health tracking features in the routine builder. Check them out!",
      date: "14 Nov 2025",
    },
    {
      title: "Weekly Standup",
      description:
        "Team weekly stand-up meeting will be held every Monday at 10 AM sharp.",
      date: "13 Nov 2025",
    },
  ];

  return (
    <div className="announcements-container">
      <Sidebar />

      <div className="announcement-main">
        <h2 className="announcement-title">Announcements</h2>

        <div className="announcement-list">
          {announcementData.map((item, index) => (
            <AnnouncementCard
              key={index}
              title={item.title}
              description={item.description}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
