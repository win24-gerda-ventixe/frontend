import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://localhost:7006/api',
  withCredentials: true
});

export default authApi;
