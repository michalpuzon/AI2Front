<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="fill-height"
  >
    <v-dialog
        v-model="dialog"
        persistent
        width="600"
        transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            class="create-button"
            color="primary"
            v-on="on"
            v-bind="attrs">
          <span>Create Employee</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="header-dialog">
          <div>
            <span>Create Employee</span>
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
            v-model="newEmployee.name"
            label="Name"
            :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
            class="ma-2"
            v-model="newEmployee.surname"
            label="Surname"
            :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
            type="number"
            class="ma-2"
            v-model="newEmployee.salary"
            label="Salary"
            :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
            type="number"
            class="ma-2"
            v-model="newEmployee.pesel"
            label="Pesel"
            :rules="[rules.required, rules.pesel]"
        >
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
              @click="createEmployee()"
              :disabled="!valid"
          >
            Create
          </v-btn>
        </v-footer>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="snackbarSuccess"
        right
        height="100"
        color="success"
        rounded
        elevation="8"
    >
      Congratulations! You have successfully added an employee.
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
  </v-form>
</template>

<script>
import {createEmployee} from "../api/api";

export default {
  name: "CreateEmployeeWindow",
  props: ['companyId'],
  data() {
    return {
      dialog: false,
      valid: true,
      snackbarSuccess: false,
      snackBarError: false,
      newEmployee: {
        name: '',
        surname: '',
        salary: '',
        pesel: '',
        companyId: this.companyId,
      },
      rules: {
        required: v => !!v || 'The field is required',
        pesel: v => v.length === 11 || 'The pesel have 11 char'
      }
    }
  },
  methods: {
    createEmployee() {
      if (this.$refs.form.validate() && this.newEmployee.pesel) {
        createEmployee(this.newEmployee)
        this.closeDialog()
        this.snackbarSuccess = true;
      } else {
        this.snackBarError = true;
      }
    },
    closeDialog() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.newEmployee = {pesel: ''};
    }
  },
  computed: {
    companies() {
      return this.$store.getters.getCompanies
    },
  },
}
</script>

<style scoped>
.header-dialog {
  background-color: #0275d8;
  color: white;
}
</style>
