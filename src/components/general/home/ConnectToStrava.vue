<template>
  <div>
    <h1>Connect to Strava</h1>
    <v-layout row wrap style="margin:30px;">
      <v-flex xs12 sm6 md6>
        <v-container>

          <h2>Activities</h2>
          <p>ExploX loads all your activities from your Strava profile and use them to display your activity map,
            generate
            personalized routes for you or do analyses on your data.</p>
          <h2>Routes</h2>
          <p>Whether you already have a Strava profile or not, just click on 'Connect to Strava' and log in or create a
            new account.
            After that, you can use all ExploX features.</p>
          <strava-login v-bind:text="'Connect'"></strava-login>
        </v-container>

      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-container>
          <img style="width:100%;" src="https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg">

        </v-container>
      </v-flex>
    </v-layout>
    <v-divider horizontal></v-divider>
    <v-layout row wrap style="margin:30px;">
      <v-flex xs12 sm6 md6>
        <img style="width:100%" src="https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg">
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-container>
          <h2>Collected Data</h2>
          <p>ExploX loads all your activities from your Strava profile and use them to display your activity map,
            generate
            personalized routes for you or do analyses on your data.</p>
          <h2>Connect to Strava</h2>
          <p>Whether you already have a Strava profile or not, just click on 'Connect to Strava' and log in or create a
            new account.
            After that, you can use all ExploX features.</p>
        </v-container>

      </v-flex>
      <strava-login v-bind:text="'Connect to Strava'"></strava-login>
    </v-layout>
  </div>
</template>

<script>
  import StravaLogin from "../../includes/StravaLogin";

  export default {
    name: "ConnectToStrava",
    components: {StravaLogin}
  }
</script>

<style scoped>

</style>
