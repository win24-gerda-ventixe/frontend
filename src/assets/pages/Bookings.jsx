import React, { useEffect, useState } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCombinedBookings = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch('https://ventixe-gerda-webapp2.azurewebsites.net/api/booking', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Booking fetch status:", res.status);
        if (res.status === 403) throw new Error("You are not authorized to view bookings.");
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Raw error response:", errorText);
          throw new Error('Failed to fetch bookings');
        }

        const bookingData = await res.json();
        const bookingsRaw = Array.isArray(bookingData.result) ? bookingData.result : [];

        const enriched = await Promise.all(
          bookingsRaw.map(async (b) => {
            try {
              const eventRes = await fetch(`https://ventixe-gerda-webapp.azurewebsites.net/api/events/${b.eventId}`);
              const event = await eventRes.json();

              const category = event.category || '-';
              const price = parseFloat(event.price) || 0;

              return {
                ...b,
                eventTitle: event.title || 'Untitled',
                category,
                price,
                amount: price * b.seats,
                voucher: `${b.id.slice(0, 6)}-${category.toUpperCase()}`,
                fullName: `${b.bookingOwner?.firstName || ''} ${b.bookingOwner?.lastName || ''}`.trim(),
              };
            } catch {
              return {
                ...b,
                eventTitle: 'Unknown',
                category: '-',
                price: 0,
                amount: 0,
                voucher: `${b.id.slice(0, 6)}-UNKNOWN`,
                fullName: `${b.bookingOwner?.firstName || ''} ${b.bookingOwner?.lastName || ''}`.trim(),
              };
            }
          })
        );

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
              <td>${b.price}</td>
              <td>{b.seats}</td>
              <td>${b.amount}</td>
              <td>{b.voucher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
