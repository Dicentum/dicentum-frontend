// services/fileService.js
import axios from 'axios';
import authService from "@/services/authService.js";

const API_URL = import.meta.env.VITE_API_URL;

const fileService = {
    getFile: async (id) => {
        const isAuthenticated = authService.isAuthenticated();
        if (!isAuthenticated) {
            throw new Error('Token not found or expired');
        }
        try {
            const response = await axios.get(`${API_URL}/files/${id}`,
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
    getImageData: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/files/image/${id}`,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to fetch image data');
        }
    }
};

export default fileService;