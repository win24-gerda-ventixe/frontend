import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


const EventCard = ({ event }) => {
  if (!event) return null;

  const formattedDate = new Date(event.eventDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = new Date(event.time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <Link to={`/events/${event.id}`} className="event-card-link">
<div className="event-card modern">
  <div className="event-image-wrapper">
    <div className="event-card-badges">
      <span className="badge category">{event.category}</span>
      <span className={`badge status ${event.status.toLowerCase()}`}>{event.status}</span>
    </div>
    <div className="event-image-placeholder" />
  </div>

  <div className="event-details">
    <div className="event-datetime">{formattedDate} — {formattedTime}</div>
    <h3 className="event-title">{event.title}</h3>
    <div className="event-location">
      <i
        className="fa-solid fa-location-dot"
        style={{ marginRight: '6px', color: '#6b7280' }}
      ></i>
      {event.location}
    </div>
    <div className="event-price">${event.price}</div>
  </div>
</div>

    </Link>
  );
};

export default EventCard;
