import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api',   
});

AxiosInstance.interceptors.request.use((config) => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    config.headers.common.token = token;
    config.errorContext = new Error('Thrown at:'); // tracking error location
    return config;
});

export default AxiosInstance;
