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
        <v-tab :href="`#tab-activities`">
          Activities
        </v-tab>
        <v-tab :href="`#tab-routes`">
          Routes
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
                    <v-layout row flex>
                      <v-flex xs12 sm4>
                        <v-avatar v-if="user.strava" size="64px" tile>
                          <img style="border-radius: 50%;" v-bind:src="this.user.strava.profile">
                        </v-avatar>
                      </v-flex>
                      <v-flex xs12 sm 8>
                        <h2 color="primary">{{ user.firstName.toUpperCase() + ' ' + user.lastName.toUpperCase() }}</h2>
                        <h4>{{ user.username }}</h4>
                      </v-flex>
                    </v-layout>
                    <p></p>
                    <h4>Email</h4>
                    <p>{{ user.email }}</p>
                    <h4>A member since</h4>
                    <p>{{ user.createdAt }}</p>

                    <h4>Routes:</h4>
                    <p>{{ user.routes.length }}</p>
                    <h4>Activities:</h4>
                    <p>{{ user.activities.length }}</p>
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
                        <v-list-tile :to="{path: '/users/'+this.user._id}">
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

                        </v-list-tile>
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
                  <h3>Synchronize Profile</h3>
                  <br>
                  <div v-if="$vuetify.breakpoint.lgAndUp">
                    <p>
                      This will take your up-to-date <a href="/strava">Strava</a>
                      profile and update your ExploX profile
                      accordingly:</p>
                    <ul>
                      <li>New save routes will be added to ExploX</li>
                      <li>Your latest activities will show up in your activity map</li>
                      <li>Your profile data and statistics will be updated</li>
                    </ul>
                  </div>
                  <br>
                  <v-btn :disabled="loadingDialog" :loading="loadingDialog"
                         class="gradient gradient-orange" style="width: 100%;" @click.stop="synchronize"
                         dark round>
                    <v-icon>sync</v-icon>&nbsp;Synchronize Now
                  </v-btn>
                  <p style="color: #CCCCCC;"><i>We will also update your profile automatically once every day.</i></p>
                  <loading-dialog :show="loadingDialog" body="This can take up to 1 minute"
                                  header="Please wait while we synchronize your profile."
                                  :width="500" dark>
                  </loading-dialog>
                  <br>
                  <v-divider></v-divider>
                  <br>
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
                  <v-card  class="elevation-5">
                    <v-container>
                      <h3>Latest Activity</h3>
                      <br>
                      <activity v-if="user.activities.length > 0"
                                v-for="(activity, i) in user.activities.slice(0,3)" v-bind:activity="activity" dense
                                :key="i"></activity>
                      <p v-else>No Activity</p>
                      <v-btn flat round v-on:click="currentTab='tab-activities'">View All</v-btn>
                    </v-container>

                  </v-card>
                </v-flex>
                <v-spacer style="margin: 20px;"></v-spacer>
                <v-flex row>
                  <v-card  class="elevation-5">
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

          <v-dialog v-if="updatedUser" v-model="editDialog" persistent max-width="400">
            <v-card>
              <v-card-title class="headline">Edit Profile</v-card-title>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-text-field v-model="updatedUser.name" label="Name" required></v-text-field>
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
          <v-btn class="gradient gradient-secondary" style="float:right;" dark round v-on:click="$emit('logout')">Logout
          </v-btn>

        </v-tab-item>
        <v-tab-item :id="`tab-activity-map`">
          <activity-map v-bind:user="user"></activity-map>
        </v-tab-item>
        <v-tab-item :id="`tab-activities`">
          <Activities v-bind:user="user"></Activities>
        </v-tab-item>
        <v-tab-item :id="`tab-routes`">
          <personal-routes v-bind:user="user"></personal-routes>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
  import ActivityMap from "./ActivityMap";
  import Activities from "./Activities";
  import PersonalRoutes from "./PersonalRoutes";
  import StravaAlert from "../../includes/StravaAlert";
  import Activity from "../../activities/Activity";
  import SimpleMap from "../../map/LeafletMap"
  import apiMixin from "../../../mixins/apiMixin";
  import Route from "../../routes/Route";
  import LoadingDialog from "../../includes/LoadingDialog";
  import {EventBus} from '@/eventBus.js';
  import InviteFriend from "../../general/InviteFriend";

  export default {
    name: "User",
    components: {
      InviteFriend,
      LoadingDialog, Route, SimpleMap, StravaAlert, PersonalRoutes, Activities, ActivityMap, Activity},
    data() {
      return {
        currentTab: 'tab-profile',
        editDialog: false,
        updatedUser: {},
        exportDialog: false,
        deleteDialog: false,
        loadingDialog: false,
        activities: undefined,
      };
    },
    props: {
      user: Object
    },

    created() {
      EventBus.$on('authenticated', (data) => {
        this.checkAndRedirect(data);
      });
      EventBus.$on('unauthenticated', () => {
        this.checkAndRedirect(null);
      });

      if (this.user) {
        this.updatedUser = this.user;
        if (this.user.role === 'admin') {
          this.$router.push('/admin/dashboard');
          return;
        }
      }
    },

    methods: {
      setUpdateUserFields() {
        this.updatedUser = this.user;
      },

      checkAndRedirect(user) {
        //if (!this.user) {
        //  this.user = user;
          this.updatedUser = this.user;
        //}
        if (!user) {
          this.$emit('flash', {
            type: 'info',
            text: 'Action requires logged in user, please log in.'
          });
          this.$router.push('login');
          return;
        }
        if (user.role === 'admin') {
          this.$router.push('/admin/dashboard');
          return;
        }
      },

      broadcastData() {
        setTimeout(() => {
          EventBus.$emit('activitiesReady', this.user.activities);
        }, 200);
      },

      async update() {
        const formData = {
          _csrf: this.csrfToken,
          name: this.updatedUser.name,
          username: this.updatedUser.username,
          email: this.updatedUser.email,
        };

        this.PUT('users/' + this.user._id, formData, null, (data, err) => {
          if (!err) {
            EventBus.$emit('reloadData');
          }
          this.editDialog = false
        });
      },

      async synchronize() {
        this.loadingDialog = true;
        this.GET('users/' + this.user._id + '/update', (data, err) => {
          if (!err) {
            EventBus.$emit('reloadData');
          }
          this.loadingDialog = false;
        });
      },

      async deleteUser() {
        this.DELETE('users/' + this.user._id, (data, err) => {
          if (!err) {
            this.$router.push('/');
            this.$emit('logout');
          }
          this.deleteDialog = false;
        });
      },

      async exportRoutes() {
      },

      async exportActivities() {
      },
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
