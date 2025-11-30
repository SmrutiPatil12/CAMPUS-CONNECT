import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/events.css";
import API from "../api/api";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

const allViews = [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ title: "", date: "" });
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events"); // Correct: /events (not /api/events)
      const formatted = res.data.map(e => ({
        ...e,
        title: e.title,
        start: new Date(e.date),
        end: new Date(e.date),
      }));
      setEvents(formatted);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const upcomingEvents = useMemo(() => 
    events.filter(e => new Date(e.date) >= today),
    [events]
  );

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ title: "", date: "" });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setIsEditMode(true);
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      date: event.start.toISOString().split("T")[0],
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.date) return alert("Title and Date required!");

    try {
      if (isEditMode) {
        // FIXED: Correct path for update
        const res = await API.put(`/events/${selectedEvent._id}`, {
          title: formData.title,
          date: formData.date,
        });
        setEvents(events.map(e => 
          e._id === selectedEvent._id 
            ? { ...res.data, start: new Date(res.data.date), end: new Date(res.data.date) } 
            : e
        ));
      } else {
        // FIXED: Correct path for create
        const res = await API.post("/events/create", {
          title: formData.title,
          date: formData.date,
        });
        setEvents([...events, { 
          ...res.data, 
          start: new Date(res.data.date), 
          end: new Date(res.data.date) 
        }]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Save error:", err.response || err);
      alert("Save failed — check console");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this event permanently?")) return;
    try {
      await API.delete(`/events/${selectedEvent._id}`); // Correct path
      setEvents(events.filter(e => e._id !== selectedEvent._id));
      setShowModal(false);
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="events-page">
      <Sidebar />
      <div className="events-content">
        <h2 className="events-title">Events & Calendar</h2>

        <div className="calendar-container">
          <div className="calendar-header">
            <h3>Calendar</h3>
            <button onClick={openAddModal} className="add-event-btn">
              Add Event
            </button>
          </div>

          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 650, margin: "20px 0", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            views={allViews}
            view={currentView}
            onView={v => setCurrentView(v)}
            date={currentDate}
            onNavigate={d => setCurrentDate(d)}
            onSelectEvent={openEditModal}
            eventPropGetter={() => ({
              style: {
                backgroundColor: "#2563eb",
                borderRadius: "8px",
                color: "white",
                border: "none",
                padding: "4px 8px",
                fontWeight: "600",
              },
            })}
            messages={{
              today: "Today",
              previous: "Previous",
              next: "Next",
              month: "Month",
              week: "Week",
              day: "Day",
              agenda: "Agenda",
            }}
            components={{
              toolbar: (props) => (
                <div className="rbc-toolbar">
                  <span className="rbc-btn-group">
                    <button onClick={() => props.onNavigate("TODAY")}>Today</button>
                    <button onClick={() => props.onNavigate("PREV")}>Previous</button>
                    <button onClick={() => props.onNavigate("NEXT")}>Next</button>
                  </span>
                  <span className="rbc-toolbar-label">{props.label}</span>
                  <span className="rbc-btn-group">
                    {["month", "week", "day", "agenda"].map(view => (
                      <button
                        key={view}
                        className={props.view === view ? "rbc-active" : ""}
                        onClick={() => props.onView(view)}
                      >
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                      </button>
                    ))}
                  </span>
                </div>
              ),
            }}
          />
        </div>

        <h3 className="section-title">Upcoming Events</h3>
        <div className="events-grid">
          {upcomingEvents.length === 0 ? (
            <p>No upcoming events. Add one now!</p>
          ) : (
            upcomingEvents.map(event => (
              <div
                key={event._id}
                className="event-card"
                onClick={() => openEditModal(event)}
                style={{
                  padding: "18px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <h3 style={{ margin: "0 0 8px 0" }}>{event.title}</h3>
                <p style={{ margin: 0, opacity: 0.9 }}>
                  {event.start.toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ marginTop: 0, color: "#2563eb" }}>
              {isEditMode ? "Edit Event" : "Add New Event"}
            </h3>
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              style={{ width: "100%", padding: "14px", margin: "12px 0", borderRadius: "10px", border: "2px solid #ddd", fontSize: "16px" }}
            />
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              style={{ width: "100%", padding: "14px", margin: "12px 0", borderRadius: "10px", border: "2px solid #ddd", fontSize: "16px" }}
            />
            <div className="modal-actions" style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              {isEditMode && (
                <button className="delete-btn-modal" onClick={handleDelete}>Delete</button>
              )}
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;