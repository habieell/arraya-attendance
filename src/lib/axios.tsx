import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:9000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Mengizinkan pengiriman cookie
})

export default AxiosInstance;
