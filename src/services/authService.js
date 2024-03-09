// services/authService.js
import axios from 'axios';
import store from "@/store/index.js";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'session';
const EXPIRATION_KEY = 'expiration';

const authService = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userData);
            return response.data;
        } catch (error) {
            throw Error(error || 'Failed to register');
        }
    },
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials);
            const token = response.data.token;
            const expiration = response.data.expiration;
            localStorage.setItem(EXPIRATION_KEY, expiration);
            localStorage.setItem(TOKEN_KEY, token);
            return response.data;
        } catch (error) {
            if (error == 'AxiosError: Network Error') {
                throw Error('Failed to connect to the server');
            }
            else if (error == 'AxiosError: Request failed with status code 404') {
                throw Error('Failed to login. Please check your credentials and try again');
            }
            else if (error == 'AxiosError: Request failed with status code 500'){
                throw Error('There was a server error. Try again in a few minutes');
            }
            else{
                throw Error(error);

            }
        }
    },
    logout: () => {
        localStorage.removeItem(EXPIRATION_KEY);
        localStorage.removeItem(TOKEN_KEY);
    },
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },
    isAuthenticated: () => {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            const expiration = localStorage.getItem(EXPIRATION_KEY);
            const isAuthenticated = token !== null && Date.now() / 1000 < expiration;

            if (!isAuthenticated) {
                authService.logout();
                store.commit('logOut');
            }

            return isAuthenticated;
        } catch (error) {
            return false;
        }
    },
    getAuthData: async () => {
        if (!authService.isAuthenticated()) {
            throw new Error('Token not found or expired');
        }
        try {
            const response = await axios.get(`${API_URL}/auth`, {
                headers: {
                    Authorization: `${authService.getToken()}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to fetch data');
        }
    }
};

export default authService;