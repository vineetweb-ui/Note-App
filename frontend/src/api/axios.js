import axios from 'axios';

const API_URL = 'https://note-app-dxck.onrender.com';

const instance = axios.create({
    baseURL: API_URL ,
});

// Add a request interceptor to include the JWT token
instance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
