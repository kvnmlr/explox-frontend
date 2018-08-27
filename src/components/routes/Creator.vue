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
    <v-navigation-drawer v-if="$vuetify.breakpoint.smAndUp"
                         v-model="drawer"
                         :mini-variant="mini"
                         permanent
                         absolute dark right fixed>

      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action v-if="mini">
            <v-icon>chevron_left</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-content>
            <v-list-tile-title>Route Creator</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn v-if="!mini" icon @click.stop="mini = !mini">
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <div v-if="!mini">
        <v-stepper v-model="step" vertical non-linear>
          <v-stepper-step :complete="step > 1" step="1" editable>
            Select Start Point
          </v-stepper-step>
          <v-stepper-content step="1">
            <p style="color: lightgray;">
              Click on the map to select a start point
              &nbsp;<v-icon v-show="startSelectedDone">check</v-icon>
            </p>
            <p v-if="startSelectedDone" style="color: lightgray;">
              Lat: {{ selectedStartPosition.lat.toFixed(3) }}<br>
              Lng: {{ selectedStartPosition.lng.toFixed(3) }}</p>
            <v-btn  v-if="startSelectedDone" color="primary" @click="startSelected">Continue</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2" :editable="selectedStartPosition !== null">
            Select End Point
          </v-stepper-step>
          <v-stepper-content step="2">
            <p style="color: lightgray;">If the end point should be different from the start point click on the map to select an end point
            &nbsp;<v-icon>check</v-icon></p>
            <p v-if="endSelectedDone" style="color: lightgray;">
              Lat: {{ selectedEndPosition.lat.toFixed(3) }}<br>
              Lng: {{ selectedEndPosition.lng.toFixed(3) }}</p>
            <p v-else-if="startSelectedDone" style="color: lightgray;">
              Lat: {{ selectedStartPosition.lat.toFixed(3) + ' (same as start)' }}<br>
              Lng: {{ selectedStartPosition.lng.toFixed(3) + ' (same as start)'}}</p>
            <v-btn color="primary" @click="endSelected">Continue</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 3" step="3" :editable="selectedStartPosition !== null && selectedEndPosition !== null">
            Choose Route Properties
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-text-field label="Preferred Distance" :value="distance" suffix="km" clearable></v-text-field>
            <p style="color: lightgray; font-size: 9pt">
              Preference
            </p>
            <v-radio-group v-model="selectedPreference">
              <v-radio v-for="(radio, n) in preferencesLabels" :key="n" :label="radio" :value="n" color="primary"></v-radio>
            </v-radio-group>
            <p style="color: lightgray; font-size: 9pt">
              You can select some additional properties
            </p>
            <v-select style="z-index:1001" v-model="selectedTags" :items="tagsLabels" multiple></v-select>
            <v-btn color="primary" @click="submit">Create Routes</v-btn>
          </v-stepper-content>
        </v-stepper>

      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import UnderConstruction from "../includes/UnderConstruction";
  import apiMixin from "../../mixins/apiMixin";
  import SimpleMap from "../map/LeafletMap"
  import {EventBus} from '@/eventBus.js';

  export default {
    name: "Creator",
    components: {SimpleMap, UnderConstruction},
    data() {
      return {
        drawer: true,
        step: "1",
        mini: false,

        // DISTANCE
        distance: '8,5',

        // PREFERENCE
        preferencesLabels: [
          'Ride Exact Distance',
          'Explore New Areas'
        ],
        preferencesIDs: [
          'distance',
          'explore'
        ],
        selectedPreference: 0,

        // TAGS
        tagsLabels: ['road', 'urban', 'popular'],
        selectedTags: ['road'],

        startSelectedDone: false,
        endSelectedDone: false,
        selectedStartPosition: null,
        selectedEndPosition: null,
      }
    },
    props: {
      user: Object
    },
    mounted() {
      this.currentSelectStart = true;
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
        const start = this.selectedStartPosition;
        const end = this.selectedEndPosition;
        const distance = this.distance;
        const preference = this.preferencesIDs[this.selectedPreference];
        const tags = this.selectedTags;

        console.log(start);
        console.log(end);

        console.log(distance);
        console.log(preference);
        console.log(tags)
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
