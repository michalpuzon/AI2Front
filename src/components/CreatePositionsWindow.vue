<template>
  <v-edit-dialog
      large
      persistent
      @save="createPositions"
  >
    <v-btn
        class="create-button"
        color="primary">
      <span>Create Position</span>
    </v-btn>

    <template v-slot:input>
      <div class="mt-4 text-h6">
        Create Position
      </div>
      <v-text-field
          v-model="position"
          label="Position name"
          single-line
          counter
          autofocus
      ></v-text-field>
    </template>
  </v-edit-dialog>
</template>

<script>
import {createPosition} from "../api/api";

export default {
  name: "CreatePositionsWindow",
  data: () => ({
    position: '',
    companyId: window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
  }),
  methods: {
    createPositions() {
      if (this.position) {
        createPosition({
          positionName: this.position,
          companyId: this.companyId
        }).then(() => this.$store.dispatch('getCompanyPositions', this.companyId))
        this.position = ''
      }
    }
  }
}
</script>

<style scoped>
.create-button {
  margin-right: 5px;
  background-color: steelblue;
}
</style>
