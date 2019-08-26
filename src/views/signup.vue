<template>
  <div class="home">
    <div>
      <h1>SignUp</h1>
    </div>

    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 2" class="mx-auto" max-width="550">
              <transition name="component-fade" mode="out-in">
                <login v-on:loginData="toggleSignup" v-if="login"></login>
                <registration v-else v-on:loginData="toggleSignup"></registration>
              </transition>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import login from "@/components/login.vue";
import registration from "@/components/registration.vue";

export default {
  name: "signup",
  components: {
    login,
    registration
  },
  data() {
    return {
      login: true
    };
  },
  methods: {
    toggleSignup() {
      this.login = !this.login;
    }
  }
};
</script>
<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
h1 {
  font-size: 40px;
  text-align: center;
  padding-top: 40px;
}
</style>