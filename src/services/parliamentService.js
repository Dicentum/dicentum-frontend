// services/parliamentService.js
import axios from 'axios';
import authService from "@/services/authService.js";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'session';

const parliamentService = {
    getParliaments: async () => {
        return axios.get(`${API_URL}/parliaments`)
            .then((response) => response.data)
            .catch((e)=>{
                console.log('Error: ' + e);
            });
    },
    getParliament: async (id) => {
        if(!authService.isAuthenticated()){
            throw new Error('Token not found');
        }
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
}
export default parliamentService;