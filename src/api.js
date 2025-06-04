/*import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://localhost:7006/api',
  withCredentials: true
});

export default authApi;
*/
import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://ventixe-gerda-webapp3.azurewebsites.net/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

authApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default authApi;
