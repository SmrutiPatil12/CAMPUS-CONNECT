import React, { useState } from "react";
import "../styles/Events.css";
import Sidebar from "../components/Sidebar";

function Events() {
  const [currentMonth] = useState("September 2025");

  const days = [
    "", "1", "2", "3", "4", "5", "6",
    "7", "8", "9", "10", "11", "12", "13",
    "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27",
    "28", "29", "30"
  ];

  return (
    <div className="events-container">
        <Sidebar />
      <h1>Events & Calendar</h1>
      <p>Stay updated with all the upcoming campus events.</p>

      <div className="calendar-box">
        <div className="calendar-header">
          <button className="nav-btn">‹</button>
          <h2>{currentMonth}</h2>
          <button className="nav-btn">›</button>
        </div>

        <div className="calendar-grid">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="day-name">{d}</div>
          ))}

          {days.map((day, i) => (
            <div
              key={i}
              className={`calendar-day ${day === "1" ? "active-day" : ""}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
