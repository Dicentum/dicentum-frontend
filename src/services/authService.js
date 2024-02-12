// services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'jwt_token';

const authService = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userData);
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to register');
        }
    },
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials);
            const token = response.data.token;
            localStorage.setItem(TOKEN_KEY, token); // Store token in local storage
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to login');
        }
    },
    logout: () => {
        localStorage.removeItem(TOKEN_KEY); // Remove token from local storage
    },
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY); // Retrieve token from local storage
    },
    isAuthenticated: () => {
        return localStorage.getItem(TOKEN_KEY) !== null; // Check if the token is present
    },
    getAuthData: async () => {
        const token = authService.getToken();
        if (!token) {
            throw new Error('Token not found');
        }
        try {
            const response = await axios.get(`${API_URL}/auth`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to fetch data');
        }
    }
};

export default authService;