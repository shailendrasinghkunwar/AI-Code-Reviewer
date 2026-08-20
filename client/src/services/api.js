import axios from 'axios';

// Vite exposes only environment variables prefixed with VITE_. Locally, use
// the Vite `/api` proxy; production defaults to the deployed Render API.
const getBaseUrl = () => {
  let rawUrl = import.meta.env.VITE_API_URL || (
    import.meta.env.PROD
      ? 'https://ai-code-reviewer-2-mjno.onrender.com/api'
      : '/api'
  );

  // Strip trailing slashes
  rawUrl = rawUrl.trim().replace(/\/+$/, '');

  // For relative paths like '/api', return as is
  if (rawUrl.startsWith('/')) {
    return rawUrl;
  }

  // Ensure production full URLs end with '/api'
  return rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;
};

const API_BASE_URL = getBaseUrl();

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Unauthorized (401)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login if not already on login/register page
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/register'
      ) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
