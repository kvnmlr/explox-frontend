<template>
  <div>
    <div style="width: 75%">
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
    <v-navigation-drawer v-if="$vuetify.breakpoint.smAndUp && !results"
                         :value="drawer"
                         :mini-variant="mini"
                         absolute right fixed>

      <v-list>
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action v-if="mini">
            <v-icon>chevron_left</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title><h3>Route Creator</h3></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn v-if="!mini" icon @click.stop="mini = !mini">
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <div v-if="!mini">
        <v-stepper v-model="step" class="elevation-0" vertical non-linear>
          <v-stepper-step :complete="step > 1" step="1" editable>
            Select Start Point
          </v-stepper-step>
          <v-stepper-content step="1">
            <p style="color: darkgrey;">
              Click on the map to select a start point
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
            Select End Point
          </v-stepper-step>
          <v-stepper-content step="2">
            <p style="color: darkgray;">If the end point should be different from the start point click on the map to
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
            Choose Route Properties
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-text-field label="Preferred Distance" v-model="distance" :value="distance" suffix="km"
                          clearable></v-text-field>
            <p style="color: darkgray; font-size: 9pt">
              Preference
            </p>
            <v-radio-group v-model="selectedPreference">
              <v-radio v-for="(radio, n) in preferencesLabels" :key="n" :label="radio" :value="n"
                       color="primary"></v-radio>
            </v-radio-group>
            <p style="color: darkgray; font-size: 9pt">
              You can select some additional properties
            </p>
            <v-select style="z-index:1001" v-model="selectedTags" :items="tagsLabels" multiple></v-select>
            <v-btn dark round class="gradient gradient-orange" @click="submit">Create Routes</v-btn>
          </v-stepper-content>
        </v-stepper>

      </div>
    </v-navigation-drawer>

    <v-navigation-drawer v-if="$vuetify.breakpoint.smAndUp && results"
                         v-model="drawer"
                         :mini-variant="mini"
                         permanent
                         absolute right fixed>

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
          <p style="color: darkgray;">These are the best routes we could find for you:</p>

          <div v-if="!mini">
            <v-expansion-panel popout light :value="selectedRoute">
              <v-expansion-panel-content v-for="(route, i) in generatedRoutes" :key="i">
                <div slot="header">{{ (route.distance / 1000).toFixed(1) }} km Route
                </div>
                <v-card light>
                  <v-card-text>
                    <p><b>Distance: </b> {{ (route.distance / 1000).toFixed(3) }} km</p>
                    <p><b>Undiscovered: </b> {{ (route.distance / 1000).toFixed(3) }} km</p>
                    <v-btn light round class="gradient gradient-green" v-on:click="routeSelected(i)">Show on Map</v-btn>
                    <v-btn dark round class="gradient gradient-orange" v-on:click="openSaveRouteDialog(i)">Save This
                      Route
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <br><br>
            <v-btn class="gradient gradient-orange" style="width: 100%;" @click.stop="results = false" dark round>
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
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="savedRouteTitle" label="Name" required></v-text-field>
            <v-text-field v-model="savedRouteDescription" label="Description" required></v-text-field>
            <p style="color: #CCCCCC;"><i>Note: You can later see the route in your Dashboard.</i></p>
            <v-btn flat round color="primary" v-on:click.prevent="saveRoute">
              Save New Route
            </v-btn>
            <v-btn flat round @click="saveRouteDialog = false">Cancel</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <loading-dialog :show="loadingDialog" body="This will take less than one minute."
                    header="Creating new routes for you."
                    width="500" dark>
    </loading-dialog>

  </div>
</template>

<script>
  import UnderConstruction from "../includes/UnderConstruction";
  import apiMixin from "../../mixins/apiMixin";
  import SimpleMap from "../map/LeafletMap"
  import {EventBus} from '@/eventBus.js';
  import LoadingDialog from "../includes/LoadingDialog";

  export default {
    name: "Creator",
    components: {LoadingDialog, SimpleMap, UnderConstruction},
    data() {
      return {
        drawer: false,
        results: false,
        step: "1",
        mini: false,
        loadingDialog: false,

        // DISTANCE
        distance: '8,5',

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
        tagsLabels: ['road', 'urban', 'popular'],
        selectedTags: ['road'],

        startSelectedDone: false,
        endSelectedDone: false,
        selectedStartPosition: null,
        selectedEndPosition: null,

        generatedRoutes: [],
        selectedRoute: -1,
        saveRouteDialog: false,

        savedRouteId: '',
        savedRouteTitle: '',
        savedRouteDescription: '',
        savedRouteTags: [],
      }
    },
    props: {
      user: Object
    },
    mounted() {
      this.currentSelectStart = true;
      setTimeout(() => {
        EventBus.$emit('collapseDrawer');
      }, 500);
      setTimeout(() => {
        this.drawer = true;
      }, 500);
      if (this.user) {
        if (this.user.activities) {
          EventBus.$emit('activitiesReady', this.user.activities);
        }
      }
    },
    methods: {
      async performSearch() {
        this.GET('creator', (data, err) => {
          if (err) {
            if (!this.user) {
              this.$router.push('/login');
              this.$emit('flash', err.flash);
            }
          } else {
            // TODO
          }
        });
      },
      startSelected() {
        this.step = "2";
      },
      endSelected() {
        this.step = "3";
      },
      onStartSelected(data) {
        this.startSelectedDone = true;
        this.selectedStartPosition = data;
        if (!this.endSelectedDone) {
          this.selectedEndPosition = data;
        }
      },
      onEndSelected(data) {
        this.endSelectedDone = true;
        this.selectedEndPosition = data;
      },
      submit() {
        this.loadingDialog = true;

        const start = this.selectedStartPosition;
        const end = this.selectedEndPosition;
        const distance = this.distance.replace(',', '.');
        const preference = this.preferencesIDs[this.selectedPreference];
        const tags = this.selectedTags;

        const formData = {
          start: start,
          end: end,
          distance: distance,
          preference: preference,
          tags: tags,
        };

        this.POST('routes/generate', formData, null, (data, err) => {
          if (!err) {
            if (data.generatedRoutes.length > 0) {
              this.generatedRoutes = data.generatedRoutes;
              this.results = true;
            } else {
              this.$emit('flash', {
                type: 'error',
                text: 'Could not find suitable routes'
              });
            }

          }
          setTimeout(() => {
            this.loadingDialog = false;
          }, 200);

        });
      },
      routeSelected(index) {
        this.selectedRoute = index;
        console.log(this.selectedRoute);
        EventBus.$emit('routeReady', this.generatedRoutes[this.selectedRoute]);
      },

      openSaveRouteDialog(index) {
        this.savedRouteId = this.generatedRoutes[index]._id;
        this.savedRouteTitle = this.generatedRoutes[index].title;
        this.savedRouteDescription = this.generatedRoutes[index].body;
        this.saveRouteDialog = true;
      },

      saveRoute() {
        const formData = {
          _csrf: this.csrfToken,
          title: this.savedRouteTitle,
          body: this.savedRouteDescription,
          tags: JSON.stringify(this.savedRouteTags)
        };
        const requestParams = {
          method: 'PUT',
          responseType: 'text',
        };

        this.PUT('routes/' + this.savedRouteId, formData, requestParams, (data, err) => {
          if (!err) {
            this.$emit('flash', {
              type: 'success',
              text: 'Route has been saved to your profile!'
            });
          }
          this.saveRouteDialog = false
        });
      }
    },
    beforeMount() {
      this.performSearch();
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
