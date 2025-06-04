import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EventToolbar from "../components/EventToolbar";
import AddEventForm from "../components/AddEventForm";
import UpdateEventForm from "../components/UpdateEventForm";
import Modal from "../components/Modal";
import { getUser } from "../../auth";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const user = getUser();
  const isAdmin = user?.role === "Admin";

  const getEvents = async () => {
    const res = await fetch(
      "https://ventixe-gerda-webapp.azurewebsites.net/api/events"
    );

    if (res.ok) {
      const data = await res.json();
      setEvents(data.result);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="events-page">
      {isAdmin && <EventToolbar onAddClick={() => setShowForm(true)} />}

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <AddEventForm
            onClose={() => setShowForm(false)}
            onCreated={getEvents}
          />
        </Modal>
      )}

      {selectedEvent && (
        <Modal onClose={() => setSelectedEvent(null)}>
          <UpdateEventForm
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onUpdated={getEvents}
          />
        </Modal>
      )}

      <div className="events-grid">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={isAdmin ? () => setSelectedEvent(event) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
