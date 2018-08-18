<template>
  <v-flex xs12>
      <v-card class="gradient-no-switch gradient-green" hover :to="{path: '/route/' + route._id}">
        <v-card-title primary-title>
          <v-layout column>
            <v-flex class="headline">
              <h5>{{ route.title }}</h5>
            </v-flex>
            <v-flex>{{ route.body }}</v-flex>
          </v-layout>
        </v-card-title>
        <v-card-actions>
          <v-btn flat round color="primary">Show Details</v-btn>
        </v-card-actions>
      </v-card>
    <br>
  </v-flex>
</template>

<script>
  export default {
    props: {
      route: {
        type: Object,
        required: true,
      }
    },
    name: 'Route'
  }
</script>

<style scoped>
</style>
