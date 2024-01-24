<template>
  <v-edit-dialog
      large
      persistent
      @save="hireEmployee">
    <v-btn
        class="create-button"
        color="primary">
      <span>Hire Employee</span>
    </v-btn>

    <template v-slot:input>
      <div class="mt-4 text-h6">
        Hire Employee
      </div>
      <v-autocomplete
          :items="employees"
          label="Employee"
          v-model="selectedEmployee"
          :item-text="getFullName"
          dense
          solo
          clearable
          return-object>
      </v-autocomplete>
      <v-combobox
          :items="allPositions"
          label="Select position"
          v-model="selectedPositions"
          multiple
          item-text="positionName"
      ></v-combobox>
      <div v-if="positions"></div>
    </template>
  </v-edit-dialog>
</template>

<script>

import {addEmployeeToCompany} from "../api/api";

export default {
  name: "HireEmployeeWindow",
  data() {
    return {
      selectedEmployee: {},
      allPositions: [],
      selectedPositions: [],
      fullName: '',
      companyId: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
    }
  },
  computed: {
    employees() {
      let companyEmployees = this.$store.getters.getEmployees
      let allEmployees = this.$store.getters.getAllEmployees
      return allEmployees.filter(function (employee) {
        let i;
        for (i = 0; i < companyEmployees.length; i++) {
          console.log('true')
          if (companyEmployees[i].id === employee.id) {
            console.log('false')
            return false;
          }
        }
        return true;
      })
    },
    positions() {
      this.allPositions = this.$store.getters.getPositions
    }
  },
  methods: {
    hireEmployee() {
      let positionIds = []
      this.selectedPositions.forEach(position => {
        positionIds.push(position.id)
      })
      addEmployeeToCompany({
        employeeId: this.selectedEmployee.id,
        companyId: this.companyId,
        positionIds: positionIds

      }).then(() => {
        this.$store.dispatch('getAllCompanyEmployees', this.companyId)
        this.selectedPositions = []
        this.selectedEmployee = {}
      })
    },
    getFullName(item) {
      return `${item.name} ${item.surname}`;
    },
  }
}
</script>

<style scoped>
.create-button {
  margin-right: 5px;
  background-color: steelblue;
}
</style>