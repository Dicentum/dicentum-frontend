// services/authService.js
import axios from 'axios';
import store from "@/store/index.js";
import router from "@/router/index.js";
import {startRegistration, startAuthentication} from "@simplewebauthn/browser";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'session';
const EXPIRATION_KEY = 'expiration';

const authService = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userData);
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to register user');
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
            throw Error(error.response.data.message || 'Failed to login');
        }
    },
    registerKey: async () => {
        try {
            const response = await axios.get(`${API_URL}/auth/registerKey/start`,  {
                headers: {
                    Authorization: `${authService.getToken()}`
                }
            });
            let attResp;
            attResp = await startRegistration(response.data);
            const finishResponse = await axios.post(`${API_URL}/auth/registerKey/finish`, attResp, {
                headers: {
                    Authorization: `${authService.getToken()}`
                }
            });
            return finishResponse.data;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw Error('The operation was cancelled by the user');
            } else if (error.name === 'NotAllowedError') {
                throw Error('The operation was rejected by the user');
            } else if (error.name === 'InvalidStateError') {
                throw Error('Authenticator was probably already registered by user');
            } else if (error.response) {
                throw Error(error.response.data.message || 'Failed to register key');
            } else {
                alert(error);
                throw Error(error.message || 'An error occurred');
            }
        }
    },
    loginKey: async () => {
        try{
            const response = await axios.get(`${API_URL}/auth/loginKey/start`, {
                headers: {
                    Authorization: `${authService.getToken()}`
                }
            });
            let asseResp;
            asseResp = await startAuthentication(response.data);
            const finishResponse = await axios.post(`${API_URL}/auth/loginKey/finish`, asseResp, {
                headers: {
                    Authorization: `${authService.getToken()}`
                }
            });
            return finishResponse.data;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw Error('The operation was cancelled by the user');
            } else if (error.name === 'NotAllowedError') {
                throw Error('The operation was rejected by the user');
            } else if (error.name === 'InvalidStateError') {
                throw Error('Authenticator was probably already registered by user');
            } else if (error.response) {
                throw Error(error.response.data.message || 'Failed to register key');
            } else {
                throw Error(error.message || 'An error occurred');
            }
        }
    },
    logout: () => {
        localStorage.removeItem(EXPIRATION_KEY);
        localStorage.removeItem(TOKEN_KEY);
    },
    validate: async (id, body) => {
        try {
            const validation = await axios.post(`${API_URL}/auth/validate/${id}`, body);
            return validation.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to validate user');
        }
    },
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },
    isAuthenticated: () => {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            const expiration = localStorage.getItem(EXPIRATION_KEY);
            const tokenExist = token !== null;
            const expired = Math.floor(Date.now() / 1000) > expiration;

            if (!tokenExist || expired) {
                authService.logout();
                store.commit('logOut');
                if (expired) {
                    alert("⚠ Your current session has expired. Please log in again.");
                }
                return false;
            } else {
                return true;
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    getAuthData: async () => {
        const isAuthenticated = authService.isAuthenticated();
        if (!isAuthenticated) {
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
    },
};

export default authService;