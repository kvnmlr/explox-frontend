<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm9>

      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md6 v-if="user">
        <v-card class="gradient-no-switch gradient-green" hover color="primary" to="/dashboard">
          <v-card-title primary class="title">
            <v-icon>person</v-icon>&nbsp;Dashboard
          </v-card-title>
          <v-card-text>Your personal profile and statistics including your personal activity map.</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6 v-if="user">
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card class="gradient-no-switch gradient-secondary" hover color="dark" dark to="/creator">
              <v-card-title primary class="title">
                <v-icon>gesture</v-icon>&nbsp;Creator
              </v-card-title>
              <v-card-text>Creator let's you create new routes from scratch that perfectly match your cycling style and goals.</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex v-for="n in 1" :key="n" d-flex xs12>
                <v-card class="gradient-no-switch gradient-orange" hover color="dark" dark to="/analytics">
                  <v-card-title primary class="title">
                    <v-icon>flag</v-icon>&nbsp;Analytics
                  </v-card-title>
                  <v-card-text>Run our analysis tools on your activity data to track your progress.</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm4 md4 child-flex>
        <v-card class="gradient-no-switch gradient-orange" hover color="dark" dark to="/routes">
          <v-card-title primary class="title">
            <v-icon>near_me</v-icon>&nbsp;Route Finder
          </v-card-title>
          <v-card-text>The place to discover new routes and search for existing community routes.</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm8 md8>
        <v-card class="gradient-no-switch gradient-secondary" hover color="primary" dark to="/guide">
          <v-card-title primary class="title">
            <v-icon>flight_takeoff</v-icon>&nbsp;Get Started
          </v-card-title>
          <v-card-text>A quick start guide for new members.</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm7 md7 child-flex>
        <v-card class="gradient-no-switch gradient-secondary" hover color="dark" dark to="/feedback">
          <v-card-title primary class="title">
            <v-icon>chat_bubble</v-icon>&nbsp;Contact
          </v-card-title>
          <v-card-text>Reach out to us with feedback or questions about ExploX.</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm5 md5>
        <v-card class="gradient-no-switch gradient-green" hover color="primary" light to="/about">
          <v-card-title primary class="title">
            <v-icon>help</v-icon>&nbsp;About
          </v-card-title>
          <v-card-text>Learn more about ExploX.</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "QuickAccess",
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }),
    props: {
      user: Object,
    },
  }
</script>

<style scoped>

</style>
