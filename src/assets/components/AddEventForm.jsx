import React, { useState } from "react";

const AddEventForm = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: 0,
    eventDate: "",
    time: "",
    image: "",
    category: "",
    status: "Draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));

    // Clear the error once the required fields are filled in
    setValidationErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };


  const [validationErrors, setValidationErrors] = useState({});

const validate = () => {
  const errors = {};
  if (!formData.title.trim()) errors.title = "Title is required.";
  if (!formData.location.trim()) errors.location = "Location is required.";
  if (!formData.eventDate) errors.eventDate = "Event date is required.";
  if (!formData.time) errors.time = "Time is required.";
  if (formData.price < 0) errors.price = "Price cannot be negative.";
  return errors;
};

  const handleSubmit = async (e) => {
    e.preventDefault();


   const errors = validate();
      if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
  }

    const payload = {
      ...formData,
      eventDate: `${formData.eventDate}T00:00:00`,
      time: `${formData.eventDate}T${formData.time}:00`,
    };

    /*try {
      const res = await fetch("https://localhost:7097/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(res);

      if (res.ok) {
        onCreated();
        onClose();
      } else {
        const errorText = await res.text();
        console.error("Failed to create event:", errorText);
        alert("Failed to create event:\n" + errorText);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }*/

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://ventixe-gerda-webapp.azurewebsites.net/api/events/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        onCreated();
        onClose();
      } else {
        const errorText = await res.text();
        console.error("Failed to create event:", errorText);
        alert("Failed to create event:\n" + errorText);
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
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
          {validationErrors.title && <p className="error">{validationErrors.title}</p>}
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />
          {validationErrors.location && <p className="error">{validationErrors.location}</p>}
          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
          />
          {validationErrors.price && <p className="error">{validationErrors.price}</p>}
          <input
            name="eventDate"
            type="date"
            onChange={handleChange}
          />
          {validationErrors.eventDate && <p className="error">{validationErrors.eventDate}</p>}
          <input name="time" type="time" onChange={handleChange} />
          {validationErrors.time && <p className="error">{validationErrors.time}</p>}

          <input name="image" placeholder="Image URL" onChange={handleChange} />
          <input
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />
          <select name="status" onChange={handleChange}>
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Past">Past</option>
          </select>

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
