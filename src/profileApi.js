import axios from 'axios';


const API_URL = 'https://ventixe-gerda-webapp3.azurewebsites.net/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// This runs before each request:
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Get fresh token each time
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const profileApi = {
  getProfile: () => axiosInstance.get('/auth/profile'),
  updateProfile: (data) => axiosInstance.put('/auth/profile', data)
};

export default profileApi;