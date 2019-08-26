import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import firebase from "firebase";
import "./db";

Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged(async user => {
  if (!app) {
    //wait to get user
    var user = await firebase.auth().currentUser;

    //start app
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
