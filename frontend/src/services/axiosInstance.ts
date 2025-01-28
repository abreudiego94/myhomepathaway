import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000', // Fallback para localhost se não tiver a variável de ambiente
});

export default axiosInstance;