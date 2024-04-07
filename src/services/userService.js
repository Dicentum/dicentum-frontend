// services/userService.js
import axios from 'axios';
import authService from "@/services/authService.js";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'session';

const userService = {
    getAllUsers: async () => {
        try {
            const response = await axios.get(`${API_URL}/users`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to fetch users');
        }
    },
    getUser: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/users/${id}`,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to fetch user');
        }
    },
    updateUser: async (id, body) => {
        try {
            const response = await axios.put(`${API_URL}/users/${id}`, body,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to update user');
        }
    },
};

export default userService;