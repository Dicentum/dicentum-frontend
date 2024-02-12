// store/index.js
import { createStore } from 'vuex';
import authService from '@/services/authService.js';

const store = createStore({
    state: {
        auth: null,
        username: null,
        email: null,
        userRole: null,
        loggedIn: false
    },
    mutations: {
        setAuth(state, auth) {
            state.auth = auth;
        },
        logIn(state, { username, email, userRole }) {
            state.loggedIn = true;
            state.username = username;
            state.email = email;
            state.userRole = userRole;
        },
        logOut(state) {
            state.loggedIn = false;
            state.username = null;
            state.email = null;
            state.userRole = null;
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
        logIn({ commit }, { username, email, userRole }) {
            commit('logIn', { username, email, userRole });
        }
    },
    getters: {
        getAuth(state) {
            return state.auth;
        },
        getEmail(state) {
            return state.email;
        },
        getUserRole(state) {
            return state.userRole;
        },
    }
});

export default store;