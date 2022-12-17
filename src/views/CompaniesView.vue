<template>
  <v-container>
    <div>
      <v-row class="justify-end">
        <create-company-window></create-company-window>
      </v-row>
    </div>
    <v-data-table
        :headers="headers"
        :items="companies">
      <template v-slot:item.employees="{ item }">
        <div v-for="(employee, index) in item.employees">
          {{ employee.name }} {{ employee.surname }}
          <div v-if="index !== item.employees.length -1"/>
        </div>
      </template>
      <template v-slot:item.positions="{ item }">
        <div v-for="(position, index) in item.positions">
          {{ position.positionName }}
          <div v-if="index !== item.positions.length -1"/>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="deleteCompany(item)" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn @click="editCompany(item)" icon>
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import CreateCompanyWindow from "../components/CreateCompanyWindow";
import {deleteCompany} from "../api/api";

export default {
  name: "CompaniesView",
  components: {CreateCompanyWindow},
  data: () => ({
    headers: [{
      text: 'Name',
      align: 'start',
      sortable: false,
      value: 'name'
    },
      {
        text: 'Employees',
        value: 'employees'
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
    companies() {
      return this.$store.getters.getCompanies
    },
  },
  methods: {
    deleteCompany(company) {
      deleteCompany(company.id).then(res => {
        this.$store.dispatch('getAllCompanies', res.data)
      }).catch(err => alert(err.response.data))
    },
    editCompany() {

    }
  }
}
</script>

<style scoped>

.margin-15 {
  margin: 15px;
}

</style>