<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <router-link to="/" class="text-decoration-none">
        <v-btn
            text
            @click="goToCompanies"
        >
          <span class="mr-2">Company</span>
        </v-btn>
      </router-link>
      <v-btn v-if="!$store.getters.getToken" @click="showLoginDialog" class="custom-btn ml-auto mr-5">Log in
      </v-btn>
      <v-btn v-if="$store.getters.getToken" @click="logOut" class="custom-btn ml-auto mr-5">Log out</v-btn>
      <LoginDialog @login-success="closeLoginDialog" ref="loginDialog"/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import LoginDialog from "./components/LoginDialog";
import router from "@/router";

export default {
  name: 'App',
  components: {
    LoginDialog
  },
  data: () => ({}),
  methods: {
    showLoginDialog() {
      this.$refs.loginDialog.dialog = true;
    },
    closeLoginDialog() {
      this.$refs.loginDialog.dialog = false;
    },
    logOut() {
      this.$store.dispatch('clearToken')
      router.push('/')
    },
    goToCompanies() {
      router.push('/companies')
    }
  },
};
</script>

<style scoped>
#app .v-btn.custom-btn {
  color: white;
  background-color: transparent;
}
</style>
