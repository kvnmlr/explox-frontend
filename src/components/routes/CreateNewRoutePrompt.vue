<template>
  <v-card class="gradient-no-switch gradient-green">
    <v-card-title primary class="title">
      <v-icon>show_chart</v-icon>&nbsp;Create New Route
    </v-card-title>
    <v-card-text>
      <p>See your personal profile and statistics.</p>
      <v-btn large round dark class="gradient gradient-orange" style="width: 95%; height: 100px; vertical-align: bottom" to="creator">
        <v-icon>gesture</v-icon>&nbsp; Creator
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
    export default {
        name: "CreateNewRoutePrompt"
    }
</script>

<style scoped>

</style>
