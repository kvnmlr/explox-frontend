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
    <div class="separator"></div>
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
                    <div class="headline text-xs-center">Route Creator</div>
                  </v-card-title>
                  <v-card-text>
                    Easily find new cycling routes. Creator will search through popular cycling routes and <span
                    style="color: #ff6d00">create a
                    totally new route</span>. Based on your past activities, the new routes will be personalized just
                    for you!
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
                    Are you an Explorer? Your personal <span style="color: #ff6d00">Activity Map will show you where you have already cycled</span>
                    in the
                    past and which areas are still undiscovered.
                    This will help you identify new and exciting cycling spots and get to know your environment better.
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
                    Which type of cyclists are you and what are your personal strengths? The analytics page will help
                    you <span style="color: #ff6d00">identify your strengths and weaknesses</span>.
                    Combined with the Route Creator and Activity Map, this will allow you to achieve your goals faster!
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <v-container>
      <v-layout row wrap align-center>
        <v-flex d-flex xs12 md6 offset-sm3>
          <v-card class="elevation-10" v-if="!user || !user.questionnaireInfo">
            <v-card-title primary-title>
              <h3 class="headline mb-0">The user study</h3>
              <div>
                <p>You are invited to use ExploX for the next weeks and thereby contribute to our research on cycling
                  behaviour. By answering two short questionnaires and using the route creation feature of this website
                  for the next weeks, you will participate in the study. This will not require much time (at least 1-2
                  hours) and it can be done any time during the usage phase (4 weeks)</p>
                <h2>Time and dates for the study</h2>
                <p><b>Registration phase:</b> <span style="color: #ee5b19">17. June - 01. July 2019</span> (2 Weeks)</p>
                <p><b>Usage phase:</b> <span style="color: #ee5b19">17. June - 15. July 2019</span> (4 Weeks)</p>
                <p><b>User Experience Questionnaire und interviews after the study:</b> <span style="color: #ee5b19">01. July - 22. July 2019</span>
                  (3 Weeks), earliest time is after extensive use of the website and fulfillment of all study duties</p>
                <h2>Reward</h2>
                <p>We will reward your participation in the study with the chance to win <b style="color:#ee5b19;">one
                  of
                  6 x 25€ Amazon
                  Vouchers</b>. If you win, you will receive at the end of the study.</p>
                <p><b style="color: #ee5b19">Additionally:</b> The first 5 participants to fulfill the above criteria
                  and
                  actually cycle at least 2 of the generated routes, track and save them as Strava activities and give
                  us detailed information about the routes will receive a <b style="color:#ee5b19;">30€ Bike Gear
                    Voucher</b>!
                </p>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn to="guide" flat color="orange">Join the Study</v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="elevation-10"
                  v-else-if="user && user.questionnaireInfo && !user.questionnaireInfo.participates">
            <v-card-title primary-title>
              <h3 class="headline mb-0">The user study</h3>
            </v-card-title>
            <v-card-text>
              <div>
                <h4>
                  <v-icon>warning</v-icon>
                  &nbsp;You are already signed up but decided to not participate in the study!
                </h4>
                <br>
                <p>If you changed your mind,
                  go to your
                  <router-link to="dashboard">Dashboard</router-link>
                  , click on the three dots, delete your account and
                  sign up new.
                </p>
                <br>
              </div>
            </v-card-text>
          </v-card>
          <v-card class="elevation-10"
                  v-else-if="!user || !user.questionnaireInfo || user.questionnaireInfo.participates">
            <v-card-title primary-title>
              <h3 class="headline mb-0">The user study</h3>
            </v-card-title>
            <v-card-text>
              <div>
                <h4>
                  <v-icon>check</v-icon>
                  &nbsp;You are already signed up for the study, great!
                </h4>
                <br>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout column wrap class="my-5" align-center>
      <v-flex xs12 sm4 class="my-3">
        <h1 class="orange--text mb-3 display-1 text-xs-center">Are You Ready?</h1>
        <div class="subheading mb-3 text-xs-center">Sign up now for free</div>
        <v-btn class="gradient gradient-orange" style="width: 100%; height: 70px; margin-bottom: -20px" dark large
               round to="/guide">
          Join the Study Now
        </v-btn>
      </v-flex>
    </v-layout>

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
                    ExploX is part of a research project that aims to discover patterns in cyclists' routes and
                    activities.
                    The analyzed data can be used in meaningful ways such as the creation of new routes or personalized
                    training optimization.<br><br>
                    By joining ExploX you will contribute to the development of the latest trends in sports technology
                    and
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
  import apiMixin from '../../mixins/apiMixin'
  import Explanation from './Explanation'
  import {EventBus} from '@/eventBus.js'
  import UnderConstruction from '../includes/UnderConstruction'
  import StudyInfo from '../profile/StudyInfo'

  export default {
    name: 'Landing',
    components: {StudyInfo, UnderConstruction, Explanation, Welcome,},
    created () {
      EventBus.$emit('collapseDrawer')
      this.performSearch()
    },
    methods: {
      async performSearch () {
        this.GET('', (data, err) => {
        })
      }
    },
    props: {
      user: Object,
    },
    mixins: [apiMixin]
  }
</script>

<style>
</style>
