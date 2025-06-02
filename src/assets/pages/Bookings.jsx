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
      <th>ID</th>
      <th>Event ID</th>
      <th>User ID</th>
      <th>Seats</th>
      <th>Created At</th>
    </tr>
  </thead>
  <tbody>
    {bookings.map((b) => (
      <tr key={b.id}>
        <td>{b.id}</td>
        <td>{b.eventId}</td>
        <td>{b.userId}</td>
        <td>{b.seats}</td>
        <td>{new Date(b.createdAt).toLocaleString()}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default Bookings;
