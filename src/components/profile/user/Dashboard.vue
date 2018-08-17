<template>
  <div v-if="user">
    <h1>Dashboard</h1>
    <v-tabs fixed-tabs slot="extension" v-model="currentTab" centered>
      <v-tab :href="`#tab-profile`">
        Profile
      </v-tab>
      <v-tab :href="`#tab-activity-map`">
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
          <v-flex xs12 sm12 md6>
            <v-container>
              <img class="elevation-5" style="width:100%"
                   src="https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg">
              <br>
              <br>
              <v-layout row>
                <v-flex xs10 sm10 md10>
                  <h2 color="primary">{{ user.name.toUpperCase() }}</h2>
                  <h4>{{ user.username }}</h4>
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
                  <v-menu dark transition="slide-y-transition" bottom right>
                    <v-btn class="gradient gradient-green" light fab relative right slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile v-on:click="editDialog = true">
                        <v-list-tile-title>
                          <v-icon>edit</v-icon>
                          Edit
                        </v-list-tile-title>
                      </v-list-tile>


                      <v-list-tile v-on:click="exportDialog = true">
                        <v-list-tile-title>
                          <v-icon>import_export</v-icon>
                          Export/Save
                        </v-list-tile-title>
                        <v-dialog v-model="exportDialog" persistent max-width="290">
                          <v-card dark>
                            <v-card-title class="headline">Save/Export Route</v-card-title>
                            <v-card-text>
                              <v-form ref="form" lazy-validation>
                                <v-btn flat round color="primary" v-on:click="exportRoutes">
                                  Download All Routes
                                </v-btn>
                                <v-btn flat round color="primary" v-on:click="exportActivities">
                                  Download All Activities
                                </v-btn>
                                <v-btn flat round @click="exportDialog = false">Cancel</v-btn>
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
                        <v-dialog v-model="deleteDialog" persistent max-width="290">
                          <v-card dark>
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
                                <v-btn flat color="primary" round v-on:click="deleteUser">
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
              <br>


            </v-container>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-container>
              <v-flex row>
                <v-card dark color="accent" class="elevation-5">
                  <v-container>
                    <h3>Feed</h3>
                    <p>No Activity</p>
                    <v-btn flat round v-on:click="currentTab='tab-activities'">View All</v-btn>
                  </v-container>

                </v-card>
              </v-flex>
              <v-spacer style="margin: 20px;"></v-spacer>
              <v-flex row>
                <v-card class="elevation-5">
                  <v-container>
                    <h3>Routes</h3>
                    <p>No Routes</p>
                    <v-btn flat round v-on:click="currentTab='tab-routes'">View All</v-btn>
                  </v-container>

                </v-card>
              </v-flex>
            </v-container>

          </v-flex>
        </v-layout>
        <v-btn class="gradient gradient-orange" large dark round :to="{path: '/users/'+this.user._id}">
          <v-icon>contacts</v-icon>&nbsp;View Public Profile
        </v-btn>
        <v-dialog v-if="updatedUser" v-model="editDialog" persistent max-width="290">
          <v-card dark>
            <v-card-title class="headline">Update Route Details</v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field v-model="updatedUser.name" label="Name" required></v-text-field>
                <v-text-field v-model="updatedUser.username" label="Username" required></v-text-field>
                <v-text-field v-model="updatedUser.email" label="E-Mail" required></v-text-field>
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
</template>

<script>
  import axios from 'axios'
  import ActivityMap from "./ActivityMap";
  import Activities from "./Activities";
  import PersonalRoutes from "./PersonalRoutes";
  import StravaAlert from "../../includes/StravaAlert";
  import SimpleMap from "../../map/LeafletMap"
  import apiMixin from "../../../mixins/apiMixin";

  export default {
    name: "User",
    components: {SimpleMap, StravaAlert, PersonalRoutes, Activities, ActivityMap},
    data() {
      return {
        currentTab: 'tab-profile',
        editDialog: false,
        updatedUser: {},
        exportDialog: false,
        deleteDialog: false,
      };
    },
    props: {
      user: Object
    },
    created() {
      console.log("dashboard created");
      this.requestData();
    },
    methods: {
      async requestData() {
        this.GET('dashboard', (data, err) => {
          if (err) {
            if (!this.user) {
              setTimeout(() => {this.$router.push('/login');}, 100);
            }
            this.$emit('flash', err.flash);
          } else {
            if (data.user) {
              if (data.user.role === 'admin') {
                this.$router.push('/admin/dashboard');
                return;
              }
            }
            this.user = data.user;
            this.updatedUser = {
              name: this.user.name,
              username: this.user.username,
              email: this.user.email,
            };
          }
        });
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
            this.requestData();
          }
          this.editDialog = false
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
        console.log("Export Routes");
      },

      async exportActivities() {
        console.log("Export Activities");
      },
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
