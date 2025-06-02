import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookEventForm = ({ eventId, eventTitle, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventId: eventId,
    firstName: '',
    lastName: '',
    email: '',
    streetName: '',
    postalCode: '',
    city: '',
    ticketQuantity: 1
  });

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: name === 'ticketQuantity' ? parseInt(value) || 1 : value
  }));
};

const [success, setSuccess] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();


  console.log("Submitting booking form data:", formData);
  console.log("JSON stringified:", JSON.stringify(formData));

  try {
const token = localStorage.getItem('token');

const res = await fetch("https://ventixe-gerda-webapp2.azurewebsites.net/api/booking", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // 🔐 Add this line
  },
  body: JSON.stringify(formData)
});

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => {

      if (onClose) onClose();
      navigate('/');
            }, 2000);
    } else {
      const errorText = await res.text(); 
      console.error("Booking failed. Server response:", errorText);
    }
  } catch (err) {
    console.error("Error submitting booking:", err);
  }
};

return (
  <div>
    <h1>Book Event – {eventTitle}</h1>

        {success && (
      <div className="success-message">
        Booking successful! Redirecting...
      </div>
    )}

    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Street Name</label>
        <input
          type="text"
          name="streetName"
          value={formData.streetName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Ticket Quantity</label>
        <input
          type="number"
          name="ticketQuantity"
          value={formData.ticketQuantity}
          min="1"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Confirm Booking</button>
    </form>
  </div>
);

};

export default BookEventForm;
