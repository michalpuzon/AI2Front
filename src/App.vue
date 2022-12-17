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
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({}),
  mounted() {
    this.$store.dispatch('getAllCompanies').catch(error => {
      alert(error.response.data)
    })
  },
};
</script>
