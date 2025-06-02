import React, { useEffect, useState } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCombinedBookings = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch all bookings
        const bookingRes = await fetch('https://ventixe-gerda-webapp2.azurewebsites.net/api/booking', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (bookingRes.status === 403) throw new Error("You are not authorized to view bookings.");
        if (!bookingRes.ok) {
          const errorText = await bookingRes.text();
          console.error("Raw error response:", errorText);
          throw new Error('Failed to fetch bookings');
        }

        const bookingData = await bookingRes.json();
        const bookingsRaw = Array.isArray(bookingData.result) ? bookingData.result : [];

        // Fetch all events at once
        const eventRes = await fetch('https://ventixe-gerda-webapp.azurewebsites.net/api/events');
        const eventData = await eventRes.json();
        const events = Array.isArray(eventData.result) ? eventData.result : [];

        // Combine booking and event data
        const enriched = bookingsRaw.map((b) => {
          const event = events.find(e => e.id === b.eventId);
          const category = event?.category || '-';
          const price = parseFloat(event?.price) || 0;

          return {
            ...b,
            eventTitle: event?.title || 'Untitled',
            category,
            price,
            amount: price * b.seats,
            voucher: `${b.id.slice(0, 6)}-${category.toUpperCase()}`,
            fullName: `${b.firstName || ''} ${b.lastName || ''}`.trim(),
          };
        });

        setBookings(enriched);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCombinedBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Bookings</h1>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Event</th>
            <th>Ticket Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>E-Voucher</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{new Date(b.createdAt).toLocaleString('sv-SE')}</td>
              <td>{b.fullName || '-'}</td>
              <td>{b.eventTitle}</td>
              <td>
                <span className={`badge ${b.category?.toLowerCase()}`}>{b.category}</span>
              </td>
              <td>${b.price.toFixed(2)}</td>
              <td>{b.seats}</td>
              <td>${b.amount.toFixed(2)}</td>
              <td>{b.voucher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
