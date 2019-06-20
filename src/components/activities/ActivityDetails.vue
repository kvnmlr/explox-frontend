<template>
  <div v-if="route">
    <v-layout row wrap>
      <v-flex xs12 md4 md4>
        <v-layout row wrap>
          <v-flex xs10 sm10 md10>
            <h2>{{ route.title }}</h2>
            <v-flex v-if="route.strava" style="color: grey">on {{ formatDate(route.strava.start_date_local) }}</v-flex>
            <br>
          </v-flex>
          <v-flex xs2 sm2 md2>
            <v-menu transition="slide-y-transition" bottom right>
              <v-btn light class="gradient gradient-green" relative fab right slot="activator">
                <v-icon>more_horiz</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-on:click="editDialog = true">
                  <v-list-tile-title>
                    <v-icon>edit</v-icon>
                    Edit
                  </v-list-tile-title>
                  <v-dialog v-model="editDialog" persistent max-width="290">
                    <v-card dark>
                      <v-card-title class="headline">Update Route Details</v-card-title>
                      <v-card-text>
                        <v-form ref="form" lazy-validation>
                          <v-text-field v-model="updatedRoute.title" label="Name" required></v-text-field>
                          <v-btn flat color="primary" v-on:click.prevent="update">
                            Update
                          </v-btn>
                          <v-btn flat @click="editDialog = false">Cancel</v-btn>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
                          <v-btn flat color="primary" v-on:click="exportRoute">
                            Download GPX File
                          </v-btn>
                          <v-btn flat color="primary" v-on:click="">
                            Save in Strava
                          </v-btn>
                          <v-btn flat @click="exportDialog = false">Cancel</v-btn>
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
                    Delete
                  </v-list-tile-title>
                  <v-dialog v-model="deleteDialog" persistent max-width="290">
                    <v-card dark>
                      <v-card-title class="headline">Delete this Route?</v-card-title>
                      <v-card-text>
                        <v-form ref="form" lazy-validation>
                          <v-btn flat color="primary" v-on:click="deleteRoute">
                            Delete
                          </v-btn>
                          <v-btn flat @click="deleteDialog = false">Cancel</v-btn>
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
        <p>Distance: {{ route.distance }} km</p>
        <p v-if="route.user">Athlete:
          <router-link :to="{path: '/users/' + route.user._id}">{{ route.user.username}}</router-link>
        </p>
        <p v-if="route.strava">
          <a style="color: #FC4C02;" :href="'https://www.strava.com/activities/' + route.strava.id">View on
            Strava</a>
        </p>
      </v-flex>
      <v-flex xs12 sm12 md8>
        <simple-map has-elevation-profile show-activity-map show-route open-panel></simple-map>
      </v-flex>
    </v-layout>
    <!-- Comments not available in backend yet
    <div class="separator"></div>
    <h2>Comments</h2>
    <v-textarea
      name="comment_input"
      label="Your comment"
      value=""
      :auto-grow="true"
      rows="1"
      v-model="commentText"></v-textarea>
    <v-btn class="gradient gradient-orange" round dark v-on:click="addComment">Post Comment</v-btn>

    <v-list two-line style="margin-top: 20px;">
      <template v-for="(comment, index) in route.comments">
        <v-list-tile :key="comment._id" avatar @click="">
          <v-list-tile-action>
            <v-icon>thumb_up</v-icon>
          </v-list-tile-action>
          <v-list-tile-action v-if="comment._id">
            <v-icon color="red" v-on:click="deleteComment(comment._id)">delete</v-icon>
          </v-list-tile-action>
          <br>
          <v-list-tile-content>
            <v-list-tile-title v-html="comment.body"></v-list-tile-title>
            <v-list-tile-sub-title v-html="comment.user.name"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <img :src="comment.avatar">
          </v-list-tile-avatar>
        </v-list-tile>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
    -->
  </div>

</template>

<script>
  import SimpleMap from '../map/LeafletMap'
  import apiMixin from '../../mixins/apiMixin'
  import {EventBus} from '@/eventBus.js'
  import formatDateMixin from '../../mixins/formatDateMixin'

  export default {
    name: 'RouteDetails',
    components: {
      'simple-map': SimpleMap
    },
    props: {
      user: Object,
    },
    data () {
      return {
        id: this.$route.params.id,
        name: '',
        menu: false,
        editDialog: false,
        deleteDialog: false,
        exportDialog: false,
        route: {},
        updatedRoute: {},
        alert: false,
        overlay: false,
      }
    },
    created () {
      this.performSearch()
    },
    beforeRouteLeave(to, from, next) {
      EventBus.$emit('removeMap', next);
    },
    methods: {
      broadcastData () {
        if (this.route) {
          EventBus.$emit('routeReady', this.route)
        }
        if (this.user) {
          if (this.user.activities) {
            EventBus.$emit('activitiesReady', this.user.activities)
          }
        }
      },
      async performSearch () {
        this.GET('routes/' + this.id, (data, err) => {
          if (!err) {
            this.route = data.route
            this.updatedRoute = {
              title: this.route.title,
            }
            this.broadcastData()
          }
        })
      },
      async update () {
        const formData = {
          _csrf: this.csrfToken,
          title: this.updatedRoute.title,
        }
        const requestParams = {
          method: 'PUT',
          responseType: 'text',
        }

        this.PUT('routes/' + this.id, formData, requestParams, (data, err) => {
          if (!err) {
            this.performSearch()
          }
          this.editDialog = false
        })
      },

      async deleteRoute () {
        this.DELETE('routes/' + this.id, (data, err) => {
          if (!err) {
            this.$router.go(-1);
          }
          this.deleteDialog = false
        })
      },

      async exportRoute () {
        this.GET('routes/' + this.id + '/export', (data, err) => {
          this.exportDialog = false
        })
      },
    },
    mixins: [apiMixin, formatDateMixin]
  }
</script>

<style scoped>

</style>
