import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, onEdit }) => {
  if (!event) return null;

  return (
<div className="event-card modern">
      <div className="event-image-wrapper">
    <div className="event-header">
    {onEdit && (
      <button onClick={onEdit} className="edit-icon-button" title="Edit event">
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    )}
  </div>
    <div className="event-image-placeholder"></div>


  </div>

  <div className="event-info">
    <p>{new Date(event.eventDate).toLocaleDateString()} — {new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
    <h3 className="event-title">{event.title}</h3>
    <p className="event-location"><i className="fa-solid fa-location-dot"></i> {event.location}</p>
    <p className="event-price">{event.price} €</p>
  </div>
</div>

  );
};

export default EventCard;