import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookEventForm from '../components/BookEventForm';
import Modal from '../components/Modal';
import { getUser } from '../../auth';
import UpdateEventForm from '../components/UpdateEventForm';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [packages, setPackages] = useState([]);

  const isAuthenticated = localStorage.getItem("token") !== null;
  const user = getUser();
  const isAdmin = user?.role === 'Admin';

  const fetchEvent = async () => {
    try {
      const res = await fetch(`https://ventixe-gerda-webapp.azurewebsites.net/api/events/${id}`);
      if (!res.ok) throw new Error("Failed to load event");

      const data = await res.json();
      setEvent(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await fetch(`https://ventixe-gerda-webapp.azurewebsites.net/api/events/${id}/packages`);
      if (!res.ok) throw new Error("Failed to load packages");

      const data = await res.json();
      setPackages(data);
    } catch (err) {
      console.error("Package fetch error:", err);
    }
  };

  useEffect(() => {
    fetchEvent();
    fetchPackages();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://ventixe-gerda-webapp.azurewebsites.net/api/events/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          navigate('/events');
        } else {
          const errorText = await res.text();
          alert("Delete failed:\n" + errorText);
        }
      } catch (err) {
        console.error("Delete error:", err);
        alert("An error occurred while deleting.");
      }
    }
  };

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>No event found.</p>;

  const eventDate = new Date(event.eventDate);
  const eventTime = new Date(event.time);
  const combinedDateTime = new Date(
    eventDate.toISOString().split("T")[0] + "T" + eventTime.toTimeString().split(" ")[0]
  );

  return (
    <div className="event-details-container">
      <div className="event-details-wrapper">
        <div className="event-banner">
              <div className="event-image-wrapper">
            <div className="event-details-image-placeholder" />
          <div className="event-card-badges">
          <div className="event-card-badges">
            <span className="badge category">{event.category}</span>
            <span className={`badge status ${event.status.toLowerCase()}`}>{event.status}</span>
          </div>
        </div>
        </div>
</div>
        <div className="event-info">
          <h1>{event.title}</h1>
          {combinedDateTime && (
            <p className="event-datetime">
              <i className="fa-regular fa-calendar"></i>{' '}
              {combinedDateTime.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}{' '}
              —{' '}
              {combinedDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
            </p>
          )}

          <div className="event-row">
            <p className="event-location">
              <i className="fa-solid fa-location-dot"></i> {event.location}
            </p>
            <div className="event-price">${event.price}</div>
          </div>

          <hr className="section-divider" />
          <div className="event-description">
            <h4>About Event</h4>
            <p>{event.description}</p>
          </div>

          {isAuthenticated ? (
            <button onClick={() => setShowModal(true)} className="book-event-btn">
              Book Event
            </button>
          ) : (
            <p className="login-warning">
              You need to <a href="/login">log in</a> to book this event.
            </p>
          )}

      {isAdmin && (
        <>
          <button onClick={() => setShowEditModal(true)} className="book-event-btn">
            Update Event
          </button>
          <button onClick={handleDelete} className="book-event-btn">
            Delete Event
          </button>
        </>
      )}
        </div>
      </div>

      <div className="event-packages">
        <div className="packages-header">
          <h3>Packages</h3>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
        {packages.length > 0 ? (
          packages.map(pkg => (
            <div key={pkg.id} className="package-card">
              <h4>{pkg.title}</h4>
              <p>{pkg.seatingArrangment} • {pkg.placement}</p>
              <p className="price">${pkg.price?.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No packages available.</p>
        )}
      </div>

      {/* Booking Modal */}
      {showModal && isAuthenticated && (
        <Modal onClose={() => setShowModal(false)}>
          <BookEventForm
            eventId={id}
            eventTitle={event.title}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}

      {/* Update Modal */}
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <UpdateEventForm
            event={event}
            onClose={() => setShowEditModal(false)}
            onUpdated={fetchEvent}
          />
        </Modal>
      )}
    </div>
  );
};

export default EventDetails;
