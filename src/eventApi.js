import axios from 'axios';

const eventApi = axios.create({
  baseURL: 'https://ventixe-gerda-webapp.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

eventApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default eventApi;
