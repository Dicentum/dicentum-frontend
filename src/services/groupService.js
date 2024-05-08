// services/groupService.js
import axios from 'axios';
import authService from "@/services/authService.js";
import parliamentService from "@/services/parliamentService.js";
import {createRouterMatcher as Promise} from "vue-router";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'session';

const groupService = {
    getGroups: async () => {
        return axios.get(`${API_URL}/groups`)
            .then((response) => response.data)
            .catch((e) => {
                console.log('Error: ' + e);
            });
    },
    getGroup: async (id) => {

        return axios.get(`${API_URL}/groups/${id}`, {
            headers: {
                Authorization: `${authService.getToken()}`
            }
        })
            .then((response) => response.data)
            .catch((e) => {
                console.log('Error: ' + e);
            });
    },
    getGroupsRelated: async (parliamentId) => {

        return axios.get(`${API_URL}/parliaments/${parliamentId}`, {
            headers: {
                Authorization: `${authService.getToken()}`
            }
        })
            .then((response) => response.data.parliamentaryGroups)
            .catch((e) => {
                console.log('Error: ' + e);
            });
    },
    requestGroup: async (groupId, userId) => {
        try {
            const response = await axios.post(`${API_URL}/groups/request/${groupId}`, userId,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to request group');
        }
    },
    deleteRequestGroup: async (groupId, userId) => {
        try {
            const response = await axios.delete(`${API_URL}/groups/request/${groupId}/${userId}`,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to delete request group');
        }
    },
    acceptRequestGroup: async (groupId, userId) => {
        try {
            const response = await axios.post(`${API_URL}/groups/approve/${groupId}/${userId}`,{},
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to accept request group');
        }
    },
    createGroup: async (group) => {
        try {
            const response = await axios.post(`${API_URL}/groups`, group,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to create group');
        }
    },
    updateGroup: async (id, group) => {
        try {
            const response = await axios.put(`${API_URL}/groups/${id}`, group,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to update group');
        }
    },
    deleteGroup: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/groups/${id}`,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to delete group');
        }
    },
}

export default groupService;