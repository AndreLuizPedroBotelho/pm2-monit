import axios from 'axios';
import { useAuth } from '../hooks/auth';

const api = axios.create({
  baseURL: `http://localhost:3333`,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('@P2Monit:jwtToken');

  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = `${token}`;
  }
  return config;
});

export default api;
