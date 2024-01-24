<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>
        <v-tabs v-model="tab" background-color="primary" dark>
          <v-tab :key="1" class="full-width-tab">Logowanie</v-tab>
          <v-tab :key="2" class="full-width-tab">Rejestracja</v-tab>
          <v-tabs-slider color="grey"></v-tabs-slider>
        </v-tabs>
      </v-card-title>

      <v-card-text>
        <v-tabs-items v-model="tab">
          <v-tab-item :key="1">
            <v-form @submit.prevent="login">
              <v-text-field v-model="loginForm.username" label="Nazwa użytkownika"></v-text-field>
              <v-text-field v-model="loginForm.password" label="Hasło" type="password"></v-text-field>
              <v-btn type="submit" color="primary">Zaloguj się</v-btn>
            </v-form>
          </v-tab-item>

          <v-tab-item :key="2">
            <v-form @submit.prevent="register">
              <v-text-field v-model="registerForm.username" label="Nazwa użytkownika"></v-text-field>
              <v-text-field v-model="registerForm.email" label="Email"></v-text-field>
              <v-text-field v-model="registerForm.password" label="Hasło" type="password"></v-text-field>
              <v-text-field v-model="registerForm.passwordConfirmation" label="Potwierdź hasło"
                            type="password"></v-text-field>
              <v-btn type="submit" color="primary">Zarejestruj się</v-btn>
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
      }).then(() => {
            this.snackbarText = 'Zalogowano pomyślnie!';
            this.showSnackbar();
            this.dialog = false;
          }
      )

    },
    register() {
      if (this.registerForm.password !== this.registerForm.passwordConfirmation) {
        this.snackbarText = 'Hasło i potwierdzenie hasła muszą być identyczne.';
        this.snackbarColor = 'error';
        this.showSnackbar();
        return;
      }
      register({
        email: this.registerForm.email,
        login: this.registerForm.username,
        password: this.registerForm.password,
      }).then(() => {
        this.snackbarText = 'Zarejestrowano pomyślnie!';
        this.showSnackbar();
        this.dialog = false;
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
