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
        if(!authService.isAuthenticated()){
            throw new Error('Token not found or expired');
        }
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
};

export default userService;