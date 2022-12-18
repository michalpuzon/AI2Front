<template>
  <v-container>
    <div v-if="getEmployeesComputed"></div>
    <div>
      <v-row class="justify-end margin-15">
        <create-employee-window :companyId="companyId"/>
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
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                @click="deleteEmployee(item)"
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                @click="editCompany(item)"
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {deleteEmployee} from "../api/api";
import CreateEmployeeWindow from "../components/CreateEmployeeWindow.vue";

export default {
  name: "EmployeesView",
  components: {CreateEmployeeWindow},
  data: () => ({
    search: '',
    companyId: null,
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
        text: 'Positions',
        value: 'positionName'
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
      this.companyId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
      this.$store.dispatch('getAllCompanyEmployees', this.companyId)
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
