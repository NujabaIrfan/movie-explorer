import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
    params: {
      api_key: process.env.REACT_APP_TMDB_API_KEY,
      language: 'en-US'
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
  

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('API Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;