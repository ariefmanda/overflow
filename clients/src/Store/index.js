import Vue from "vue";
import Vuex from "vuex";
import category from "./category/index";
import question from "./question/index";
let axios = require("axios").create({
  baseURL: "http://35.200.153.228:3004/api" //35.200.153.228
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    UserId: localStorage.getItem("UserId"),
    admin: localStorage.getItem("admin"),
    categories: [],
    questions: []
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
    setCategories(state, payload) {
      state.categories = payload;
    },
    setQuestions(state, payload) {
      state.questions = payload;
    }
  },
  actions: {
    setToken({ commit }, payload) {
      commit("setToken", payload);
    },
    setAdmin({ commit }, payload) {
      commit("setAdmin", payload);
    },
    setUserId({ commit }, payload) {
      commit("setUserId", payload);
    },
    getCategories({ commit }) {
      axios
        .get("/category")
        .then(({ data }) => {
          commit("setCategories", data);
        })
        .catch(err => {
          console.error(err);
        });
    },
    getQuestions({ commit }) {
      axios
        .get("/question")
        .then(({ data }) => {
          data = data.sort((a, b) => {
            b.point.length > a.point.length;
          });
          commit("setQuestions", data);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});
