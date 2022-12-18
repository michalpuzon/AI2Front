<template>
  <v-dialog
      v-model="dialog"
      width="400"
      transition="dialog-bottom-transition"
  >
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
      <v-card-title class="header-dialog">
        <div>
          <span>Create Company</span>
        </div>
        <v-spacer></v-spacer>

        <v-btn
            icon
            color="white"
            @click="closeDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-text-field
          class="ma-2"
          v-model="newCompany.name"
          label="Name">
      </v-text-field>
      <v-footer class="justify-end">
        <v-btn
            text
            @click="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn
            class="white--text ma-2"
            color="primary"
            elevation="3"
            @click="addCompany"
        >
          Create
        </v-btn>
      </v-footer>
    </v-card>
    <v-snackbar
        v-model="snackbarSuccess"
        right
        height="100"
        color="success"
        rounded
        elevation="8"
    >
      Congratulations! You have successfully added a company.
    </v-snackbar>
    <v-snackbar
        v-model="snackBarError"
        right
        height="100"
        color="error"
        rounded
        elevation="8"
    >
      Error! Please enter the data correctly!
    </v-snackbar>
  </v-dialog>
</template>

<script>
import {createCompany} from "../api/api";

export default {
  name: "CreateCompanyWindow",
  data() {
    return {
      dialog: false,
      snackbarSuccess: false,
      snackBarError: false,
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
          this.closeDialog()
          this.snackbarSuccess = true;
        })
      } else {
        this.snackBarError = true;
      }
    },
    closeDialog() {
      this.dialog = false;
      this.newCompany.name = ''
    }
  }
}
</script>

<style scoped>

.create-button {
  margin: 15px;
  background-color: steelblue;
}

.header-dialog {
  background-color: #0275d8;
  color: white;
}
</style>
