import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Adjust this to your backend's URL
});

// This function will be called from the AuthContext to set the token
export const setAuthHeaderToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default axiosInstance;
