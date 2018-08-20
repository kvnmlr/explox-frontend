<template>
  <v-container fluid style="min-height:500px;">
    <strava-alert v-if="user.provider !== 'strava'" style="height:400px;"></strava-alert>

    <div v-else>
      <v-layout row wrap>
        <v-flex xs12 sm6 style="padding-right:20px;">
          <h2><v-icon>gesture</v-icon>&nbsp;Personal Routes</h2>
          <br>
          <route v-for="(route, i) in user.routes" v-bind:route="route" :key="i"></route>
        </v-flex>
        <v-flex xs12 sm6 style="padding-left:20px;">
          <h2><v-icon>star</v-icon>&nbsp;Starred Routes</h2>
          <br>
          <p>You have not starred any routes</p>
          <route v-for="(route, i) in []" v-bind:route="route" :key="i"></route>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
  import StravaAlert from "../../includes/StravaAlert";
  import Route from "../../routes/Route";

  export default {
    name: "PersonalRoutes",
    components: {
      StravaAlert,
      Route
    },
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
  }
</script>

<style scoped>

</style>
