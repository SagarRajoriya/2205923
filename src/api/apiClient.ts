import axios from 'axios';
import { getAuthToken } from './services/authService';

// For development/testing with network issues
const USE_MOCK_DATA = true; // Toggle this to use mock data when API is unavailable

// Mock data for development
const mockUsersData = {
  "users": {
    "1": "John Doe",
    "2": "Jane Smith",
    "3": "Alice Johnson",
    "4": "Bob Brown",
    "5": "Charlie Wilson"
  }
};

const mockPostsData = {
  "posts": Array.from({ length: 10 }, (_, i) => ({
    "id": i + 1,
    "userid": Math.floor(Math.random() * 5) + 1,
    "content": `Mock post content ${i + 1}`
  }))
};

const mockCommentsData = {
  "comments": Array.from({ length: 5 }, (_, i) => ({
    "id": i + 1,
    "postid": Math.floor(Math.random() * 10) + 1,
    "content": `Mock comment ${i + 1}`
  }))
};

const apiClient = axios.create({
  baseURL: 'http://20.244.56.144/evaluation-service',
  timeout: 15000, // Increase timeout for potentially slow connections
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get the auth token
      const token = await getAuthToken();
      
      // Add the token to the request headers
      config.headers = config.headers || {};
      config.headers.Authorization = token;
      
      return config;
    } catch (error) {
      console.error('Error adding auth token to request:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling and mock responses
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if we should use mock data due to network issues
    if (USE_MOCK_DATA && axios.isAxiosError(error) && 
        (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.message.includes('Network Error'))) {
      
      console.warn('Network error detected, using mock data for development');
      const url = error.config.url;
      
      // Create mock response based on the requested endpoint
      if (url.includes('/users') && !url.includes('/posts')) {
        return Promise.resolve({
          data: mockUsersData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: error.config
        });
      } else if (url.includes('/posts') && url.includes('/comments')) {
        return Promise.resolve({
          data: mockCommentsData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: error.config
        });
      } else if (url.includes('/posts') || url.includes('/users') && url.includes('/posts')) {
        return Promise.resolve({
          data: mockPostsData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: error.config
        });
      }
    }

    // If we get a 401 error, try to refresh the token once
    if (error.response && error.response.status === 401 && error.config && !error.config._retry) {
      try {
        error.config._retry = true;
        const newToken = await getAuthToken(true); // Force token refresh
        error.config.headers.Authorization = newToken;
        return axios(error.config); // Retry the request with new token
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;