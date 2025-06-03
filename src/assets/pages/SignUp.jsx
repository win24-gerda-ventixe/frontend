import React, { useState } from 'react';
import authApi from '../../api';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    try {
      const response = await authApi.post('/auth/register', form);
      setMessage(response.data.message || 'Registration successful!');
      setTimeout(() => (window.location.href = '/login'), 2000);
    } catch (error) {
      const apiMessage = error.response?.data?.message || 'Registration failed.';
      const apiErrors = error.response?.data?.errors || {};
      setMessage(apiMessage);
      setErrors(apiErrors);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <div className="form-group">
        <input type="text" name="name" placeholder="First Name" value={form.name} onChange={handleChange} />
        {errors.Name && <span className="error">{errors.Name[0]}</span>}
      </div>

      <div className="form-group">
        <input type="text" name="surname" placeholder="Last Name" value={form.surname} onChange={handleChange} />
        {errors.Surname && <span className="error">{errors.Surname[0]}</span>}
      </div>

      <div className="form-group">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        {errors.Email && <span className="error">{errors.Email[0]}</span>}
      </div>

      <div className="form-group">
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        {errors.Password && <span className="error">{errors.Password[0]}</span>}
      </div>

      <div className="form-group">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.ConfirmPassword && <span className="error">{errors.ConfirmPassword[0]}</span>}
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input type="checkbox" name="acceptTerms" checked={form.acceptTerms} onChange={handleChange} />
          I accept the Terms & Conditions
        </label>
        {errors.AcceptTerms && <span className="error">{errors.AcceptTerms[0]}</span>}
      </div>

      <button type="submit" className="submit-button">Sign Up</button>

      {message && <p className={`form-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
    </form>
  );
};

export default SignUp;
