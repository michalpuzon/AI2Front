<template>
  <v-container>
    <div>
      <v-row class="justify-end margin-15">
        <create-company-window></create-company-window>
      </v-row>
    </div>

    <v-text-field
        v-model="search"
        label="Search company"
        single-line
        hide-details
    ></v-text-field>

    <div v-if="getCompanies"></div>

    <v-data-table
        :headers="headers"
        :items="companies"
        :search="search"
        class="data-table"
    >
      <template v-slot:item.name="{ item }">
        <div
            type="button"
            class="rowCompanyName"
            @click="goToEmployees(item)"
        >
          {{ item.name }}
        </div>
      </template>
      <template v-slot:item.employees="{ item }">
        <div v-for="(employee, index) in item.employees">
          {{ employee.name }} {{ employee.surname }}
          <div v-if="index !== item.employees.length -1"/>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                @click="deleteCompany(item)"
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>

        <edit-company-window :company="item"></edit-company-window>

      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import CreateCompanyWindow from "../components/CreateCompanyWindow";
import {deleteCompany} from "../api/api";
import EditCompanyWindow from "../components/EditCompanyWindow";

export default {
  name: "CompaniesView",
  components: {EditCompanyWindow, CreateCompanyWindow},
  data: () => ({
    search: '',
    headers: [{
      text: 'Name',
      align: 'start',
      value: 'name'
    },
      {
        text: 'Employees',
        value: 'employees'
      },
      {
        text: 'Actions',
        value: 'actions'
      }]
  }),
  computed: {
    companies() {
      return this.$store.getters.getCompanies
    },
    getCompanies() {
      this.$store.dispatch('getAllCompanies')
    }
  },
  methods: {
    deleteCompany(company) {
      deleteCompany(company.id).then(res => {
        this.$store.dispatch('getAllCompanies', res.data)
      }).catch(err => alert(err.response.data))
    },
    goToEmployees(company) {
      this.$router.push('employees/' + company.id)
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

.rowCompanyName {
  color: dodgerblue;
}
</style>
