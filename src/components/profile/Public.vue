<template>
  <div v-if="user">
    <div v-if="user.activities && user.routes">
      <h1>{{ user.firstName + ' ' + user.lastName }}</h1>
      <v-layout row wrap>

        <v-flex xs12 sm12 md3>
          <v-container>
            <br>
            <v-layout row>
              <v-flex xs10 sm10 md10>
                <v-avatar v-if="user.strava" size="96px" tile style="margin-right: 20px;">
                  <img style="border-radius: 50%;" v-bind:src="this.user.strava.profile">
                </v-avatar>
                <br><br>
                <h4>{{ user.username }}</h4>
                <p v-if="user.strava">
                  <a style="color: #FC4C02;" :href="'https://www.strava.com/athletes/' + user.strava.id">View
                    profile on Strava</a>
                </p>
                <p></p>
                <h4>A member since</h4>
                <p>{{ formatDate(user.createdAt, false, false) }}</p>

                <h4>Routes:</h4>
                <p>{{ user.routes.length }}</p>
                <h4>Activities:</h4>
                <p>{{ user.activities.length }}</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 sm12 md9>
          <v-container>
            <SimpleMap show-activity-map style="width: 100%;"></SimpleMap>
          </v-container>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6>
          <v-container>
            <v-flex row>
              <v-card class="elevation-5">
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
          </v-container>
        </v-flex>

        <v-flex xs12 sm12 md6>
          <v-container>
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
    </div>
  </div>
</template>


<script>
  import ActivityMap from './user/ActivityMap'
  import Activities from './user/Activities'
  import PersonalRoutes from './user/PersonalRoutes'
  import Activity from '../activities/Activity'
  import SimpleMap from '../map/LeafletMap'
  import apiMixin from '../../mixins/apiMixin'
  import Route from '../routes/Route'
  import {EventBus} from '@/eventBus.js'
  import formatDateMixin from '../../mixins/formatDateMixin'

  export default {
    name: 'Public',
    components: {
      Route, SimpleMap, PersonalRoutes, Activities, ActivityMap, Activity
    },
    data () {
      return {
        id: this.$route.params.id,
        activities: undefined,
        user: Object
      }
    },

    created () {
      this.GET('users/'+ this.id, (data, err) => {
        if (!err) {
          this.user = data.user;
          this.broadcastData();
        }
      })
    },

    methods: {
      broadcastData () {
        setTimeout(() => {
          EventBus.$emit('activitiesReady', this.user.activities)
        }, 200)
      },
    },
    mixins: [apiMixin, formatDateMixin]
  }
</script>

<style scoped>

</style>
