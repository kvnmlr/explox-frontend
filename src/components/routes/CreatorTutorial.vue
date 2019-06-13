<template>
  <div>
    <h1>Route Creation Tutorial</h1>
    <br>
    <v-stepper v-model="e6" non-linear>
      <v-stepper-header>
        <v-stepper-step editable :complete="e6 > 1" step="1">Start</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable :complete="e6 > 2" step="2">End</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable :complete="e6 > 3" step="3">Parameters</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable :complete="e6 > 4" step="4">Find</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable :complete="e6 > 5" step="5">Inspect</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable :complete="e6 > 6" step="6">Rate</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-layout row wrap style="margin:30px;" align-center>
            <v-flex xs12 md4>
              <h4>Since you are using the Route Creation for the first time, here is a short tutorial:</h4>
              <br><br>
              <h2>Step 1: Select a start point</h2>
              <br>
              <ul>
                <li>Click on the map where you want your route to start. An orange circle will appear.</li>
                <li>Click continue.</li>
              </ul>
            </v-flex>
            <v-flex xs12 md8 class="hidden-sm-and-down">
              <v-container>
                <img style="width:100%;" src="@/assets/img/creator/creator2.png" class="elevation-5">
              </v-container>
            </v-flex>
          </v-layout>
          <v-btn large dark round outline color="grey" v-on:click="finishTutorial">Skip
            Tutorial
          </v-btn>
          <v-btn large round dark class="gradient gradient-orange" @click="e6 = 2">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-layout row wrap style="margin:30px;" align-center>
            <v-flex xs12 md4>
              <h2>Step 2: Select an end point</h2>
              <br>
              <ul>
                <li>Click on the map where you want your route to end. A blue circle will appear.</li>
                <li>Click continue.</li>
              </ul>
            </v-flex>
            <v-flex xs12 md8 class="hidden-sm-and-down">
              <v-container>
                <img style="width:100%;" src="@/assets/img/creator/creator3.png" class="elevation-5">
              </v-container>
            </v-flex>
          </v-layout>
          <v-btn large round dark class="gradient gradient-orange" @click="e6 = 3">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-layout row wrap style="margin:30px;" align-center>
            <v-flex xs12 md6>
              <h2>Step 3: Select route parameters</h2>
              <br>
              <ul>
                <li>Enter the distance your route should have (in kilometers).</li>
                <li>Select your desired road type from the drop down. Mixed means road and off-road trails are possible.
                </li>
              </ul>
            </v-flex>
            <v-flex xs12 md6 class="hidden-sm-and-down">
              <v-container>
                <img src="@/assets/img/creator/creatorpanel3.png" class="elevation-5">
              </v-container>
            </v-flex>
          </v-layout>
          <v-btn large round dark class="gradient gradient-orange" @click="e6 = 4">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-layout row wrap style="margin:30px;" align-center>
            <v-flex xs12 md6>
              <h2>Step 4: Find the two generated routes</h2>
              <br>
              <ul>
                <li>When the route creation was successful, two routes will appear in the right sidebar.</li>
                <li>You can expand the panels by clicking on the route name.</li>
                <li>When the route creation failed, you will see a red error indication at the bottom of the page.</li>
              </ul>
            </v-flex>
            <v-flex xs12 md6 class="hidden-sm-and-down">
              <v-container>
                <img src="@/assets/img/creator/creatorpanel4.png" class="elevation-5">
              </v-container>
            </v-flex>
          </v-layout>
          <v-btn large round dark class="gradient gradient-orange" @click="e6 = 5">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-content step="5">
          <v-layout row wrap style="margin:30px;" align-center>
            <v-flex xs12 md4>
              <h2>Step 5: Inspect the routes</h2>
              <br>
              <ul>
                <li>Expand the panel by clicking on the route name.</li>
                <li>Click 'Show on Map'.</li>
              </ul>
            </v-flex>
            <v-flex xs12 md8 class="hidden-sm-and-down">
              <v-container>
                <img style="width:100%;" src="@/assets/img/creator/creator4.png" class="elevation-5">
              </v-container>
            </v-flex>
          </v-layout>
          <v-btn large round dark class="gradient gradient-orange" @click="e6 = 6">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-content step="6">
          <v-layout row wrap style="margin:30px;" align-center>
            <v-flex xs12 md6>
              <h2>Step 6: Rate the Route</h2>
              <br>
              <ul>
                <li>Select how likely you are to actually ride this route soon.</li>
                <li>White a short comment.</li>
                <li>Click 'Submit Rating'.</li>
                <li><b>Do the same for the second generated route.</b></li>
              </ul>
            </v-flex>
            <v-flex xs12 md6 class="hidden-sm-and-down">
              <v-container>
                <img src="@/assets/img/creator/creatorpanel6.png" class="elevation-5">
              </v-container>
            </v-flex>
          </v-layout>
          <v-btn style="height: 80px;" dark large round color="success" outline v-on:click="finishTutorial">Create
            your first route now!
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
  import apiMixin from '../../mixins/apiMixin'

  export default {
    name: 'CreatorTutorial',
    props: {
      user: Object
    },
    data () {
      return {
        e6: 1
      }
    },
    methods: {
      finishTutorial () {
        const formData = {
          creatorTutorial: true
        }

        this.PUT('users/' + this.user._id, formData, null, (data, err) => {
        })
        this.user.creatorTutorial = true
      }
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
