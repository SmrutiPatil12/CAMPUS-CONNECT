// components/AnnouncementCard.jsx
export default function AnnouncementCard({ title, description, date, onDelete, onEdit }) {
  return (
    <div className="announcement-card">
      <div className="announcement-header">
        <h3 className="announcement-title">{title}</h3>
        <div className="action-buttons">
          <button className="action-btn edit-btn" onClick={onEdit} title="Edit">
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button className="action-btn delete-btn" onClick={onDelete} title="Delete">
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <p className="announcement-description">{description}</p>

      <div className="announcement-footer">
        <i className="far fa-calendar-alt"></i>
        <span className="announcement-date">{date}</span>
      </div>
    </div>
  );
}