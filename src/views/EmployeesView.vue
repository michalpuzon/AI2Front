<template>
  <v-container>
    <div v-if="getEmployeesComputed"></div>
    <div>
      <v-row class="justify-end">

      </v-row>
    </div>

    <v-text-field
        v-model="search"
        label="Search employee"
        single-line
        hide-details
    ></v-text-field>

    <v-data-table
        :headers="headers"
        :items="employees"
        :search="search"
        class="data-table"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
            @click="deleteEmployee(item)"
            icon
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
            @click="editCompany(item)"
            icon
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {deleteEmployee} from "../api/api";

export default {
  name: "EmployeesView",
  data: () => ({
    search: '',
    headers: [{
      text: 'Name',
      align: 'start',
      sortable: false,
      value: 'name'
    },
      {
        text: 'Surname',
        value: 'surname'
      },
      {
        text: 'Pesel',
        value: 'pesel'
      },
      {
        text: 'Salary',
        value: 'salary'
      },
      {
        text: 'Actions',
        value: 'actions'
      }]
  }),
  computed: {
    employees() {
      return this.$store.getters.getEmployees
    },
    getEmployeesComputed() {
      this.getEmployees()
    }
  },
  methods: {
    deleteEmployee(employee) {
      deleteEmployee(employee.id).then(() => {
        this.getEmployees()
      })
    },
    editCompany() {

    },
    getEmployees() {
      let companyId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
      this.$store.dispatch('getAllCompanyEmployees', companyId)
    }
  }
}
</script>

<style scoped>
.margin-15 {
  margin: 15px;
}

.data-table {
  font-size: 2em;
  margin-top: 5vh;
}
</style>
