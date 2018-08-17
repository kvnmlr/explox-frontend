<template>
  <v-container v-else style="min-height:500px;">
    <strava-alert v-if="user.provider !== 'strava'" style="height:400px;"></strava-alert>
      <simple-map v-else style="width: 100%;"></simple-map>
    </v-container>
</template>

<script>
  import StravaAlert from "../../includes/StravaAlert";
  import SimpleMap from "../../map/LeafletMap";
  import FullscreenRoute from "../../general/FullscreenRoute";

  export default {
    name: "ActivityMap",
    components: {FullscreenRoute, StravaAlert, SimpleMap},
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
