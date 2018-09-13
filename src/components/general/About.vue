<template>
  <div>
    <v-parallax :src="require('@/assets/img/cyclist_right.png')" height="350">
      <v-layout column align-center justify-center class="white--text">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5" align-center>
            <v-flex xs0 sm2></v-flex>
            <v-flex xs12 sm4>
              <v-card dark class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">About ExploX</div>
                </v-card-title>
                <v-card-text>
                  ExploX is part of a research project that aims to discover patterns in cyclists' routes and
                  activities.
                  The analyzed data can be used in meaningful ways such as the creation of new routes or personalized
                  training optimization.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs0 sm6></v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-parallax>
    <section>
      <v-layout column wrap class="my-5" align-center>
        <v-flex xs12>
          <v-container grid-list-xl>
            <section>

            </section>
            <v-layout row wrap align-center>
              <v-flex xs12 md6>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">flag</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Motivation & Goal</div>
                  </v-card-title>
                  <v-card-text>
                    <p>As smartwatches and fitness trackers become more user friendly, athletes enjoy incorporating them
                      into their training. One key benefit that comes when using trackers is that the data can be
                      analyzed and personalized training methods developed. One area that is little researched is the
                      generation of new routes based on historic athlete activities and current goals. Planning a new
                      route manually often involves some time and is always connected with some uncertainty whether the
                      route will be suitable for cycling. What they miss out is a number of possible alternative routes
                      in areas where they are not so familiar as well as new elevation profiles that will challenge
                      them.</p>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md6>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">group</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Field Study</div>
                  </v-card-title>
                  <v-card-text>
                    <p>In order to gain new insights about cyclists behaviour and cycling patterns, especially with
                      respect to the type of routes they cycle, we will run a field study.
                      Anybdy who goes for regular bike rides and uses Strava to track those is welcome to participate in
                      the study. However, we want to emphasize that we will focus on users in Saarland and ExploX
                      will only work there. With this open system, we want to gain a large number of users in order to
                      collect very diverse data.
                      Also, with a smaller number of people who are particularly active, we want to perform a more
                      controlled type of analysis in order to analyze their cycling patterns.</p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <br>
            <v-layout row wrap align-center>
              <v-flex xs12 md6>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">list</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Roadmap</div>
                  </v-card-title>
                  <v-card-text>
                    <p>What you are seeing is not the final product. The ExploX website and algorithms are developed and
                      performed while cyclists are using it. Here are our plans for the near future:
                      <br><br>
                    <ul>
                      <li>Better possibilities to search for existing routes.</li>
                      <li>Considerable improvements in the route generation algorithm.</li>
                      <li>More in-depth processing of activity data and displaying it to users on the
                        <router-link to="analytics">Analytics</router-link>
                        page.
                      </li>
                      <li>Advanced visualizations on the Activity Map.</li>
                    </ul>
                    </p>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md6>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">map</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Contact</div>
                  </v-card-title>
                  <v-card-text>
                    <p>Please use the
                      <router-link to="feedback">contact form</router-link>
                      to contact us. Make sure to leave your e-mail address so we can reply to your request.
                      We are always happy to receive your feedback!<br><br><br><br><br><br><br>
                    </p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <!--<v-parallax :src="require('@/assets/img/adventure-bikers-bikes.jpg')" height="350">
              <v-layout column align-center justify-center class="white--text">
                <v-container grid-list-xl>
                  <v-layout row wrap justify-center class="my-5" align-center>
                    <v-flex xs0 sm4></v-flex>
                    <v-flex xs12 sm4>
                      <v-card dark class="elevation-0 transparent">
                        <v-card-title primary-title class="layout justify-center">
                          <div class="headline">
                            <v-btn class="gradient gradient-orange" dark large round to="/guide">
                            Get Started
                          </v-btn>
                          </div>
                        </v-card-title>
                        <v-card-text>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs0 sm4></v-flex>
                  </v-layout>
                </v-container>
              </v-layout>
            </v-parallax>-->
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>

</template>

<script>
  import UnderConstruction from "../includes/UnderConstruction";
  import apiMixin from "../../mixins/apiMixin";

  export default {
    name: 'About',
    components: {UnderConstruction},
    created() {
      this.performSearch();
    },
    methods: {
      async performSearch() {
        this.GET('about', (data, err) => {
        });
      }
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
