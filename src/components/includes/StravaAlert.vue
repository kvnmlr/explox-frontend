<template>
  <v-container grid-list-md>
    <v-layout>
      <v-flex xs12>
        <v-alert class="elevation-10" :value=true type="info" color="accent" transition="slide-y-transition">
          <v-layout row wrap>
            <v-flex xs12 sm5>
              <p style="margin-top: 10px;"><b>You are not connected to Strava.</b><br>This function is not available.
              </p>
            </v-flex>
            <v-flex xs12 sm3>
              <v-btn outline color="white" v-on:click="() => this.$router.push('/strava')">Learn More</v-btn>
            </v-flex>
            <v-flex xs12 sm4>
              <strava-login v-bind:text="'Connect to Strava'"></strava-login>
            </v-flex>
          </v-layout>
        </v-alert>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import StravaLogin from "./StravaLogin";

  export default {
    name: "StravaAlert",
    components: {StravaLogin}
  }
</script>

<style scoped>

</style>
