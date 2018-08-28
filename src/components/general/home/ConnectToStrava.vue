<template>
  <div>
    <h1>Connect to Strava</h1>
    <h4 v-if="user && user.provider === 'strava'">
      <v-icon>check</v-icon>
      &nbsp;You are already connected to Strava, great!
      <br>
    </h4>
    <v-card class="elevation-0" style="padding: 10px;">
      <v-layout row wrap style="margin:30px;">
        <v-flex xs12 sm6 md6>
          <h2>Activities</h2>
          <p>ExploX loads all your activities from your Strava profile and use them to display your activity map,
            generate
            personalized routes for you or do analyses on your data.</p>
          <h2>Routes</h2>
          <p>Whether you already have a Strava profile or not, just click on 'Connect to Strava' and log in or create a
            new account.
            After that, you can use all ExploX features.</p>
          <strava-login v-if="!user || user.provider !== 'strava'" v-bind:text="'Connect'"
                        style="margin-top: 20px;"></strava-login>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-container>
            <img style="width:100%;" src="@/assets/img/adventure-bikers-bikes.jpg" class="elevation-5">
          </v-container>
        </v-flex>
      </v-layout>
    </v-card>

    <v-card class="gradient-no-switch gradient-secondary elevation-5" dark style="padding-top: 5px;">
      <v-layout row wrap style="margin:30px;">
        <v-flex xs12 sm6 md6>
          <v-container>
            <img style="width:100%;" src="@/assets/img/bicycle-bike-brakes.jpg">
          </v-container>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-container>
            <h2 style="color: white">Collected Data</h2>
            <p>ExploX loads all your activities from your Strava profile and use them to display your activity map,
              generate
              personalized routes for you or do analyses on your data.</p>
            <h2 style="color: white">Connect to Strava</h2>
            <p>Whether you already have a Strava profile or not, just click on 'Connect to Strava' and log in or create
              a
              new account.
              After that, you can use all ExploX features.</p>
            <strava-login v-if="!user || user.provider !== 'strava'" v-bind:text="'Connect to Strava'"
                          style="margin-top: 20px;"></strava-login>
          </v-container>

        </v-flex>
      </v-layout>
    </v-card>

  </div>
</template>

<script>
  import StravaLogin from "../../includes/StravaLogin";

  export default {
    name: "ConnectToStrava",
    components: {StravaLogin},
    props: {
      user: Object,
    }
  }
</script>

<style scoped>

</style>
