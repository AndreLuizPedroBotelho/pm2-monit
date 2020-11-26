import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
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
