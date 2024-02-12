// store/index.js
import { createStore } from 'vuex';
import authService from '@/services/authService.js';

const store = createStore({
    state: {
        auth: null,
        username: null,
        loggedIn: false
    },
    mutations: {
        setAuth(state, auth) {
            state.auth = auth;
        },
        logIn(state, username){
            state.loggedIn = true;
            state.username = username;
        },
        logOut(state){
            state.loggedIn = false;
        },
    },
    actions: {
        async fetchUserProfile({ commit }) {
            try {
                const userProfile = await authService.getAuthData();
                commit('setUser', userProfile);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        },
        logIn({commit}, username){
            commit("logIn", username);
        }
    },
    getters: {
        getAuth(state) {
            return state.auth;
        }
    }
});

export default store;