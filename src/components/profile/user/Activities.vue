<template>
  <v-container fluid style="min-height:500px;">
    <strava-alert v-if="user.provider !== 'strava'" style="height:400px;"></strava-alert>

    <div v-else>
      <h2>
        <v-icon>check</v-icon>&nbsp;Your Activities
      </h2>
      <v-layout row wrap>
        <v-flex xs12 sm7 md7 style="padding-right:20px;">
          <br>
          <activity v-for="(activity, i) in user.activities" v-bind:activity="activity" :key="i"></activity>
        </v-flex>
        <v-flex class="hidden-sm-and-down" md5 style="padding-left:20px;">
          <br>
          <img v-if="user.activities.length > 2" style="width:100%" src="@/assets/img/bicycle-cloud-clouds.jpg" class="elevation-5">
          <img v-else style="width:100%" src="@/assets/img/bicycle-cloud-clouds-2.jpg" class="elevation-5">

        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
  import StravaAlert from "../../includes/StravaAlert";
  import Activity from "../../activities/Activity";

  export default {
    name: "Activities",
    components: {
      StravaAlert,
      Activity
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
