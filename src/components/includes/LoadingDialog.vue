<template>
  <div>
    <v-dialog v-if="light || !dark" v-model="show" hide-overlay persistent :width="width">
      <v-card style="padding: 20px;">
        <v-card-text>
          <h3 style="color: black; text-align: center">{{ header }}</h3>
          <v-progress-linear indeterminate color="primary" class="mb-0"></v-progress-linear>
          <div class="separator"></div>
          <p style="text-align: center">{{ body }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-else v-model="show" hide-overlay persistent  :width="width">
      <v-card color="accent" dark style="padding: 50px;">
        <v-card-text>
          <h3 style="color: white; text-align: center">{{ header }}</h3>
          <v-progress-linear indeterminate color="primary" class="mb-0"></v-progress-linear>
          <div class="separator"></div>
          <p style="text-align: center">{{ body }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
  export default {
    name: "LoadingDialog",
    props: {
      show: Boolean,
      header: String,
      body: String,
      light: Boolean,
      dark: Boolean,
      width: Number,
    },
  }
</script>

<style scoped>

</style>
