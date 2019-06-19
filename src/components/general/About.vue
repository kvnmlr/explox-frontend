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
                  ExploX is part of a research effort that aims to discover patterns in cyclists' routes and
                  activities. The analyzed data can be used in meaningful ways such as the creation of new routes or
                  personalized training optimization.
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
                    <p>As smartwatches and fitness trackers become more ubiquitous, athletes enjoy incorporating them
                      into their training. One key benefit that comes with using trackers is that the data can be
                      analyzed and personalized training plans can be developed. One area that is little researched is
                      the
                      generation of new routes based on historic athlete activities and current goals. Planning a new
                      route manually often involves some time and is always connected with some uncertainty whether the
                      route will be suitable for cycling. What cyclists that manually plan their routes often miss out
                      is a number of possible alternative routes
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
                      the study. However, we want to emphasize that in the first phase we will focus on users in
                      Saarland and ExploX
                      will only work there. With this openly accessible website, we want to gain a large number of users
                      in order to
                      collect very diverse data. If you want to join the study, simply go to Login and connect your
                      Strava profile.</p>
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
              <v-layout row wrap align-center>

                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Impressum & Legal Information</div>
                    </v-card-title>
                    <v-card-text>
                      <p>Legal Information
                        Deutsches Forschungszentrum für Künstliche Intelligenz GmbH, DFKI
                        (German Research Center for Artificial Intelligence)<br>
                        <br>
                        E-Mail Contact<br>
                        Frederik Wiehr<br>
                        <br>
                        Postal Address<br>
                        Postfach 20 80<br>
                        D-67608 Kaiserslautern<br>
                        <br>
                        Kaiserslautern Site<br>
                        Trippstadter Strasse 122<br>
                        D-67663 Kaiserslautern<br>
                        Phone: +49 (0)631 / 205 75-0<br>
                        Telefax: +49 (0)631 / 205 75-5030<br>
                        <br>
                        Saarbruecken Site<br>
                        Stuhlsatzenhausweg 3 (Building D3 2)<br>
                        D-66123 Saarbruecken<br>
                        Phone: +49 (0)681 / 857 75-0<br>
                        Telefax: +49 (0)681 / 857 75-5341<br>
                        <br>
                        Bremen Site<br>
                        Robert-Hooke-Strasse 1<br>
                        D-28359 Bremen<br>
                        Phone: +49 (0)421 / 178 45-0<br>
                        Telefax: +49 (0)421 / 178 45-4150<br>
                        <br>
                        DFKI Project Office Berlin<br>
                        Alt-Moabit 91c<br>
                        D-10559 Berlin<br>
                        Phone: +49 (0)30 / 238 95-0<br>
                        Email: info@dfki.de<br>
                        <br>
                        Management Board<br>
                        Prof. Dr. Jana Koehler (Vorsitzende)<br>
                        Dr. Walter Olthoff (CFO)<br>
                        Head of Supervisory Board<br>
                        Prof. Dr. h.c. Hans A. Aukes<br>
                        <br>
                        Register Court: Amtsgericht Kaiserslautern<br>
                        Register Number: HRB 2313<br>
                        ID-Number: DE 148 646 973<br>
                      </p>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
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
  import UnderConstruction from '../includes/UnderConstruction'
  import apiMixin from '../../mixins/apiMixin'

  export default {
    name: 'About',
    components: {UnderConstruction},
    created () {
      this.performSearch()
    },
    methods: {
      async performSearch () {
        this.GET('about', (data, err) => {
        })
      }
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
