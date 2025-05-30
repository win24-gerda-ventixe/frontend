import React, { useState } from 'react';
import authApi from '../../api';


const SignUp = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authApi.post('/auth/register', {
        name,
        surname,
        email,
        password,
        confirmPassword,
        acceptTerms
      });

      setMessage('Registration successful!');
      // Optional: clear form
      setName('');
      setSurname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAcceptTerms(false);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data ||
        'Registration failed.';
      setMessage(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>

      <input
        type="text"
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Last Name"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <label>
        <input
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          required
        />
        I accept the Terms & Conditions
      </label>

      <button type="submit">Sign Up</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default SignUp;
