<template>
  <v-form class="login-form" @submit.prevent="onSignIn">
    <v-text-field v-model="email" prepend-icon="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field
      v-model="password"
      prepend-icon="lock"
      required
      name="password"
      label="Password"
      type="password"
    ></v-text-field>
    <v-card-actions class="btn-area-registration">
      <v-btn color="primary" type="submit" primary large block>
        Login
        <v-icon dark right>fingerprint</v-icon>
      </v-btn>
      <v-btn class="ma-2" large block color="secondary" @click="registratinEvent">
        Registration
        <v-icon dark right>how_to_reg</v-icon>
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      login: false,
      password: null,
      valid: false,
      firstname: "",
      lastname: "",
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    registratinEvent() {
      this.$emit("loginData", true);
    },
    onSignIn() {
      this.$store.dispatch("userLoginUp", {
        email: this.email,
        password: this.password
      });
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    user(value) {
      if (value != null && value != undefined) {
        this.$router.push("/");
      }
    }
  }
};
</script>
<style  >
.login-form {
  padding: 20px;
}
</style>