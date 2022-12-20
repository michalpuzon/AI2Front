<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-dialog
        v-model="dialog"
        persistent
        width="600"
        transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="header-dialog">
          <div>
            <span>Edit Employee</span>
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

        <div v-if="positions"></div>

        <v-col>
          <v-text-field
              v-model="existedEmployee.name"
              label="Name"
              :rules="[rules.required]"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
              v-model="existedEmployee.surname"
              label="Surname"
              :rules="[rules.required]"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
              type="number"
              v-model="existedEmployee.salary"
              label="Salary"
              :rules="[rules.required]"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-combobox
              :items="allPositions"
              label="Select position"
              v-model="arrayPositionSelected"
              multiple
              item-text="positionName"
          ></v-combobox>
        </v-col>
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
              @click="editEmployee()"
              :disabled="!valid"
          >
            Save
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
import {setEmployeePositions, updateEmployee} from "../api/api";

export default {
  name: "EditEmployeeWindow",
  props: ['existedEmployee', 'dialog'],
  data() {
    return {
      dialogValue: this.dialog,
      valid: true,
      snackbarSuccess: false,
      snackBarError: false,
      companyId: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
      allPositions: [],
      arrayPositionSelected: [],
      items: [],
      rules: {
        required: v => !!v || 'The field is required'
      }
    }
  },
  computed: {
    positions() {
      this.allPositions = this.$store.getters.getPositions
    }
  },
  methods: {
    closeDialog() {
      this.$store.dispatch('getAllCompanyEmployees', this.companyId)
      this.$emit('update:dialog', this.dialogValue = false)
    },
    editEmployee() {
      if (this.$refs.form.validate()) {
        updateEmployee(this.existedEmployee.id, this.existedEmployee).then(() =>
            this.$store.dispatch('getAllCompanyEmployees', this.companyId))
        this.setPositionForEmployee()
        this.closeDialog()
        this.snackbarSuccess = true;
      } else {
        this.snackBarError = true;
      }
    },
    setPositionForEmployee() {
      const positionsIds = this.arrayPositionSelected.map(p => p.id)
      setEmployeePositions({
        employeeId: this.existedEmployee.id,
        companyId: this.companyId,
        positionIds: positionsIds
      })
    }
  }
}
</script>

<style scoped>
.header-dialog {
  background-color: #0275d8;
  color: white;
}
</style>
