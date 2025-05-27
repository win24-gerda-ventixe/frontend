import { useState } from 'react';
import authApi from '../../api'; 

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
/*    await authApi.post('/auth/login', {
        email,
        password,
        rememberMe, 
      });
      alert('Logged in!');
    } catch (err) {
      alert('Login failed');
    }
  };
*/
    const response = await authApi.post('/auth/login', {
      email,
      password,
      rememberMe,
    });

    // STEP 1: Store the JWT
    const { token } = response.data;
    localStorage.setItem('token', token); // 👈 Save token

    // STEP 2: Redirect to dashboard
    navigate('/dashboard'); // or wherever your main page is

  } catch (err) {
    alert('Login failed');
  }
};
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember Me
      </label>

      <button type="submit">Log In</button>
    </form>
  );
}
