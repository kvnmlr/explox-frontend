<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md6>
          <v-card hover color="primary" dark to="/dashboard">
            <v-card-title primary class="title">Dashboard</v-card-title>
            <v-card-text>See your personal profile and statistics.</v-card-text>
          </v-card>
        </v-flex>
      <v-flex d-flex xs12 sm6 md6>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card hover color="dark" dark to="/creator">
              <v-card-title primary class="title">Creator</v-card-title>
              <v-card-text>Creator is the place to discover new routes.</v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex v-for="n in 1" :key="n" d-flex xs12>
                <v-card hover color="dark" dark to="/analytics">
                  <v-card-title primary class="title">Analytics</v-card-title>
                  <v-card-text>Run our analysis tools on your activity data to track your progress.</v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm4 md4 child-flex>
        <v-card hover color="dark" dark to="/explore">
          <v-card-title primary class="title">Route Finder</v-card-title>
          <v-card-text>Search for existing routes that other athletes like.</v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm8 md8>
        <v-card hover color="primary" dark to="/guide">
          <v-card-title primary class="title">Get Started</v-card-title>
          <v-card-text>A quick start guide for new members.</v-card-text>
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
    })
  }
</script>

<style scoped>

</style>
