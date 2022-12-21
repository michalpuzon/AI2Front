<template>
  <v-container>
    <div v-if="getEmployeesComputed"></div>
    <div v-if="getPositions"></div>
    <div v-if="getAllEmployees"></div>
    <div>
      <v-row class="justify-end margin-15">
        <hire-employee-window/>
        <create-positions-window/>
        <create-employee-window/>
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
      <template v-slot:item.positions="{ item }">
        <div v-for="(position, index) in item.positions">
          {{ position.positionName }}
          <div v-if="index !== item.positions.length -1"/>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                @click="deleteEmployeeFromCompany(item)"
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
                icon
                v-bind="attrs"
                v-on="on"
                @click="openDialog(item)"
            >
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>

        <edit-employee-window :dialog.sync="dialog"
                              :existed-employee="existedEmployee"></edit-employee-window>

      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {deleteEmployee, removeEmployeeFromCompany, setEmployeePositions} from "../api/api";
import CreateEmployeeWindow from "../components/CreateEmployeeWindow.vue";
import EditEmployeeWindow from "../components/EditEmployeeWindow";
import CreatePositionsWindow from "../components/CreatePositionsWindow.vue";
import HireEmployeeWindow from "../components/HireEmployeeWindow";

export default {
  name: "EmployeesView",
  components: {HireEmployeeWindow, CreatePositionsWindow, EditEmployeeWindow, CreateEmployeeWindow},
  data: () => ({
    search: '',
    companyId: null,
    dialog: false,
    existedEmployee: [],
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
        value: 'positions'
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
    },
    getPositions() {
      this.$store.dispatch('getCompanyPositions', this.companyId)
    },
    getAllEmployees() {
      this.$store.dispatch('getAllEmployees')
    }
  },
  methods: {
    deleteEmployeeFromCompany(employee) {
      removeEmployeeFromCompany({
        employeeId: employee.id,
        companyId: this.companyId
      }).then(() => {
        setEmployeePositions({
          employeeId: employee.id,
          companyId: this.companyId,
          positionIds: []
        })
        this.getEmployees()
      })
    },
    getEmployees() {
      this.companyId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
      this.$store.dispatch('getAllCompanyEmployees', this.companyId)
    },
    openDialog(item) {
      this.existedEmployee = item
      this.dialog = true;
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
