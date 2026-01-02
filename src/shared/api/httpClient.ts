import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/mock';

export const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ??
        error.message ??
        'Unexpected API error';
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);
