import { jwtDecode } from "jwt-decode";

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
