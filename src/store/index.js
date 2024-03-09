import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authService from '@/services/authService.js';

const store = new Vuex.Store({
    state: {
        auth: null,
        username: null,
        email: null,
        userRole: null,
        loggedIn: false,
        userid: null,
        name: null,
        surname: null,
    },
    mutations: {
        setAuth(state, auth) {
            state.auth = auth;
        },
        setUser(state, username) {
          state.username = username;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setUserRole(state, userRole) {
            state.userRole = userRole;
        },
        setUserId(state, userid) {
            state.userid = userid;
        },
        setLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn;
        },
        logOut(state) {
            console.log('Logging out... 1');
            state.loggedIn = false;
            state.username = null;
            state.email = null;
            state.userRole = null;
            state.userid = null;
            state.name = null;
            state.surname = null;
        },
        setName(state, name) {
            state.name = name;
        },
        setSurname(state, surname) {
            state.surname = surname;
        }
    },
    actions: {
        async fetchUserProfile({ commit }) {
            try {
                console.log('Fetching user profile...');
                const userProfile = await authService.getAuthData();
                console.log(userProfile);
                commit('setUser', userProfile.user);
                commit('setEmail', userProfile.email);
                commit('setUserRole', userProfile.role);
                commit('setUserId', userProfile.id);
                commit('setLoggedIn', true);
                commit('setName', userProfile.name);
                commit('setSurname', userProfile.surname);
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        },
        setUser({ commit }, username) {
            commit('setUser', username);
        },
        setEmail({ commit }, email) {
            commit('setEmail', email);
        },
        setUserRole({ commit }, userRole) {
            commit('setUserRole', userRole);
        },
        setUserId({ commit }, userid) {
            commit('setUserId', userid);
        },
        setLoggedIn({ commit }, loggedIn) {
            commit('setLoggedIn', loggedIn);
        },
        logOut({ commit }) {
            console.log('Logging out...')
            commit('logOut');
            authService.logout();
        },
        setName({ commit }, name) {
            commit('setName', name);
        },
        setSurname({ commit }, surname) {
            commit('setSurname', surname);
        }
    },
    getters: {
        getAuth: state => {
            return state.auth;
        },
        getEmail: state => {
            return state.email;
        },
        getUser: state => {
            return state.username;
        },
        getUserId: state => {
            return state.userid;
        },
        getUserRole: state => {
            return state.userRole;
        },
        setLoggedIn: state => {
            return state.loggedIn;
        },
        getName: state => {
            return state.name;
        },
        getSurname: state => {
            return state.surname;
        }
    },
    plugins: [createPersistedState()],
});

export default store;