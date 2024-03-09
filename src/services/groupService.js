// services/groupService.js
import axios from 'axios';
import authService from "@/services/authService.js";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'session';

const groupService = {
    getGroups: async () => {
        return axios.get(`${API_URL}/groups`)
            .then((response) => response.data)
            .catch((e)=>{
                console.log('Error: ' + e);
            });
    },
    getGroup: async (id) => {
        if(!authService.isAuthenticated()){
            throw new Error('Token not found');
        }
        return axios.get(`${API_URL}/groups/${id}`, {
            headers: {
                Authorization: `${authService.getToken()}`
            }
        })
            .then((response) => response.data)
            .catch((e)=>{
                console.log('Error: ' + e);
            });
    }
}

export default groupService;