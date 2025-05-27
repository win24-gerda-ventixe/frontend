import React, { useState } from 'react';

const AddEventForm = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: 0,
    eventDate: '',
    time: '',
    image: '',
    category: '',
    status: 'Draft'
  });

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: name === 'price' ? parseFloat(value) || 0 : value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Combine eventDate and time into a full ISO datetime string for the "Time" field
  const fullDateTime = `${formData.eventDate}T${formData.time}:00`;

  const payload = {
    ...formData,
    time: fullDateTime
  };

  console.log("Submitting full payload:", payload);
  console.log("JSON stringified:", JSON.stringify(payload));

  try {
    const res = await fetch('https://localhost:7097/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      onCreated(); // refresh the list
      onClose();   // close the form
    } else {
      const errorText = await res.text(); // Log backend error response
      console.error("Failed to create event:", errorText);
      alert('Failed to create event:\n' + errorText);
    }
  } catch (err) {
    console.error("Network or server error:", err);
  }
};

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Event</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="description" placeholder="Description" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
          <input name="eventDate" type="date" onChange={handleChange} required />
          <input name="time" type="time" onChange={handleChange} required />
          <input name="image" placeholder="Image URL" onChange={handleChange} />
          <input name="category" placeholder="Category" onChange={handleChange} />
          <select name="status" onChange={handleChange}>
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Past">Past</option>
          </select>

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
