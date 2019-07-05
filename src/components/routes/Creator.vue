<template>
  <div>
    <div v-if="deadlinePassed || creatorUnavailable || !canUseCreator">
      <h1>Route Creation</h1>
      <br>
      <v-alert v-if="deadlinePassed" :value="true" color="accent" icon="info" outline>
        <h2>Deadline passed :(</h2>
        <p>The deadline for using the route creation feature in the study has passed.
          <b>Please go to your Dashboard, scroll down to your <span style="color: #ee5b19">Study Duties</span> and see
            if you can take the <span style="color: #ee5b19">Post-Study Questionnaire</span>.</b></p>
        <v-btn class="gradient gradient-orange" style="width: 200px;" dark round to="dashboard">Go to Dashboard
        </v-btn>
      </v-alert>
      <v-alert v-else-if="creatorUnavailable" :value="true" color="accent" icon="info" outline>
        <h2>The Route Creation is currently not available :(</h2>
        <p>Please come back later.</p>
      </v-alert>
      <v-alert v-else-if="!canUseCreator" :value="true" color="accent" icon="info" outline>
        <h2>Daily route creation limit reached</h2>
        <p>You have reached to limit of 20 route creations per day. Please come back tomorrow to generate more
          routes.</p>
      </v-alert>
    </div>
    <section v-else>
      <h1 v-if="step === '1'">Step 1: Select Start Point</h1>
      <h1 v-if="step === '2'">Step 2: Select End Point</h1>
      <h1 v-if="step === '3'">Step 3: Choose Route Parameters</h1>
      <h1 v-if="step === '4'">Inspect and Rate the result routes</h1>

      <br>
      <div style="width: 70%">
        <simple-map :current-select-start="step === '1'"
                    :select-enabled="step === '1' || step === '2'"
                    show-activity-map
                    show-mouse-selection
                    show-route
                    open-panel
                    v-on:startSelected="onStartSelected"
                    v-on:endSelected="onEndSelected"

        ></simple-map>
      </div>
      <v-navigation-drawer v-if="$vuetify.breakpoint.smAndUp && !results && drawer"
                           :mini-variant="mini"
                           absolute right fixed
                           class="elevation-10"
                           permanent style="background-color: white; width: 30%">

        <v-list>
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action v-if="mini">
              <v-icon>chevron_left</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title><h2>Route Creator</h2></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn v-if="!mini" icon @click.stop="mini = !mini">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <div v-if="!mini">
          <v-stepper v-model="step" class="elevation-0" vertical non-linear style="background-color: white">
            <v-stepper-step :complete="step > 1" step="1" editable>
              <h3>Select Start Point</h3>
            </v-stepper-step>
            <v-stepper-content step="1">
              <p>Click on the map to select a start point
                &nbsp;<v-icon v-show="startSelectedDone">check</v-icon>
              </p>
              <p v-if="startSelectedDone" style="color: darkgray;">
                Lat: {{ selectedStartPosition.lat.toFixed(3) }}<br>
                Lng: {{ selectedStartPosition.lng.toFixed(3) }}</p>
              <v-btn dark round v-if="startSelectedDone" class="gradient gradient-orange" @click="startSelected">
                Continue
              </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 2" step="2" :editable="selectedStartPosition !== null">
              <h3>Select End Point</h3>
            </v-stepper-step>
            <v-stepper-content step="2">
              <p>If the end point should be different from the start point click on the map to
                select an end point
                &nbsp;<v-icon>check</v-icon>
              </p>
              <p v-if="endSelectedDone" style="color: darkgray;">
                Lat: {{ selectedEndPosition.lat.toFixed(3) }}<br>
                Lng: {{ selectedEndPosition.lng.toFixed(3) }}</p>
              <p v-else-if="startSelectedDone" style="color: darkgray;">
                Lat: {{ selectedStartPosition.lat.toFixed(3) + ' (same as start)' }}<br>
                Lng: {{ selectedStartPosition.lng.toFixed(3) + ' (same as start)'}}</p>
              <v-btn dark round class="gradient gradient-orange" @click="endSelected">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 3" step="3"
                            :editable="selectedStartPosition !== null && selectedEndPosition !== null">
              <h3>Choose Route Properties</h3>
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-text-field label="Preferred Distance (10 - 100)" min="10" max="100" v-model="distance"
                            :value="distance" suffix="kilometers" type="number"
                            clearable></v-text-field>
              <p style="color: darkgray; font-size: 9pt">
                Choose Road Type
              </p>
              <v-select style="z-index:1001" v-model="selectedTag" :items="tagsLabels"></v-select>
              <v-btn dark round class="gradient gradient-orange" @click="submit">Create Routes</v-btn>
            </v-stepper-content>
          </v-stepper>

        </div>
      </v-navigation-drawer>

      <v-navigation-drawer v-if="$vuetify.breakpoint.smAndUp && results && drawer"
                           :mini-variant="mini"
                           permanent
                           absolute right fixed
                           :width="500"
                           permanent style="background-color: #F5F5F5">

        <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action v-if="mini">
              <v-icon>chevron_left</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile avatar tag="div">
            <v-list-tile-content>
              <v-list-tile-title><h3>Results</h3></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn v-if="!mini" icon @click.stop="mini = !mini">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <div v-if="!mini">
          <v-container>
            <p>Please inspect and rate the following result routes:</p>
            <div v-if="!mini">
              <v-expansion-panel popout light :value="selectedRoute">
                <v-expansion-panel-content v-for="(routeRating, i) in routeRatings" :key="i" class="elevation-2">
                  <div slot="header">{{ (generatedRoutes[i].distance / 1000).toFixed(1) }} km Route
                  </div>
                  <v-card light>
                    <v-card-text>
                      <p><b>Distance: </b> {{ (generatedRoutes[i].distance / 1000).toFixed(3) }} km</p>
                      <p><b>Already Discovered: </b> {{ familiarityScores[i].toFixed(1)*100 }} %</p>
                      <div v-if="generatedRoutes[i].parts.length > 0"><span><b>Parts:</b></span>
                        <span v-for="(part, j) in generatedRoutes[i].parts">
                          <router-link target="_blank" tag="a" :to="'route/' + part._id"><a target="_blank">{{part.title}}</a></router-link><span
                          v-if="j < generatedRoutes[i].parts.length - 1">, </span>
                        </span>
                      </div>
                      <div v-else><span><b>Parts:</b></span>
                        Your own activities
                      </div>
                      <v-btn dark round class="gradient gradient-orange" v-on:click="routeSelected(i)">Show on Map
                      </v-btn>
                      <br><br>
                      <section v-if="!ratingSubmitted[i]">
                        <p class="subheading">Would you ride the route soon?</p>
                        <v-btn-toggle v-model="routeRating.rating">
                          <v-btn flat value="1">
                            Yes
                          </v-btn>
                          <v-btn flat value="2">
                            Rather yes
                          </v-btn>
                          <v-btn flat value="3">
                            Rather not
                          </v-btn>
                          <v-btn flat value="4">
                            No
                          </v-btn>
                        </v-btn-toggle>
                        <br><br>
                        <p class="subheading">Comment on the route. Why do you like it? Why not?</p>
                        <v-layout row wrap>
                          <v-flex>
                            <v-textarea label="Please elaborate" v-model="routeRating.comment"></v-textarea>
                          </v-flex>
                        </v-layout>

                        <v-btn dark round class="gradient gradient-successs"
                               v-on:click="saveRating(i)">Submit Rating
                        </v-btn>
                      </section>
                      <p style="color: #0ab45a" v-else>Your rating has been submitted!</p>
                      <div v-if="ratingSubmitted[0] && ratingSubmitted[1]">

                        <h2>Route generation and rating complete!</h2>
                        <p>You can <b>upload the routes to Strava</b> from your Dashboard</p>
                        <v-btn round class="gradient gradient-green"
                               to="dashboard">Go to Dashboard
                        </v-btn>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <br><br>
              <!--<v-btn class="gradient gradient-orange" style="width: 100%;"
                     @click.stop="() => {results = false; step = '1'; canUseCreator();}" dark round>
                <v-icon>sync</v-icon>&nbsp;
                New Search
              </v-btn>-->
              <v-btn class="gradient gradient-orange" style="width: 100%;"
                     @click="() => {this.$router.go()}" dark round>
                <v-icon>sync</v-icon>&nbsp;
                New Search
              </v-btn>
            </div>
          </v-container>
        </div>
      </v-navigation-drawer>

      <v-dialog v-model="saveRouteDialog" persistent max-width="600">
        <v-card>
          <v-card-title class="headline">Save Route</v-card-title>
          <v-card-text>
            <p>You will be redirected to Strava. Please switch to route type 'Ride' and click 'Save'. Delete any
              activities starting with '[ExploX]' from your profile.</p>
            <p style="color: #CCCCCC;"><i>Note: You can later see the route in your Dashboard after synchronizing.</i>
            </p>
            <v-btn flat round color="primary" v-on:click="saveRoute">
              Save New Route
            </v-btn>
            <v-btn flat round @click="saveRouteDialog = false">Cancel</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <loading-dialog :show="loadingDialog" body="This will take less than one minute."
                      header="Creating new routes for you."
                      :width="500" dark>
      </loading-dialog>
      <loading-dialog :show="stravaImportDialog" body="Please save the route as 'Ride' on Strava."
                      header="You will be redirected in some seconds."
                      :width="500">
      </loading-dialog>
    </section>
    <v-dialog v-model="errorDialog" max-width="400">
      <v-card class="gradient-no-switch gradient-green">
        <v-card-title class="gradient-no-switch gradient-orange headline white--text">
          <v-icon>error</v-icon>
          &nbsp;Could not find routes
        </v-card-title>
        <v-card-text>
          Please try again using different parameters. Route creation only works in and around Saarland.
        </v-card-text>
        <v-card-actions>
          <v-layout column align-center justify-center>
            <v-btn round @click="errorDialog = false">Close</v-btn>
            <br>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import UnderConstruction from '../includes/UnderConstruction'
  import apiMixin from '../../mixins/apiMixin'
  import SimpleMap from '../map/LeafletMap'
  import {EventBus} from '@/eventBus.js'
  import LoadingDialog from '../includes/LoadingDialog'

  export default {
    name: 'Creator',
    components: {LoadingDialog, SimpleMap, UnderConstruction},
    data () {
      return {
        drawer: false,
        results: false,
        step: '1',
        mini: false,
        loadingDialog: false,
        errorDialog: false,
        rating: 0,

        // DISTANCE
        distance: '20',

        // PREFERENCE
        preferencesLabels: [
          'Ride Exact Distance',
          'Discover New Areas'
        ],
        preferencesIDs: [
          'distance',
          'discover'
        ],
        selectedPreference: 0,

        // TAGS
        tagsLabels: ['Road', 'Mixed/Gravel', 'Trail'],
        selectedTag: 'Road',

        startSelectedDone: false,
        endSelectedDone: false,
        selectedStartPosition: null,
        selectedEndPosition: null,

        id: '',
        generatedRoutes: [],
        routeRatings: [],
        ratingSubmitted: [false, false, false],
        familiarityScores: [],
        selectedRoute: -1,
        saveRouteDialog: false,
        stravaImportDialog: false,

        savedRouteId: '',
        savedRouteTitle: '',
        savedRouteDescription: '',
        savedRouteTags: [],

        deadlinePassed: false,
        creatorUnavailable: false,
        foo: 0

      }
    },
    props: {
      user: Object
    },

    computed: {
      canUseCreator: function () {
        let numCreatedToday = 0
        if (this.user) {
          if (this.user.creatorResults) {
            const now = new Date()
            let todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 1)  // 00:00:01
            this.user.creatorResults.forEach((cr) => {
              const d = new Date(cr.createdAt)
              if (todayMidnight < d) {
                // was created today
                numCreatedToday++
              }
            })
          }
        }
        return numCreatedToday < 21
      },
    },
    mounted () {
      const deadline = new Date('28 July 2019 23:59:59')
      const currentDate = new Date()
      if (currentDate > deadline) {
        this.deadlinePassed = true
      }

      this.currentSelectStart = true
      setTimeout(() => {
        EventBus.$emit('collapseDrawer')
      }, 200)
      setTimeout(() => {
        this.drawer = true
      }, 700)
      if (this.user) {
        if (this.user.activities) {
          EventBus.$emit('activitiesReady', this.user.activities)
        }
      }
    },
    methods: {
      increment () {
        this.foo = parseInt(this.foo, 10) + 1
      },
      decrement () {
        this.foo = parseInt(this.foo, 10) - 1
      },
      async performSearch () {
        this.GET('creator', (data, err) => {
          if (err) {
            if (!this.user || this.user === null) {
              // Creator only accessible by logged in user
              this.$router.push('/login')
              this.$emit('flash', err.flash)
              return
            }
            // Creator is not available
            this.$router.push('/hub')
          } else {
          }
        })
      },
      startSelected () {
        this.step = '2'
      },
      endSelected () {
        this.step = '3'
      },
      onStartSelected (data) {
        this.startSelectedDone = true
        this.selectedStartPosition = data
        if (!this.endSelectedDone) {
          this.selectedEndPosition = data
        }
      },
      onEndSelected (data) {
        this.endSelectedDone = true
        this.selectedEndPosition = data
      },
      submit () {
        this.step = '4'

        this.loadingDialog = true

        const start = this.selectedStartPosition
        const end = this.selectedEndPosition
        const distance = this.distance.replace(',', '.')
        const preference = this.preferencesIDs[this.selectedPreference]
        const tags = this.selectedTag

        const formData = {
          start: start,
          end: end,
          distance: distance,
          preference: preference,
          tags: tags,
        }

        this.POST('routes/generate', formData, null, (data, err) => {
          if (!this.user) {
            this.$router.push('login')
          }
          console.log(data)
          if (!err && data && !data.err && data.generatedRoutes.length > 0) {
            this.generatedRoutes = data.generatedRoutes
            this.familiarityScores = data.familiarityScores
            this.routeRatings = data.routeRatings
            this.results = true
            this.id = data._id
            this.routeSelected(0)

            /* if (0.5 - Math.random()) {
              console.log(this.familiarityScores);
              this.generatedRoutes.reverse();
              this.familiarityScores.reverse();
              this.routeRatings.reverse();
              console.log(this.familiarityScores);
            } */

          } else {
            this.step = '1'
            this.errorDialog = true
          }

          setTimeout(() => {
            this.loadingDialog = false
          }, 200)

        })
      },
      routeSelected (index) {
        this.selectedRoute = index
        EventBus.$emit('routeReady', this.generatedRoutes[this.selectedRoute])
      },

      saveRating (index) {
        const formData = {
          _csrf: this.csrfToken,
          routeRatings: this.routeRatings,
          acceptedRoutes: this.acceptedRoutes,
          id: this.id
        }
        const requestParams = {
          method: 'POST',
          responseType: 'text',
        }

        this.POST('updateCreatorResult', formData, requestParams, (data, err) => {
          if (err === null) {
            this.$set(this.ratingSubmitted, index, true)
            console.log(this.ratingSubmitted)
            if (!(this.ratingSubmitted[0] && this.ratingSubmitted[1])) {
              setTimeout(() => {
                this.routeSelected((index + 1) % 2)
              }, 500)
            }
          }
        })
      },

      openSaveRouteDialog (index) {
        this.saveRating()

        this.savedRouteId = this.generatedRoutes[index]._id
        this.savedRouteTitle = this.generatedRoutes[index].title
        this.savedRouteDescription = this.generatedRoutes[index].body
        this.saveRouteDialog = true
      },

      saveRoute () {
        const formData = {
          _csrf: this.csrfToken,
          title: this.savedRouteTitle,
          body: this.savedRouteDescription,
          tags: JSON.stringify(this.savedRouteTags),
          rating: this.rating,
        }
        const requestParams = {
          method: 'PUT',
          responseType: 'text',
        }

        this.PUT('routes/' + this.savedRouteId, formData, requestParams, (data, err) => {
          console.log(data)
          if (!err) {
            this.saveRouteDialog = false
            this.stravaImportDialog = true

            this.GET('stravaimport?id=' + this.savedRouteId + '&title=' + this.savedRouteTitle + '&description=' + this.savedRouteDescription, (data, err) => {
              if (!err) {
                let redirect = ''
                if (data.isActivity) {
                  redirect = 'https://www.strava.com/activities/' + data.activityId + '/route'
                } else {
                  redirect = 'https://www.strava.com/routes/' + data.activityId
                }
                console.log('Redirecting to ' + redirect)
                setTimeout(() => {
                  this.stravaImportDialog = false
                  window.location.href = redirect
                }, 5000)
              }
            })
          }
        })
      }
    },
    beforeMount () {
      this.performSearch()
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
