<template>
  <v-flex xs12>
      <v-card hover dark :to="{path: '/route/' + route._id}">
        <v-card-title primary-title>
          <v-layout column>
            <v-flex class="headline">
              {{ route.title }}
            </v-flex>
            <v-flex>{{ route.body }}</v-flex>
          </v-layout>
        </v-card-title>
        <v-card-actions>
          <v-btn flat>Show Details</v-btn>
        </v-card-actions>
      </v-card>
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
