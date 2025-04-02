import axios from 'axios';

interface AuthResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

// For development/testing purposes only - remove in production
const MOCK_TOKEN = "Bearer mock-token-for-development-only";
const USE_MOCK_AUTH = true; // Set to false when API is accessible

// Store auth data
let authToken: string | null = null;
let tokenExpiry: number | null = null;

export const clearAuthToken = () => {
  authToken = null;
  tokenExpiry = null;
  console.log('Auth token cleared');
};

export const getAuthToken = async (forceRefresh = false): Promise<string> => {
  // Use mock token for development if enabled
  if (USE_MOCK_AUTH) {
    console.log('Using mock authentication token for development');
    return MOCK_TOKEN;
  }

  // Clear the token if force refresh is requested
  if (forceRefresh) {
    clearAuthToken();
  }

  // Check if we already have a valid token
  if (authToken && tokenExpiry && Date.now() < tokenExpiry && !forceRefresh) {
    console.log('Using cached token - still valid');
    return authToken;
  }

  try {
    console.log('Requesting new auth token...');
    
    const requestBody = {
      clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
      clientSecret: "tVJaaaRBSeXcRXeM"
    };
    
    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/auth',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 15000 // Increase timeout for potentially slow connections
      }
    );
    
    const data = response.data as AuthResponse;
    
    if (!data.access_token || !data.token_type) {
      console.error('Invalid auth response format:', data);
      throw new Error('Invalid authentication response');
    }
    
    authToken = `${data.token_type} ${data.access_token}`;
    tokenExpiry = Date.now() + ((data.expires_in || 3600) * 1000) - 300000;
    
    console.log(`Auth token acquired successfully. Expires in ${data.expires_in} seconds`);
    return authToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.message.includes('Network Error')) {
        console.error('Network error during authentication:', error.message);
        throw new Error('Authentication failed: Network connection issue - check your internet connection or server availability');
      }
    }
    console.error('Authentication error:', error);
    throw new Error('Authentication failed: ' + (error.message || 'Unknown error'));
  }
};