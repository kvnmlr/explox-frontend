<template>
  <div>
    <h1>Creator</h1>
    <br>
    <div style="width: 75%">
      <simple-map></simple-map>
    </div>
    <v-navigation-drawer v-if="$vuetify.breakpoint.lgAndUp" v-model="drawer" :mini-variant="mini"
                         absolute dark right fixed>

      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action v-if="mini">
            <v-icon>chevron_left</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-content>
            <v-list-tile-title>Options</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn v-if="!mini" icon @click.stop="mini = !mini">
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <div v-if="!mini">
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1">
            Select Start Point
          </v-stepper-step>

          <v-stepper-content step="1">
            <p style="color: lightgray;">Click on the map to select a start point</p>
            <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2">Select End Point
          </v-stepper-step>

          <v-stepper-content step="2">
            <p style="color: lightgray;">Click on the map to select an end point</p>
            <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3">Choose Route Properties</v-stepper-step>

          <v-stepper-content step="3">
            <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
            <v-btn flat>Cancel</v-btn>
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

  export default {
    name: "Creator",
    components: {SimpleMap, UnderConstruction},
    data() {
      return {
        drawer: true,
        e6: 1,
        items: [
          {title: 'Home', icon: 'dashboard'},
          {title: 'About', icon: 'question_answer'}
        ],
        mini: false,
        right: null
      }
    },
    props: {
      user: Object
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
