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
        groupId: null,
        parliamentId: null,
        photo: null
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
            state.loggedIn = false;
            state.username = null;
            state.email = null;
            state.userRole = null;
            state.userid = null;
            state.name = null;
            state.surname = null;
            state.groupId = null;
            state.parliamentId = null;
            state.photo = null;
        },
        setName(state, name) {
            state.name = name;
        },
        setSurname(state, surname) {
            state.surname = surname;
        },
        setGroupId(state, groupId) {
            state.groupId = groupId;
        },
        setParliamentId(state, parliamentId) {
            state.parliamentId = parliamentId;
        },
        setPhoto(state, photo) {
            state.photo = photo;
        }
    },
    actions: {
        async fetchUserProfile({ commit }) {
            try {
                const userProfile = await authService.getAuthData();
                commit('setUser', userProfile.user);
                commit('setEmail', userProfile.email);
                commit('setUserRole', userProfile.userRole);
                commit('setUserId', userProfile.id);
                commit('setLoggedIn', true);
                commit('setName', userProfile.name);
                commit('setSurname', userProfile.surname);
                commit('setPhoto', userProfile.photo);
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
            commit('logOut');
            authService.logout();
        },
        setName({ commit }, name) {
            commit('setName', name);
        },
        setSurname({ commit }, surname) {
            commit('setSurname', surname);
        },
        setGroupId({ commit }, groupId) {
            commit('setGroupId', groupId);
        },
        setParliamentId({ commit }, parliamentId) {
            commit('setParliamentId', parliamentId);
        },
        setPhoto({ commit }, photo) {
            commit('setPhoto', photo);
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
        },
        getGroupId: state => {
            return state.groupId;
        },
        getParliamentId: state => {
            return state.parliamentId;
        },
        getPhoto: state => {
            return state.photo;
        }
    },
    plugins: [createPersistedState()],
});

export default store;