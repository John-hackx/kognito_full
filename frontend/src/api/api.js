import axios from "axios";
import useAuthStore from "../stores/authStore";

// Set base URL for all requests
axios.defaults.baseURL = "http://localhost:5000";

// Important: Set withCredentials globally if all requests need cookies
axios.defaults.withCredentials = true;

// You can still keep request interceptors for other purposes
axios.interceptors.request.use(
  (config) => {
    // Add any additional headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 unauthorized
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear user state if unauthorized
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default axios;
