// services/debatesService.js
import axios from 'axios';
import authService from "@/services/authService.js";

const API_URL = import.meta.env.VITE_API_URL;

const parliamentService = {
    getDebate: async (id) => {

        return axios.get(`${API_URL}/debates/${id}`, {
            headers: {
                Authorization: `${authService.getToken()}`
            }
        })
            .then((response) => response.data)
            .catch((e)=>{
                console.log('Error: ' + e);
            });
    },
};

export default parliamentService;