
import axios from 'axios';

const api = axios.create({
  // Use the environment variable for the base URL
  baseURL: `${process.env.REACT_APP_API_URL}/api`
});

export default api;