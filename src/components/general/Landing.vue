<template>
  <div>
    <welcome></welcome>
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
            <v-card-actions>
              <v-btn class="gradient gradient-orange" dark round>Find Out More</v-btn>
              <v-btn class="gradient gradient-orange" dark round>See Routes</v-btn>
            </v-card-actions>
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
            <v-card-actions>
              <v-btn class="gradient gradient-orange" dark round>Find Out More</v-btn>
              <v-btn class="gradient gradient-orange" dark round>See Yours</v-btn>
            </v-card-actions>
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
            <v-card-actions>
              <v-btn class="gradient gradient-orange" dark round>Find Out More</v-btn>
              <v-btn class="gradient gradient-orange" dark round>See Yours</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <explanation></explanation>
  </div>
</template>

<script>
  import Welcome from './Welcome'
  import apiMixin from "../../mixins/apiMixin";
  import Explanation from "./Explanation";

  export default {
    name: 'Landing',
    components: {Explanation, Welcome,},
    created() {
      this.requestData();
    },
    methods: {
      async requestData() {
        this.GET('', (data, err) => {
          // TODO
        });
      }
    },
    mixins: [apiMixin]
  }
</script>

<style>
</style>
