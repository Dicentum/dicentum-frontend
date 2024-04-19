// services/authService.js
import axios from 'axios';
import store from "@/store/index.js";
import router from "@/router/index.js";
import {fido2Create} from "@ownid/webauthn";

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
    registerKey: async (key) => {
        try {
            const response = await axios.post(`${API_URL}/auth/registerKey/start`, {key}, {
                headers: {
                    Authorization: `${authService.getToken()}`
                }
            });
            const publicKey = response.data;
            const data = await fido2Create(publicKey, key);
            const finishResponse = await axios.post(`${API_URL}/auth/registerKey/finish`, data, {
                headers: {
                    Authorization: `${authService.getToken()}`
                }
            });
            if (finishResponse.data) {
                alert("Successfully created using webAuthn");
            }
            return finishResponse.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to register key');
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
                    alert("⚠︎ Your current session has expired. Please log in again.");
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