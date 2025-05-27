import React, {useEffect, useState} from 'react'
import EventCard from '../components/EventCard'
import EventToolbar from '../components/EventToolbar'
import AddEventForm from '../components/AddEventForm';
import Modal from '../components/Modal';

const Events = () => {
  const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);

const getEvents = async () => {
    const res = await fetch("https://ventixe-gerda-webapp.azurewebsites.net/api/events")

    if (res.ok) {
        const data = await res.json()
        setEvents(data.result)
    }
}
useEffect(() => {
    getEvents()
}, [])

console.log(events)

return (
  <div className="events-page">
      <EventToolbar onAddClick={() => setShowForm(true)} />
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <AddEventForm onClose={() => setShowForm(false)} onCreated={getEvents} />
        </Modal>
      )}

    <div className="events-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  </div>
);

};

export default Events;