<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-main>
     <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import CompaniesView from "./views/CompaniesView";
export default {
  name: 'App',
  components: {CompaniesView},
  data: () => ({
  }),
  mounted() {
    this.$store.dispatch('getAllCompanies').catch(error => {
      alert(error.response.data)
    })
  },
};
</script>
