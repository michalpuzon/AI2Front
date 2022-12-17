<template>
  <v-dialog v-model="dialog" width="25%" transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="create-button"
          color="primary"
          v-on="on"
          v-bind="attrs">
        <span>Create Company</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <div>
          <span>Create Company</span>
        </div>
      </v-card-title>
      <v-text-field
          class="dialog-input"
          v-model="newCompany.name"
          label="name">
      </v-text-field>
      <v-footer class="justify-end">
        <v-btn @click="addCompany">Create</v-btn>
      </v-footer>
    </v-card>
  </v-dialog>
</template>

<script>
import {createCompany} from "../api/api";

export default {
  name: "CreateCompanyWindow",
  data() {
    return {
      dialog: false,
      newCompany: {
        name: ''
      }
    }
  },
  methods: {
    addCompany() {
      if (this.newCompany.name !== '') {
        createCompany(this.newCompany).then(res => {
          this.$store.dispatch('getAllCompanies', res.data)
              .catch(err => alert(err.response.data))
          this.dialog = false;
          this.newCompany.name = ''
        })
      }
    }
  }
}
</script>

<style scoped>

.create-button {
  margin: 15px;
  background-color: steelblue;
}

.dialog-input {
  margin: 1vw;
  width: 10vw;
}

</style>