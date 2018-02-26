import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    UserId: localStorage.getItem('UserId'),
    admin: localStorage.getItem('admin'),
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setAdmin(state, payload) {
      state.admin = payload;
    },
    setUserId(state, payload) {
      state.UserId = payload;
    },
  },
  actions: {
    setToken({ commit }, payload) {
      commit('setToken', payload);
    },
    setAdmin({ commit }, payload) {
      commit('setAdmin', payload);
    },
    setUserId({ commit }, payload) {
      commit('setUserId', payload);
    },
  },
});
