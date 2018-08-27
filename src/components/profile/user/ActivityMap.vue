<template>
  <v-container v-else style="min-height:500px;">
    <strava-alert v-if="user.provider !== 'strava'" style="height:400px;"></strava-alert>
    <simple-map show-activity-map v-else style="width: 100%;"></simple-map>
  </v-container>
</template>

<script>
  import StravaAlert from "../../includes/StravaAlert";
  import SimpleMap from "../../map/LeafletMap";
  import FullscreenRoute from "../../general/FullscreenRoute";
  import {EventBus} from '@/eventBus.js';

  export default {
    name: "ActivityMap",
    components: {FullscreenRoute, StravaAlert, SimpleMap},
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
    created() {
    },
  }
</script>

<style scoped>

</style>
