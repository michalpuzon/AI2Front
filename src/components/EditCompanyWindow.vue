<template>
  <v-edit-dialog
      :return-value.sync="company.name"
      large
      persistent
      @save="editCompany(company.id, company)"
  >
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
      <span>Edit</span>
    </v-tooltip>

    <template v-slot:input>
      <div class="mt-4 text-h6">
        Update Name
      </div>
      <v-text-field
          v-model="company.name"
          label="Edit"
          single-line
          counter
          autofocus
      ></v-text-field>
    </template>
  </v-edit-dialog>
</template>

<script>
import {updateCompany} from "../api/api";

export default {
  name: "EditCompanyWindow",
  props: ['company'],
  methods: {
    editCompany(companyId, newCompany) {
      updateCompany(companyId, newCompany)
    },
  }
}
</script>

<style scoped>

</style>
