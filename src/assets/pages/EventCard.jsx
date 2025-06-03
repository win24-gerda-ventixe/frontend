import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, onEdit }) => {
  if (!event) return null;

  return (
    <div className="event-card modern" style={{ position: 'relative' }}>
      {onEdit && (
        <button
          onClick={(e) => {
            e.preventDefault(); // prevent link navigation
            e.stopPropagation(); // prevent parent click
            onEdit();
          }}
          className="edit-icon-button"
          title="Edit event"
        >
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      )}

      <Link to={`/events/${event.id}`}>
        <h3>{event.title}</h3>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> {event.price} €</p>
        <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Status:</strong> {event.status}</p>
      </Link>
    </div>
  );
};

export default EventCard;
