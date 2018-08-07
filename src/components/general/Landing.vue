<template>
  <div>
    <h1>Welcome Athletes!</h1>

    <p>Tired of running or cycling the same old routes over and over again? Explox takes your and other
      atheltes' activity history and creates new and unique routes for you. All you need is an account on Strava.</p>

    <v-btn outline="orange darken-1">Log In</v-btn>
    &nbsp;
    <v-btn color="orange darken-1">Sign Up</v-btn>
    <div class="separator"></div>

    <v-container align baseline grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex sm4 xs12>
          <v-card class="shadow">
            <v-card-media class="white--text" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">Strava Routes</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title>
              <p>Find out which routes other athletes take, try them out and give feedback.</p>
            </v-card-title>
            <card-actions>
              <v-btn color="orange darken-1">Find Out More</v-btn>
              <v-btn color="orange darken-1">See Routes</v-btn>
            </card-actions>
          </v-card>
        </v-flex>
        <v-flex sm4 xs12>
          <v-card class="shadow">
            <v-card-media class="white--text" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">Activity Map</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title>
              <p>Mix up your routine by finding areas that you have not visited yet.</p>
            </v-card-title>
            <card-actions>
              <v-btn color="orange darken-1">Find Out More</v-btn>
              <v-btn color="orange darken-1">See Yours</v-btn>
            </card-actions>
          </v-card>
        </v-flex>
        <v-flex sm4 xs12>
          <v-card class="shadow">
            <v-card-media class="white--text" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">Route Generation</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title>
              <p>Get personalized route recommendations and explore your area.</p>
            </v-card-title>
            <card-actions>
              <v-btn color="orange darken-1">Find Out More</v-btn>
              <v-btn color="orange darken-1">See Yours</v-btn>
            </card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Landing'
  }
</script>

<style>
</style>
