<template>
  <div>
    <section>
      <v-parallax :src="require('@/assets/img/bicycle-tour.jpg')" height="450">
        <v-layout column align-center justify-center class="white--text">
          <img src="@/assets/img/logo2.png" alt="ExploX" height="100">
          <h1 class="black--text mb-2 display-1 text-xs-center">ExploX</h1>
          <div class="black--text subheading mb-3 text-xs-center">For Cyclists that want to go further</div>
          <img src="@/assets/img/strava/powered_white.png" alt="Powered by Strava" height="50px">

          <v-btn style="height: 70px;" class="gradient gradient-secondary" dark large round to="/guide">
            Join the Study
          </v-btn>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout column wrap class="my-5" align-center>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">gesture</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Creator</div>
                  </v-card-title>
                  <v-card-text>
                    Easily find new cycling routes. Creator will search through popular cycling routes and <span style="color: #ff6d00">create a
                    totally new route just for you</span>.
                    Personalization will ensure that the routes fit your level of fitness and many other individual
                    factors.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">map</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Activity Map</div>
                  </v-card-title>
                  <v-card-text>
                    Are you an Explorer? Your personal Activity Map will show you where you have already cycled in the
                    past and which areas are still undiscovered.
                    This will help you <span style="color: #ff6d00">identify new and exciting cycling spots</span> and get to know your environment better.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">flag</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Analytics</div>
                  </v-card-title>
                  <v-card-text>
                    Which type of cyclists are you and what are your personal strengths? Our analytics section will help
                    you <span style="color: #ff6d00">identify your strengths and weaknesses</span>.
                    Combined with Creator and Activity Map, this will allow you to achieve your goals, whether you want
                    to beat your best time or discover new areas by bike.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 sm4 class="my-3">
          <h1 class="orange--text mb-3 display-1 text-xs-center">Are You Ready?</h1>
          <div class="subheading mb-3 text-xs-center">Sign up now for free</div>
          <v-btn class="gradient gradient-orange" style="width: 100%; height: 70px; margin-bottom: -20px" dark large round to="/guide">
            Join the Study Now
          </v-btn>
        </v-flex>
      </v-layout>
    </section>
    <section>
      <v-parallax :src="require('@/assets/img/cyclist_right.png')" height="450">
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
                    ExploX is part of a research project that aims to discover patterns in cyclists' routes and activities.
                    The analyzed data can be used in meaningful ways such as the creation of new routes or personalized
                    training optimization.<br><br>
                    By joining ExploX you will contribute to the development of the latest trends in sports technology and
                    help build better tools for athletes.
                  </v-card-text>
                  <v-btn style="width: 100%" color="primary" flat large round to="/about">
                    Learn More
                  </v-btn>
                </v-card>
              </v-flex>
              <v-flex xs0 sm6></v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </v-parallax>
    </section>
  </div>
</template>

<script>
  import Welcome from './Welcome'
  import apiMixin from "../../mixins/apiMixin";
  import Explanation from "./Explanation";
  import {EventBus} from '@/eventBus.js';
  import UnderConstruction from "../includes/UnderConstruction";

  export default {
    name: 'Landing',
    components: {UnderConstruction, Explanation, Welcome,},
    created() {
      EventBus.$emit('collapseDrawer');
      this.performSearch();
    },
    methods: {
      async performSearch() {
        this.GET('', (data, err) => {
        });
      }
    },
    mixins: [apiMixin]
  }
</script>

<style>
</style>
