import { useState } from 'react';
import authApi from '../../api'; 
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};
    if (!email.trim()) errors.email = 'Email is required.';
    if (!password.trim()) errors.password = 'Password is required.';
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      const response = await authApi.post('/auth/login', {
        email,
        password,
        rememberMe,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setMessage('Login successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <form className="signup-form" onSubmit={handleLogin}>
      <h2>Login</h2>

      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors({ ...fieldErrors, email: '' });
          }}
        />
        {fieldErrors.email && <span className="error">{fieldErrors.email}</span>}
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors({ ...fieldErrors, password: '' });
          }}
        />
        {fieldErrors.password && <span className="error">{fieldErrors.password}</span>}
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </label>
      </div>

      <button type="submit" className="submit-button">Log In</button>

      {message && <p className="form-message success">{message}</p>}
      {error && <p className="form-message error">{error}</p>}
    </form>
  );
}
