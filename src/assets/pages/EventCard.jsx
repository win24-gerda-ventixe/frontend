/*import React from 'react';
import { Link } from 'react-router-dom'

const EventCard = ({ event }) => {
  if (!event) return null;

  return (
    <Link to={`/events/${event.id}`} className="event-card">
      <h3>{event.title}</h3>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Price:</strong> {event.price} €</p>
      <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Status:</strong> {event.status}</p>
    </Link>
  );
};

export default EventCard;*/
