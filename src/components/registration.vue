<template>
  <v-form class="login-form" @submit.prevent="onRegistration">
    <v-text-field v-model="email" prepend-icon="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field
      v-model="password"
      prepend-icon="lock"
      required
      name="password"
      label="Password"
      type="password"
    ></v-text-field>
    <v-text-field
      v-model="confirmPassword"
      :rules="[confermPasswordMethod]"
      prepend-icon="lock"
      name="confirmPassword"
      label="Confirm Password"
      type="password"
    ></v-text-field>
    <v-card-actions class="btn-area-registration">
      <v-btn color="red" type="submit" class="white--text" primary large>
        registration
        <v-icon dark right>how_to_reg</v-icon>
      </v-btn>
      <div class="already-have-account-link" @click="registratinEvent">i already have an account</div>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
  name: "registration",
  data: () => ({
    login: false,
    password: null,
    confirmPassword: null,
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
  }),
  computed: {
    confermPasswordMethod() {
      return this.password !== this.confirmPassword
        ? "password not math!"
        : true;
    },
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
  },
  methods: {
    registratinEvent() {
      this.$emit("loginData", false);
    },

    onRegistration() {
      this.$store.dispatch("userRegistrationUp", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
<style>
.already-have-account-link {
  color: blue;
  margin: 10px;
  font-size: 17px;
  text-decoration: underline blue;
  cursor: pointer;
}
.btn-area-registration {
  display: flex;
  flex-direction: column;
}
</style>