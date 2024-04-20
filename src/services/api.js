import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL;

const instance = axios.create({
    baseURL: BASE_API_URL,
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        // Attach startTime to the request config
        config.metadata = { startTime: new Date().getTime() };
        // Check if the request URL contains '/api/v1/'
        if (config.url.includes('/api/v1/')) {
            // Get the token from localStorage
            const token = JSON.parse(localStorage.getItem('token') || '');
            // Add Authorization header with the token
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`Sending request to ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        const endTime = new Date().getTime();
        // Access startTime from the request config
        const { startTime } = response.config.metadata;
        console.log(`Received response from ${response.config.url}: Status ${response.status}. Time taken: ${endTime - startTime}ms`);
        return response;
    },
    (error) => {
        // Check if the error status is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
            window?.localStorage?.setItem('user', JSON.stringify(null));
            window?.localStorage?.setItem('token', JSON.stringify(null));
            window.location.href = "/";
        }
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

export default instance;