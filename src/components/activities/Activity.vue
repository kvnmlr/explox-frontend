<template>
  <v-flex xs12>
    <v-card class="gradient-no-switch gradient-orange" dark hover :to="{path: '/activity/' + activity._id}">
      <v-card-title primary-title>
        <v-layout column>
          <v-flex class="headline">
            <h5>{{ activity.title }}</h5>
          </v-flex>
          <v-flex>on {{ formatDate(activity.strava.start_date_local, false, true) }}</v-flex>
          <div v-if="!dense">
            <br>
            <v-flex >Distance: {{ activity.distance }}</v-flex>
          </div>
        </v-layout>
      </v-card-title>
      <v-card-actions v-if="!dense">
        <v-btn style="margin-top: -15px;" flat dark round color="black">Show Details</v-btn>
      </v-card-actions>
    </v-card>
    <br>
  </v-flex>
</template>

<script>
  import formatDateMixin from "../../mixins/formatDateMixin";

  export default {
    props: {
      dense: Boolean,
      activity: {
        type: Object,
        required: true,
      }
    },
    name: 'Route',
    mixins: [formatDateMixin]
  }
</script>

<style scoped>
</style>
