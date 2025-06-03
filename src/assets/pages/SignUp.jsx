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

      // Optional: Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      const apiMessage =
        error.response?.data?.message || 'Registration failed.';
      const apiErrors = error.response?.data?.errors || {};
      setMessage(apiMessage);
      setErrors(apiErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input
        type="text"
        name="name"
        placeholder="First Name"
        value={form.name}
        onChange={handleChange}
      />
      {errors.Name && <p className="error">{errors.Name[0]}</p>}

      <input
        type="text"
        name="surname"
        placeholder="Last Name"
        value={form.surname}
        onChange={handleChange}
      />
      {errors.Surname && <p className="error">{errors.Surname[0]}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.Email && <p className="error">{errors.Email[0]}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.Password && <p className="error">{errors.Password[0]}</p>}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
      />
      {errors.ConfirmPassword && (
        <p className="error">{errors.ConfirmPassword[0]}</p>
      )}

      <label>
        <input
          type="checkbox"
          name="acceptTerms"
          checked={form.acceptTerms}
          onChange={handleChange}
        />
        I accept the Terms & Conditions
      </label>
      {errors.AcceptTerms && <p className="error">{errors.AcceptTerms[0]}</p>}

      <button type="submit">Sign Up</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default SignUp;
