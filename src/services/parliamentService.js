// services/parliamentService.js
import axios from 'axios';
import authService from "@/services/authService.js";

const API_URL = import.meta.env.VITE_API_URL;

const parliamentService = {
    getParliaments: async () => {

        return axios.get(`${API_URL}/parliaments`)
            .then((response) => response.data)
            .catch((e)=>{
                console.log('Error: ' + e);
            });
    },
    getParliament: async (id) => {

        return axios.get(`${API_URL}/parliaments/${id}`, {
            headers: {
                Authorization: `${authService.getToken()}`
            }
        })
            .then((response) => response.data)
            .catch((e)=>{
                console.log('Error: ' + e);
            });
    },
    updateParliament: async (id, parliament) => {
        try {
            const response = await axios.put(`${API_URL}/parliaments/${id}`, parliament,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to update parliament');
        }
    },
}
export default parliamentService;