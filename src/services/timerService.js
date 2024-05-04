import axios from 'axios';
import authService from "@/services/authService.js";

const API_URL = import.meta.env.VITE_API_URL;

const timerService = {
    getTimer: async (id) => {
        return axios.get(`${API_URL}/timers/${id}`, {
            headers: {
                Authorization: `${authService.getToken()}`
            }
        })
            .then((response) => response.data)
            .catch((e)=>{
                console.log('Error: ' + e);
            });
    },
    createTimer: async (timer) => {
        try {
            const response = await axios.post(`${API_URL}/timers`, timer,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to create timer');
        }
    },
    deleteTimer: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/timers/${id}`,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to delete timer');
        }
    }
}

export default timerService;