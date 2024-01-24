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
        >
          <span class="mr-2">Company</span>
        </v-btn>
      </router-link>
      <v-btn @click="showLoginDialog" class="custom-btn ml-auto mr-5">Zaloguj się</v-btn>
      <LoginDialog @login-success="closeLoginDialog" ref="loginDialog"/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import LoginDialog from "./components/LoginDialog";

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
    }
  },
  mounted() {
    this.$store.dispatch('getAllCompanies').catch(error => {
      alert(error.response.data)
    })
  },
};
</script>

<style scoped>
#app .v-btn.custom-btn {
  color: white;
  background-color: transparent;
}
</style>
