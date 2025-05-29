/*import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://localhost:7006/api',
  withCredentials: true
});

export default authApi;
*/
import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://your-auth-service.azurewebsites.net/api',
  withCredentials: true // keep this if you're using cookies
});

export default authApi;
