<template>
  <v-container fluid>
    <h2>Activity Map</h2>
    <strava-alert v-if="user.provider !== 'strava'" style="height:400px;"></strava-alert>
    <simple-map v-else></simple-map>
  </v-container>
</template>

<script>
  import StravaAlert from "../../includes/StravaAlert";
  import SimpleMap from "../../map/Simple";

  export default {
    name: "ActivityMap",
    components: {StravaAlert, SimpleMap},
    props: {
      user: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style scoped>

</style>
