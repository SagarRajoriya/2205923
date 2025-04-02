import { getAuthToken } from './authService';

// Function to test the authentication
export const testAuth = async () => {
  try {
    const token = await getAuthToken();
    console.log('Authentication successful! Token:', token.substring(0, 20) + '...');
    return true;
  } catch (error) {
    console.error('Authentication test failed:', error);
    return false;
  }
};

// Run the test when the module is imported
testAuth().then(success => {
  if (success) {
    console.log('✅ Auth service is working properly');
  } else {
    console.error('❌ Auth service is not working');
  }
});