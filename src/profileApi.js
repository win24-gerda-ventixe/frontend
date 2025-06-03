import axios from 'axios';

const API_URL = 'https://ventixe-gerda-webapp3.azurewebsites.net/api';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const profileApi = {
  getProfile: () => axiosInstance.get('/auth/profile'),
  updateProfile: (data) => axiosInstance.put('/auth/profile', data)
};

export default profileApi;
