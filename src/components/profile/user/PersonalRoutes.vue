<template>
  <v-container fluid>
    <h2>Personal Routes</h2>
    <strava-alert v-if="user.provider !== 'strava'" style="height:400px;"></strava-alert>
  </v-container>
</template>

<script>
  import StravaAlert from "../../includes/StravaAlert";

  export default {
    name: "PersonalRoutes",
    components: {
      StravaAlert,
    },
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
