import axios from 'axios';
import { ENV } from '../config/env';

const client = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    if (ENV.AUTH_TOKEN) {
      config.headers['Authorization'] = ENV.AUTH_TOKEN;
    }
    if (ENV.USER_AGENT) {
      config.headers['User-Agent'] = ENV.USER_AGENT;
    }

    if (__DEV__) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`[API Response] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;

    if (__DEV__) {
      console.error(
        `[API Error] ${status ? status : 'NETWORK_ERROR'} ${error.config?.url}`,
        error.message
      );
    }

    return Promise.reject(error);
  }
);

export default client;
