import axios from 'axios';
import API_CONFIG from '../../config/api.config';
import { handleApiError } from './errorHandler';

const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

export default apiClient;