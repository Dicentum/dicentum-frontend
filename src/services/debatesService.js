// services/debatesService.js
import axios from 'axios';
import authService from "@/services/authService.js";

const API_URL = import.meta.env.VITE_API_URL;

const debateService = {
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
    createDebate: async (debate) => {
        try {
            const response = await axios.post(`${API_URL}/debates`, debate,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to create debate');
        }
    },
    editDebate: async (id, debate) => {
        try {
            const response = await axios.put(`${API_URL}/debates/${id}`, debate,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to edit debate');
        }
    },
    deleteDebate: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/debates/${id}`,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to delete debate');
        }
    },
    submitVote: async (id, vote) => {
        try {
            const response = await axios.post(`${API_URL}/debates/${id}/vote`, vote,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to vote');
        }
    },
    doTally: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/debates/${id}/tally`,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to tally');
        }
    },
    getResult: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/debates/${id}/result`,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to get result');
        }
    }
};

export default debateService;