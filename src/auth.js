/*import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token); 
  } catch (err) {
    return null;
  }
};
*/
import { jwtDecode } from "jwt-decode";

/**
 * Check if a valid JWT token exists and is not expired
 */
export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (!exp) return false;

    const isExpired = Date.now() >= exp * 1000;
    return !isExpired;
  } catch (err) {
    return false;
  }
};

/**
 * Remove the token and redirect to login
 */
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

/**
 * Decode the user from the stored token, return basic user info
 */
export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    // Optional: Return a structured user object
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };
  } catch (err) {
    return null;
  }
};
