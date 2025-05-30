/*import jwtDecode from 'jwt-decode';

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now(); // check expiration
  } catch {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};
*/
import authApi from './api';

export const login = async (email, password, rememberMe) => {
  const response = await authApi.post('/auth/login', {
    email,
    password,
    rememberMe
  });

  const { token } = response.data;
  localStorage.setItem('token', token); // save token
  return token;
};

export const signup = async (formData) => {
  const response = await authApi.post('/auth/register', formData);
  return response.data;
};