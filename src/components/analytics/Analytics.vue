<template>
  <div>
    <h1>Analytics</h1>
    <br>
    <section v-if="user && user.stravaStats">
      <h2>Basic Stats</h2>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <h4>Recent</h4>
          <p>{{ user.stravaStats.recent_run_totals.count }} ride{{user.stravaStats.recent_run_totals.count > 1 ? 's' :
            ''}}</p>
          <p>{{ user.stravaStats.recent_run_totals.distance.toFixed(2) }} m total distance</p>
          <p>{{ (user.stravaStats.recent_run_totals.moving_time / 60).toFixed(0) }}:{{
            (user.stravaStats.recent_run_totals.moving_time % 60).toFixed(0) }} moving time</p>
          <p>{{ user.stravaStats.recent_run_totals.elevation_gain.toFixed(2) }} m elevation gain</p>
        </v-flex>
        <v-flex xs12 sm6>
          <h4>Total</h4>
          <p>{{ user.stravaStats.all_run_totals.count }} ride{{user.stravaStats.all_run_totals.count > 1 ? 's' :
            ''}}</p>
          <p>{{ user.stravaStats.all_run_totals.distance.toFixed(2) }} m total distance</p>
          <p>{{ (user.stravaStats.all_run_totals.moving_time / 60).toFixed(0) }}:{{
            (user.stravaStats.all_run_totals.moving_time % 60).toFixed(0) }} moving time</p>
          <p>{{ user.stravaStats.all_run_totals.elevation_gain.toFixed(2) }} m elevation gain</p>
        </v-flex>
        <br>
        <h2>Exploration</h2>
        <under-construction></under-construction>
        <!--<activity-chart
          style="width: 100%"
          :data="datacollection"
          :options="{responsive: true, maintainAspectRatio: false}">
        </activity-chart>
        <radar-chart
          style="width: 100%"
          :data="datacollection"
          :options="{responsive: true, maintainAspectRatio: false}">
        </radar-chart>-->
      </v-layout>
    </section>

  </div>
</template>

<script>
  import UnderConstruction from '../includes/UnderConstruction'
  import ActivityChart from './ActivityChart'
  import RadarChart from './RadarChart'

  export default {
    name: 'Analytics',
    components: {RadarChart, ActivityChart, UnderConstruction},
    props: {
      user: Object,
    },
    data () {
      return {
        datacollection: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Oktober', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#ff6d00',
              data: [40, 35, 42, 39, 40, 35, 42, 52, 40, 35, 42, 39]
            }
          ]
        }
      }
    },
  }
</script>

<style scoped>

</style>
