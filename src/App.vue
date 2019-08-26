<template>
  <v-app>
    <navigatin></navigatin>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>


<script>
import navigatin from "./components/navigation";
import firebase from "firebase";
export default {
  name: "app",
  components: {
    navigatin
  },
  created() {
    this.$store.state.user = firebase.auth().currentUser;
  }
};
</script>


<style>
</style>
