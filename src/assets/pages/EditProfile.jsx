import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../../auth'; 

const EditProfile = () => {
  const user = getUser();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    city: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`https://ventixe-gerda-webapp3.azurewebsites.net/api/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      setForm(res.data);
    }).catch(() => {
      setMessage("Failed to load profile.");
    });
    console.log("JWT:", localStorage.getItem("token"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
await axios.put("https://ventixe-gerda-webapp3.azurewebsites.net/api/profile", form, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});



      setMessage('Profile updated!');
    } catch (err) {
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="First Name" required />
        <input name="surname" value={form.surname} onChange={handleChange} placeholder="Last Name" required />
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
        <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" />

        <button type="submit">Update</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default EditProfile;
