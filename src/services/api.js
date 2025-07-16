import axios from 'axios';

// ✅ THÊM: Khai báo API_BASE_URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('🌐 API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('🚨 Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('🚨 Response Error:', error.message);
    
    if (error.response?.status === 401 && error.config.url?.includes('/auth/')) {
      localStorage.removeItem('authToken');
    }
    
    if (!error.response) {
      console.warn('🌐 Network error - using fallback data');
      return Promise.resolve({ 
        data: { success: false, error: 'Network unavailable' }
      });
    }
    
    return Promise.reject(error);
  }
);

// Utility functions
export const checkApiHealth = async () => {
  try {
    const response = await fetch(API_BASE_URL + '/health', { 
      method: 'GET',
      timeout: 3000 
    });
    return response.ok;
  } catch (error) {
    console.warn('🏥 API Health check failed:', error.message);
    return false;
  }
};

export const isMockMode = () => {
  return !process.env.REACT_APP_API_URL || 
         process.env.REACT_APP_API_URL.includes('localhost:3000');
};

console.log('🔧 API Client initialized:', {
  baseURL: API_BASE_URL,
  mockMode: isMockMode(),
  timeout: '15s'
});

export default apiClient;