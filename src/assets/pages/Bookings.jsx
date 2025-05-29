import React, { useEffect, useState } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch('https://ventixe-gerda-webapp2.azurewebsites.net/api/booking', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log status for debugging
      console.log("Booking fetch status:", res.status);

      if (res.status === 403) {
        throw new Error("You are not authorized to view bookings.");
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Raw error response:", errorText);
        throw new Error('Failed to fetch bookings');
      }

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Name</th>
            <th>Event</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.invoiceId}</td>
              <td>{b.fullName}</td>
              <td>{b.eventTitle}</td>
              <td>{b.ticketQuantity}</td>
              <td>${b.totalPrice}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
