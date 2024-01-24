<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>
        <v-tabs v-model="tab" background-color="primary" dark>
          <v-tab :key="1" class="full-width-tab">Login</v-tab>
          <v-tab :key="2" class="full-width-tab">Registration</v-tab>
          <v-tabs-slider color="grey"></v-tabs-slider>
        </v-tabs>
      </v-card-title>

      <v-card-text>
        <v-tabs-items v-model="tab">
          <v-tab-item :key="1">
            <v-form @submit.prevent="login">
              <v-text-field v-model="loginForm.username" label="User name"></v-text-field>
              <v-text-field v-model="loginForm.password" label="Password" type="password"></v-text-field>
              <v-footer class="justify-end white">
                <v-btn type="submit" color="primary">Log in</v-btn>
              </v-footer>
            </v-form>
          </v-tab-item>

          <v-tab-item :key="2">
            <v-form @submit.prevent="register">
              <v-text-field v-model="registerForm.username" label="User Name"></v-text-field>
              <v-text-field v-model="registerForm.email" label="Email"></v-text-field>
              <v-text-field v-model="registerForm.password" label="Password" type="password"></v-text-field>
              <v-text-field v-model="registerForm.passwordConfirmation" label="Confirm password"
                            type="password"></v-text-field>
              <v-footer class="justify-end white">
                <v-btn type="submit" color="primary">Register</v-btn>
              </v-footer>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snackbar" :color="snackbarColor" top>
      {{ snackbarText }}
    </v-snackbar>
  </v-dialog>
</template>

<script>
import {login, register} from "../api/api";
import router from "@/router";

export default {
  data() {
    return {
      dialog: false,
      tab: 0,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      snackbar: false,
      snackbarText: '',
      snackbarColor: 'success'
    };
  },
  methods: {
    login() {
      login({
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then((res) => {
            localStorage.setItem('token', res.data.token);
            this.$store.commit('setToken', {token: res.data.token})
            router.push('/companies')
            this.dialog = false;
            this.loginForm.username = ''
            this.loginForm.password = ''
          }
      )

    },
    register() {
      if (this.registerForm.password !== this.registerForm.passwordConfirmation) {
        this.snackbarText = 'The password and password confirmation must be identical.';
        this.snackbarColor = 'error';
        this.showSnackbar();
        return;
      }
      register({
        email: this.registerForm.email,
        login: this.registerForm.username,
        password: this.registerForm.password,
      }).then(() => {
        this.dialog = false;
        this.registerForm.email = ''
        this.registerForm.username = ''
        this.registerForm.password = ''
      })
    },
    showSnackbar() {
      this.snackbar = true;
      setTimeout(() => {
        this.snackbar = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.full-width-tab {
  width: 100%;
}
</style>
