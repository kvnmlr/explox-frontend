<template>
  <v-container fluid style="min-height:500px;">
    <h2>Activities</h2>
    <strava-alert v-if="user.provider !== 'strava'" style="height:400px;"></strava-alert>
  </v-container>
</template>

<script>
  import StravaAlert from "../../includes/StravaAlert";

  export default {
    name: "Activities",
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
