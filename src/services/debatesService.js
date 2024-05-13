// services/debatesService.js
import axios from 'axios';
import authService from "@/services/authService.js";
import {startAuthentication} from "@simplewebauthn/browser";
import CryptoJS from 'crypto-js';
import EncryptRsa from 'encrypt-rsa';
import JSEncrypt from 'jsencrypt';

const API_URL = import.meta.env.VITE_API_URL;
const AES_SECRET = import.meta.env.VITE_AES_SECRET;

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
    },
    secureSubmitVote: async (id, vote) => {
        const encryptRsa = new EncryptRsa();
        let crypt = new JSEncrypt();
        try {
            const keyResponse = await axios.get(`${API_URL}/auth/publicKey`,{
                headers: {
                    Authorization: `${authService.getToken()}`
                }
            });
           crypt.setPublicKey(keyResponse.data.publicKey);

            const response = await axios.get(`${API_URL}/auth/loginKey/start`, {
                headers: {
                    Authorization: `${authService.getToken()}`
                }
            });
            let asseResp;
            asseResp = await startAuthentication(response.data);
            const securityVote = asseResp.id+";"+vote+";"+id;
            let enc = crypt.encrypt(securityVote);
            asseResp.vote = enc;
            const finishResponse = await axios.post(`${API_URL}/debates/${id}/vote/secure`, asseResp, {
                headers: {
                    Authorization: `${authService.getToken()}`
                }
            });
            return finishResponse.data;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw Error('The operation was cancelled by the user');
            } else if (error.name === 'NotAllowedError') {
                throw Error('The operation was rejected by the user');
            } else if (error.name === 'InvalidStateError') {
                throw Error('Authenticator was probably already registered by user');
            } else if (error.response) {
                throw Error(error.response.data.message || 'Failed to use the key');
            } else {
                throw Error(error.message || 'An error occurred');
            }
        }
    },
    sendMessage: async (id, message) => {
        try {
            let encrypted = CryptoJS.AES.encrypt(message, AES_SECRET);
            const secureMessage = { content: encrypted.toString() };

            const response = await axios.post(`${API_URL}/debates/${id}/message`, secureMessage,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });
            return response.data;
        } catch (error) {
            throw new Error(error.message || 'Failed to send message');
        }
    },
    getMessages: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/debates/${id}/messages`,
                {
                    headers: {
                        Authorization: `${authService.getToken()}`
                    }
                });

            for(let i = 0; i < response.data.length; i++){
                let decrypted = CryptoJS.AES.decrypt(response.data[i].content, AES_SECRET);
                response.data[i].content = decrypted.toString(CryptoJS.enc.Utf8);
            }

            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Failed to get messages');
        }
    },
};

export default debateService;