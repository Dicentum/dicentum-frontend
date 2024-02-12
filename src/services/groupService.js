// services/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
export default class groupService{

    getGroups(){
        return axios.get(`${API_URL}/groups`)
        .then((response) => response.data)
        .catch((e)=>{
            console.log('Error: ' + e);
        });
    }
}
