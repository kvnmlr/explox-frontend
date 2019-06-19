<template>
  <div>
    <v-card class="elevation-0 gradient-no-switch gradient-secondary"
            style="width: 100%;" :dark="!dense">
      <v-card-title v-if="!dense"  primary-title>
        <h2 style="color: white">{{formatDate(creatorResult.createdAt, false)}}</h2>
      </v-card-title>
      <v-card-text>
        <div v-if="creatorResult.generatedRoutes.length > 1">
          <div v-for="(route, i) in creatorResult.generatedRoutes" v-bind:key="i">
            <v-card light style="width: 100%; margin-bottom: 20px;" class="gradient-no-switch gradient-green">
              <v-card-title primary-title>
                <v-flex class="headline">
                  <h5>{{ route.title }}</h5>
                </v-flex>
              </v-card-title>
              <v-card-text v-if="!dense">
                <v-flex><b>Your comment:</b> {{ creatorResult.routeRatings[i].comment }}</v-flex>
                <v-flex><b>Your rating:</b> {{ ratingMapping[creatorResult.routeRatings[i].rating] }} ({{
                  creatorResult.routeRatings[i].rating }} / 4)
                </v-flex>
                <v-flex><b>Familiarity:</b> {{ (creatorResult.familiarityScores[i] * 100).toFixed(0) }} %</v-flex>
                <br>
                <v-flex style="color: grey">Created on {{
                  formatDate(route.createdAt, true) }}
                </v-flex>
                <br>
                <v-btn dark round class="gradient gradient-orange" :to="{path: '/route/' + route._id}">
                  Show Route on Map
                </v-btn>
                <v-btn light round class="gradient gradient-green"
                       v-on:click="() => {saveRouteDialog = true; currentSelectedRoute = creatorResult.generatedRoutes[i]}">
                  Upload to Strava
                </v-btn>
              </v-card-text>
              <v-card-text v-else>
                <v-flex style="margin-top: -20px; color: grey">Created on {{
                  formatDate(route.createdAt, true) }}
                </v-flex>
                <v-btn dark small round class="gradient gradient-orange"
                       v-on:click="() => {saveRouteDialog = true; currentSelectedRoute = creatorResult.generatedRoutes[i]}">
                  Upload to Strava
                </v-btn>
                <v-btn light round small class="gradient gradient-green" :to="{path: '/route/' + route._id}">
                  Show Route on Map
                </v-btn>

              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <loading-dialog :show="stravaImportDialog" body="Please save the route as 'Ride' on Strava."
                    header="You will be redirected in some seconds."
                    :width="500">
    </loading-dialog>
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
  </div>
</template>

<script>
  import formatDateMixin from '../../mixins/formatDateMixin'
  import LoadingDialog from '../includes/LoadingDialog'
  import apiMixin from '../../mixins/apiMixin'

  export default {
    name: 'CreatorResult',
    components: {
      LoadingDialog,
    },
    props: {
      dense: Boolean,
      creatorResult: {
        type: Object,
        required: true,
      }
    },
    data () {
      return {
        stravaImportDialog: false,
        currentSelectedRoute: null,
        saveRouteDialog: false,
        ratingMapping: ['Not rated', 'You want to cycle this route soon', 'You would give this route a try', 'You would rather not cycle this route', 'You do not want to cycle this route',]
      }
    },
    methods: {
      saveRoute () {
        if (this.currentSelectedRoute === null) {
          return
        }
        this.saveRouteDialog = false
        this.stravaImportDialog = true
        this.GET('stravaimport?id=' + this.currentSelectedRoute._id + '&title=' + this.currentSelectedRoute.title + '&description=' + this.currentSelectedRoute.description, (data, err) => {
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
    },
    mixins: [formatDateMixin, apiMixin],

  }
</script>


<style scoped>

</style>
