import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  },

  actions: {
    userRegistrationUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.user.uid
          };

          user.commit("setUser", newUser);
        })
        .catch(error => {
          console.log(error);
        });
    },
    userLoginUp({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.user.uid
          };

          commit("setUser", newUser);
        })

        .catch(error => {
          console.log(error);
        });
    }
  }
});
