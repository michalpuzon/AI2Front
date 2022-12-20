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
        <v-text-field
            class="ma-2"
            v-model="existedEmployee.name"
            label="Name"
            :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
            class="ma-2"
            v-model="existedEmployee.surname"
            label="Surname"
            :rules="[rules.required]"
        >
        </v-text-field>
        <v-text-field
            type="number"
            class="ma-2"
            v-model="existedEmployee.salary"
            label="Salary"
            :rules="[rules.required]"
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
              @click="editEmployee()"
              :disabled="!valid"
          >
            Edit
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
import {updateEmployee} from "../api/api";

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
      rules: {
        required: v => !!v || 'The field is required'
      }
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
        this.closeDialog()
        this.snackbarSuccess = true;
      } else {
        this.snackBarError = true;
      }
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
