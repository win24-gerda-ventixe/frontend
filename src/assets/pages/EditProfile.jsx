import React, { useState, useEffect } from 'react';
import profileApi from '../../profileApi';

const EditProfile = () => {
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
  profileApi.getProfile()
    .then(res => {
      console.log('Profile data:', res.data);
      setForm(res.data);
    })
    .catch(err => {
      console.error('Failed to load profile:', err);
      setMessage('Failed to load profile.');
    });
}, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await profileApi.updateProfile(form);
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
