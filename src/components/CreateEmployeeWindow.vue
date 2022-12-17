<template>
  <v-dialog v-model="dialog" width="25%" transition="dialog-bottom-transition">
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
      <v-card-title>
        <div>
          <span>Create Company</span>
        </div>
      </v-card-title>
      <v-text-field
          class="dialog-input"
          v-model="newEmployee.name"
          label="name">
      </v-text-field>
      <v-text-field
          class="dialog-input"
          v-model="newEmployee.surname"
          label="surname">
      </v-text-field>
      <v-text-field
          type="number"
          class="dialog-input"
          v-model="newEmployee.salary"
          label="salary">
      </v-text-field>
      <v-text-field
          type="number"
          class="dialog-input"
          v-model="newEmployee.pesel"
          label="pesel">
      </v-text-field>
      <v-footer class="justify-end">
        <v-btn @click="createEmployee()">Create</v-btn>
      </v-footer>
    </v-card>
  </v-dialog>
</template>

<script>
import {createEmployee} from "../api/api";

export default {
  name: "CreateEmployeeWindow",

  data() {
    return {
      dialog: false,
      newEmployee: {
        name: '',
        surname: '',
        salary: null,
        pesel: null,
        companyId: null,
      }
    }
  },
  methods: {
    createEmployee() {
      createEmployee(this.newEmployee)
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

</style>