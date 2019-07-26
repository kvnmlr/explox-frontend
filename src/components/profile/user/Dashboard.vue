<template>
  <div v-if="user">
    <div v-if="user.activities && user.routes">
      <h1>Dashboard</h1>
      <v-tabs fixed-tabs slot="extension" v-model="currentTab" centered>
        <v-tab :href="`#tab-profile`">
          Profile
        </v-tab>
        <v-tab :href="`#tab-activity-map`" v-on:click="broadcastData">
          Activity Map
        </v-tab>
        <v-tab :href="`#tab-generated-routes`">
          Generated Routes
        </v-tab>
        <v-tab :href="`#tab-routes`">
          Routes
        </v-tab>
        <v-tab :href="`#tab-activities`">
          Activities
        </v-tab>

      </v-tabs>
      <v-tabs-items v-model="currentTab" style="margin-top: -10px;">
        <v-tab-item :id="`tab-profile`">

          <v-layout row wrap>
            <v-flex xs12 sm12 md7>
              <v-container>
                <br>
                <br>
                <v-layout row>
                  <v-flex xs10 sm10 md10>
                    <v-btn v-if="!user.psq || !user.psq.feedback" to="psq" style="height: 60px; width: 80%"
                           color="success" round>Fill out Questionnaire<br>Fragebogen ausfüllen
                    </v-btn>
                    <br><br>
                    <v-layout row flex>

                      <v-flex xs12 sm4>
                        <v-avatar v-if="user.strava" size="96px" tile>
                          <img style="border-radius: 50%;" v-bind:src="this.user.strava.profile">
                        </v-avatar>
                      </v-flex>
                      <v-flex xs12 sm 8>
                        <h2 color="primary">{{ user.firstName.toUpperCase() + ' ' + user.lastName.toUpperCase() }}</h2>
                        <h4>{{ user.username }}</h4>
                        <p v-if="user.strava">
                          <a style="color: #FC4C02;" :href="'https://www.strava.com/athletes/' + user.strava.id">View
                            profile on Strava</a>
                        </p>
                      </v-flex>
                    </v-layout>
                    <p></p>
                    <h4>Email</h4>
                    <p>{{ user.email }}</p>
                    <h4>A member since</h4>
                    <p>{{ formatDate(user.createdAt, true) }}</p>

                    <h4>Routes:</h4>
                    <p>{{ user.routes.length }}</p>
                    <h4>Activities:</h4>
                    <p>{{ user.activities.length }}</p>
                    <!--<router-link :to="'/users/'+this.user._id">View public profile</router-link>-->
                    <br><br>
                  </v-flex>
                  <v-flex xs2 sm2 md2>
                    <v-menu transition="slide-y-transition" bottom left>
                      <v-btn class="gradient gradient-green" light fab relative right slot="activator">
                        <v-icon>more_horiz</v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile v-on:click="() => {this.setUpdateUserFields(); this.editDialog = true;}">
                          <v-list-tile-title>
                            <v-icon>edit</v-icon>
                            Edit
                          </v-list-tile-title>
                        </v-list-tile>
                        <!--<v-list-tile :to="{path: '/users/'+this.user._id}">
                          <v-list-tile-title>
                            <v-icon>public</v-icon>
                            Public Profile
                          </v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile v-on:click="exportDialog = true">
                          <v-list-tile-title>
                            <v-icon>import_export</v-icon>
                            Export/Save
                          </v-list-tile-title>
                          <v-dialog v-model="exportDialog" max-width="290">
                            <v-card>
                              <v-card-title class="headline">Save/Export Route</v-card-title>
                              <v-card-text>
                                <v-form ref="form" lazy-validation>
                                  <v-btn flat round color="primary" v-on:click="exportRoutes">
                                    Download All Routes
                                  </v-btn>
                                  <v-btn flat round color="primary" v-on:click="exportActivities">
                                    Download All Activities
                                  </v-btn>
                                </v-form>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>

                        </v-list-tile>-->
                        <v-list-tile v-on:click="deleteDialog = true">
                          <v-list-tile-title>
                            <v-icon>delete</v-icon>
                            Delete Account
                          </v-list-tile-title>
                          <v-dialog v-model="deleteDialog" max-width="290">
                            <v-card>
                              <v-card-title class="headline">Are You Sure?</v-card-title>
                              <v-card-text>
                                <v-alert :value=true outline type="error" transition="slide-y-transition">
                                  <v-layout row wrap>
                                    <v-flex xs12>
                                      Deleting your account can <b>not</b> be undone.
                                    </v-flex>
                                  </v-layout>
                                </v-alert>
                                <v-form ref="form" lazy-validation>
                                  <v-btn flat round color="primary" round v-on:click="deleteUser">
                                    Yes, Delete It
                                  </v-btn>
                                  <v-btn flat round @click="deleteDialog = false">Keep Using ExploX</v-btn>
                                </v-form>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-flex>
                </v-layout>
                <v-flex xs12>
                  <v-tooltip bottom close-delay="1500">
                    <v-btn slot="activator" :disabled="loadingDialog" :loading="loadingDialog"
                           class="gradient gradient-orange" @click.stop="synchronize"
                           dark round>
                      <v-icon>sync</v-icon>&nbsp;Synchronize Profile
                    </v-btn>
                    <span>This will take your up-to-date <a href="/strava">Strava</a>profile<br>
                      and update your ExploX profileaccordingly.</span>
                  </v-tooltip>

                  <p style="color: #CCCCCC;"><i>We will also update your profile automatically whenever you log in.</i>
                  </p>
                  <loading-dialog :show="loadingDialog" body="This can take up to 1 minute"
                                  header="Please wait while we synchronize your profile."
                                  :width="500" dark>
                  </loading-dialog>
                  <br>
                  <v-divider></v-divider>
                  <br>

                  <v-list subheader two-line>
                    <h3>Study Duties</h3>
                    <v-list-tile style="margin-bottom: 15px;">
                      <v-list-tile-action>
                        <v-checkbox color="success"
                                    v-model="user.questionnaireInfo.eligible && user.questionnaireInfo.participates"
                                    disabled></v-checkbox>
                      </v-list-tile-action>

                      <v-list-tile-content>
                        <v-list-tile-title>Eligibility</v-list-tile-title>

                        <v-list-tile-sub-title>You are allowed to participate in the study based on your cycling
                          behaviour and want to participate.
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile style="margin-bottom: 15px;">
                      <v-list-tile-action>
                        <v-checkbox v-model="user.questionnaireInfo.canUseWebsite" disabled></v-checkbox>
                      </v-list-tile-action>

                      <v-list-tile-content>
                        <v-list-tile-title>Pre-Study Questionnaire</v-list-tile-title>
                        <v-list-tile-sub-title>You completed the questionnaire before the study.<br>
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile style="margin-bottom: 15px;">
                      <v-list-tile-action>
                        <v-checkbox v-model="user.visitedActivityMap" disabled></v-checkbox>
                      </v-list-tile-action>

                      <v-list-tile-content>
                        <v-list-tile-title>Activity Heatmap</v-list-tile-title>

                        <v-list-tile-sub-title>You have seen your personalized Activity Heatmao.<br>

                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-btn v-if="!user.visitedActivityMap"
                             v-on:click="() => {broadcastData(); currentTab = 'tab-activity-map';}" outline round>Go to
                        Heatmap
                      </v-btn>
                    </v-list-tile>

                    <v-list-tile style="margin-bottom: 15px;">
                      <v-list-tile-action>
                        <v-checkbox v-model="this.successfullGenerationsDone() >= 10" disabled></v-checkbox>
                      </v-list-tile-action>

                      <v-list-tile-content>
                        <v-list-tile-title>Route Generations ({{ successfullGenerationsDone() }} / 10)
                        </v-list-tile-title>
                        <v-list-tile-sub-title>You have done at least 10 successful route generations <b>+ comments and
                          ratings</b>.<br>

                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-btn v-if="this.user.creatorResults.length < 10" to="creator" outline round>Generate Route
                      </v-btn>
                    </v-list-tile>

                    {{ }}

                    <v-list-tile>
                      <v-list-tile-action>
                        <v-checkbox v-model="user.psq && user.psq.feedback" disabled></v-checkbox>
                      </v-list-tile-action>

                      <v-list-tile-content>
                        <v-list-tile-title>Post-Study Questionnaires</v-list-tile-title>
                        <v-list-tile-sub-title>You have done the questionnaire after using the for some time. You will
                          be notified vie e-mail when you can do this.<br>

                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-btn v-if="!user.psq || !user.psq.feedback" to="psq" style="height: 60px;" color="success"
                             round>Fill out<br>Questionnaire
                      </v-btn>
                    </v-list-tile>
                  </v-list>
                  <br>
                  <p>Note: The voucher will be automatically sent to your e-mail: <b>{{user.email}}</b></p>
                  <v-btn flat round v-on:click="() => {this.setUpdateUserFields(); this.editDialog = true;}">Change
                    E-Mail
                  </v-btn>

                  <br>
                  <v-divider></v-divider>
                  <br><br>

                  <v-card dark class="gradient-no-switch gradient-secondary elevation-5">
                    <v-card-text>
                      <h3 style="color: white">Invite Friends</h3>
                      <br>
                      <p>
                        Invite your cycling partners and discover new routes together
                        and share your progress with each other!
                      </p>

                      <invite-friend :user="user"></invite-friend>
                    </v-card-text>
                  </v-card>


                </v-flex>
              </v-container>
            </v-flex>
            <v-flex xs12 sm12 md5>
              <v-container>
                <v-flex row>
                  <v-card class="elevation-5 gradient-no-switch gradient-secondary">
                    <v-container>
                      <h3 style="color: white">Latest Route Generations</h3>
                      <br>

                      <div v-if="user.creatorResults.length > 0"
                           v-for="(cr, i) in user.creatorResults.slice().sort((r1, r2) => {return r1.createdAt < r2.createdAt ? 1 :-1;}).slice(0,2)"
                           v-bind:route="cr.generatedRoutes[0]"
                           :key="i">
                        <CreatorResult v-bind:creatorResult="cr" dense></CreatorResult>
                      </div>
                      <p v-else>No Routes Generated</p>
                      <v-btn dark flat round v-on:click="currentTab='tab-generated-routes'">View All</v-btn>
                    </v-container>
                  </v-card>
                </v-flex>
                <v-spacer style="margin: 20px;"></v-spacer>
                <v-flex row>
                  <v-card class="elevation-5">
                    <v-container>
                      <h3>Latest Routes</h3>
                      <br>
                      <route v-if="user.routes.length > 0" v-for="(route, i) in user.routes.slice(0,3)"
                             v-bind:route="route" dense :key="i"></route>
                      <p v-else>No Routes</p>
                      <v-btn flat round v-on:click="currentTab='tab-routes'">View All</v-btn>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-container>

            </v-flex>
          </v-layout>

          <v-dialog v-if="user" v-model="user.firstTimeUsage" persistent max-width="400">
            <v-card>
              <v-card-title class="gradient-no-switch gradient-orange headline white--text">Welcome to ExploX!
              </v-card-title>
              <v-card-text>
                <p>Please keep in mind that this website has some problems. Your routes and activities might not be
                  up-to date
                  right away. Click 'Synchronize Profile'. If still something seems wrong or is not working
                  please:</p>
                <ul>
                  <li>refresh the page</li>
                  <li>check if you are still logged in (the upper right corner of the screen should dislay your Strava
                    profile picture)
                  </li>
                  <li>try again in some minutes, maybe our server is restarting</li>
                  <li>synchronize with your Strava profile by clicking "Synchronize Profile" in your personal profile
                    (Dashboard)
                  </li>
                </ul>
                <br>
                <p>If the problem persists, go to "Send Feedback" or write an E-Mail to exploxcycling@gmail.com and
                  describe the problem.</p>
                <v-layout column align-center justify-center>
                  <p><b>We recommend you start with generating your first routes!</b></p>
                  <v-btn round class="gradient gradient-orange" dark to="creator" v-on:click="update">
                    Generate new Route
                  </v-btn>
                  or
                  <v-btn round class="gradient gradient-green" v-on:click="update">
                    Stay in Dashboard
                  </v-btn>
                </v-layout>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-if="updatedUser" v-model="editDialog" persistent max-width="400">
            <v-card>
              <v-card-title class="headline">Edit Profile</v-card-title>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-text-field v-model="updatedUser.firstName" label="First Name" required></v-text-field>
                  <v-text-field v-model="updatedUser.lastName" label="Last Name" required></v-text-field>
                  <v-text-field v-model="updatedUser.username" label="Username" required></v-text-field>
                  <v-text-field v-model="updatedUser.email" label="E-Mail" required></v-text-field>
                  <p style="color: #CCCCCC;"><i>Note: Your profile picture is taken from your Strava profile.</i></p>
                  <v-btn flat round color="primary" v-on:click.prevent="update">
                    Update
                  </v-btn>
                  <v-btn flat round @click="editDialog = false">Cancel</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn flat style="float:right;" round v-on:click="$emit('logout')">Logout
          </v-btn>

          <v-dialog v-if="generatedActivities" v-model="generatedActivitiesFoundDialog" hide-overlay persistent
                    :width="800">
            <v-card style="padding: 20px;" dark>
              <v-card-text>
                <h2 style="text-align: center">Spurious Activities Found</h2>
                <h4 style="color: white">Please delete the following {{ generatedActivities.length > 1 ?
                  (generatedActivities.length + ' activities') : 'activity' }} from your Strava
                  profile</h4>
                <p style="color: lightgray"><i>Note:</i> Those spurious activities are artifacts from the route creation
                  process
                  and
                  have to be deleted manually from your Strava profile.</p>
                <div class="separator"></div>
                <ul v-for="activity in generatedActivities">
                  <li><a target="_blank" v-bind:href="'https://strava.com/activities/'+activity.id">Activity from {{
                    formatDate(activity.start_date, true) }}</a>
                  </li>
                </ul>
                <div class="separator"></div>
                <img src="@/assets/img/deleteactivity.png" alt="" width="100%">

                <div class="separator"></div>
                <v-btn flat dark round v-on:click="generatedActivitiesFoundDialog = false">Dismiss
                </v-btn>
              </v-card-text>
            </v-card>
          </v-dialog>

        </v-tab-item>
        <v-tab-item :id="`tab-activity-map`">
          <activity-map v-bind:user="user"></activity-map>
        </v-tab-item>
        <v-tab-item :id="`tab-generated-routes`">
          <generated-routes v-bind:user="user"></generated-routes>
        </v-tab-item>
        <v-tab-item :id="`tab-routes`">
          <personal-routes v-bind:user="user"></personal-routes>
        </v-tab-item>
        <v-tab-item :id="`tab-activities`">
          <Activities v-bind:user="user"></Activities>
        </v-tab-item>

      </v-tabs-items>
    </div>
  </div>
</template>

<script>
  import ActivityMap from './ActivityMap'
  import Activities from './Activities'
  import PersonalRoutes from './PersonalRoutes'
  import StravaAlert from '../../includes/StravaAlert'
  import Activity from '../../activities/Activity'
  import SimpleMap from '../../map/LeafletMap'
  import apiMixin from '../../../mixins/apiMixin'
  import Route from '../../routes/Route'
  import LoadingDialog from '../../includes/LoadingDialog'
  import {EventBus} from '@/eventBus.js'
  import InviteFriend from '../../general/InviteFriend'
  import formatDateMixin from '../../../mixins/formatDateMixin'
  import GeneratedRoutes from './GeneratedRoutes'
  import CreatorResult from '../../routes/CreatorResult'

  export default {
    name: 'User',
    components: {
      CreatorResult,
      GeneratedRoutes,
      InviteFriend,
      LoadingDialog, Route, SimpleMap, StravaAlert, PersonalRoutes, Activities, ActivityMap, Activity
    },
    data () {
      return {
        currentTab: 'tab-profile',
        editDialog: false,
        updatedUser: {},
        exportDialog: false,
        deleteDialog: false,
        loadingDialog: false,
        generatedActivitiesFoundDialog: false,
        activities: undefined,
        generatedActivities: undefined,
        psq: false,
      }
    },
    props: {
      user: Object
    },

    created () {
      if (this.user && this.user.firstTimeUsage) {
        EventBus.$emit('expandDrawer')
      }

      EventBus.$on('authenticated', (data) => {
        this.checkAndRedirect(data)
      })
      EventBus.$on('unauthenticated', () => {
        this.checkAndRedirect(null)
      })

      if (this.user) {
        const enabled = new Date('21 July 2019 00:00:01')
        const currentDate = new Date()
        if (enabled <= currentDate) {
          let psqPossible = true
          /* psqPossible &= this.user.questionnaireInfo.eligible && this.user.questionnaireInfo.participates
          psqPossible &= this.user.questionnaireInfo.canUseWebsite
          psqPossible &= this.user.creatorResults.length >= 0
          psqPossible &= this.user.visitedActivityMap */
          this.psq = psqPossible
        }

        this.updatedUser = Object.assign({}, this.user)
        if (this.user.role === 'admin') {
          this.$router.push('/admin/dashboard')
          return
        }
      }
    },

    methods: {
      successfullGenerationsDone () {
        if (!this.user || !this.user.creatorResults) {
          return 0
        }
        let num = this.user.creatorResults.filter((gen) => {
          return gen.routeRatings.length === 2
            && (gen.routeRatings[0].rating !== 0 && gen.routeRatings[1].rating !== 0)
            && (gen.routeRatings[0].comment !== '' && gen.routeRatings[1].comment !== '')
        }).length
        return num
      },

      setUpdateUserFields () {
        this.updatedUser = Object.assign({}, this.user)
      },

      checkAndRedirect (user) {
        //if (!this.user) {
        //  this.user = user;
        this.updatedUser = Object.assign({}, this.user)
        //}
        if (!user) {
          this.$emit('flash', {
            type: 'info',
            text: 'Action requires logged in user, please log in.'
          })
          this.$router.push('login')
          return
        }
        if (user.role === 'admin') {
          this.$router.push('/admin/dashboard')
          return
        }
      },

      broadcastData () {
        if (!this.user.visitedActivityMap) {
          const formData = {
            visitedActivityMap: true,
          }
          this.PUT('users/' + this.user._id, formData, null, (data, err) => {
            if (!err) {
              this.user.visitedActivityMap = true
            }
          })
        }

        setTimeout(() => {
          EventBus.$emit('activitiesReady', this.user.activities)
        }, 200)
      },

      async update () {
        const formData = {
          _csrf: this.csrfToken,
          name: this.updatedUser.name,
          username: this.updatedUser.username,
          email: this.updatedUser.email,
          firstTimeUsage: false,
        }

        this.PUT('users/' + this.user._id, formData, null, (data, err) => {
          if (!err) {
            // EventBus.$emit('reloadData')
          }
          this.user.name = this.updatedUser.name
          this.user.username = this.updatedUser.username
          this.user.email = this.updatedUser.email
          this.editDialog = false
          this.user.firstTimeUsage = false
        })
      },

      async synchronize () {
        this.loadingDialog = true
        this.GET('users/' + this.user._id + '/update', (data, err) => {
          if (!err) {
            EventBus.$emit('reloadData')
          }
          this.loadingDialog = false
          if (data.generatedActivities.length) {
            this.generatedActivities = data.generatedActivities
            this.generatedActivitiesFoundDialog = true
          }
        })
      },

      async deleteUser () {
        this.DELETE('users/' + this.user._id, (data, err) => {
          if (!err) {
            this.$router.push('/')
            this.$emit('logout')
          }
          this.deleteDialog = false
        })
      },

      async exportRoutes () {
      },

      async exportActivities () {
      },
    },
    mixins: [apiMixin, formatDateMixin]
  }
</script>

<style scoped>
</style>
