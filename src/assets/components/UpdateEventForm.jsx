import { useState } from 'react';
import eventApi from '../../eventApi';

const UpdateEventForm = ({ event, onClose, onUpdated }) => {
  const [form, setForm] = useState(event);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await eventApi.put(`/events/${event.id}`, form);
      setMessage('Event updated!');
      onUpdated();
      onClose();
    } catch (err) {
      setMessage('Failed to update event.');
    }
  };

  const handleDelete = async () => {
    try {
      await eventApi.delete(`/events/${event.id}`);
      setMessage('Event deleted!');
      onUpdated();
      onClose();
    } catch (err) {
      setMessage('Failed to delete event.');
    }
  };

  return (
<form onSubmit={handleUpdate} className="event-form">
  <h3>Edit Event</h3>

  <input
    type="text"
    name="title"
    value={form.title || ''}
    onChange={handleChange}
    placeholder="Title"
    required
  />

  <textarea
    name="description"
    value={form.description || ''}
    onChange={handleChange}
    placeholder="Description"
  />

  <input
    type="text"
    name="location"
    value={form.location || ''}
    onChange={handleChange}
    placeholder="Location"
  />

  <input
    type="number"
    name="price"
    value={form.price || ''}
    onChange={handleChange}
    placeholder="Price"
    step="0.01"
    min="0"
  />

  <input
    type="date"
    name="eventDate"
    value={form.eventDate?.slice(0, 10) || ''}
    onChange={handleChange}
    placeholder="Event Date"
    required
  />

  <input
    type="time"
    name="time"
    value={form.time?.slice(11, 16) || ''}
    onChange={handleChange}
    placeholder="Time"
    required
  />

  <input
    type="text"
    name="image"
    value={form.image || ''}
    onChange={handleChange}
    placeholder="Image URL"
  />

  <input
    type="text"
    name="category"
    value={form.category || ''}
    onChange={handleChange}
    placeholder="Category"
  />

  <select
    name="status"
    value={form.status || ''}
    onChange={handleChange}
  >
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
    <option value="Cancelled">Cancelled</option>
  </select>

  <div className="form-actions">
    <button type="submit" className="submit-button">Update</button>
    <button type="button" onClick={handleDelete} className="delete-button">Delete</button>
  </div>

  {message && <p className="form-message">{message}</p>}
</form>

  );
};

export default UpdateEventForm;
