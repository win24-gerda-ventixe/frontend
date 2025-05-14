import React, {useEffect, useState} from 'react'
import EventCard from '../components/EventCard'

const Events = () => {
  const [events, setEvents] = useState([])

const getEvents = async () => {
    const res = await fetch("https://localhost:7097/api/events")

    if (res.ok) {
        const data = await res.json()
        setEvents(data)
    }
}
useEffect(() => {
    getEvents()
}, [])

  return (
    <div>
      <h2>Events</h2>
      {
        events.map(event =>(
            <EventCard key={event.id} event={event} />
        ))
      }
    </div>
  )
}

export default Events
