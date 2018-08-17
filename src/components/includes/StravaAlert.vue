<template>
  <v-container grid-list-md>
    <v-layout>
      <v-flex xs12>
        <v-alert class="elevation-10 gradient-no-switch gradient-green" :value=true type="info" color="primary" transition="slide-y-transition">
          <v-layout row wrap>
            <v-flex sm12 md4>
              <p style="margin-top: 10px; color: black"><b>You are not connected to Strava.</b><br>Please connect to Strava to make this function available.
              </p>
            </v-flex>

            <v-flex sm12 md4>
              <strava-login v-bind:text="'Connect'"></strava-login>
            </v-flex>
            <v-flex sm12 md4>
              <v-btn class="gradient gradient-secondary" large round dark v-on:click="() => this.$router.push('/strava')">
                <v-icon>info</v-icon>&nbsp;Learn More</v-btn>
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
