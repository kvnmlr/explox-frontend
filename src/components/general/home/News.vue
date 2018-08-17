<template>
  <v-container fluid grid-list-md>
    <v-layout column wrap>
      <v-flex d-flex xs12>
        <v-card class="gradient-no-switch gradient-green">
          <v-card-title primary class="title"><v-icon>message</v-icon>&nbsp;Headline</v-card-title>
          <v-card-text>News Text Here.</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12>
        <v-card class="gradient-no-switch gradient-green">
          <v-card-title primary class="title"><v-icon>message</v-icon>&nbsp;Headline</v-card-title>
          <v-card-text>News Text Here.</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: "News"
    }
</script>

<style scoped>

</style>
