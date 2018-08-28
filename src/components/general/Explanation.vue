<template>
  <div>
    <v-card class="elevation-0" style="padding: 10px;">
      <v-layout row wrap style="margin:30px;">
        <v-flex xs12 sm6 md6>
          <h2>Step 1: Register Using Strava</h2>
          <br>
          <p>Strava is a popular app for tracking your running and cycling activities.
            You can also create routes by drawing on a map.
            By registering to ExploX, you allow us to use this data in our service.<br>
            <router-link to="strava">Learn more about Strava</router-link>
          </p>
          <strava-login v-if="!user || user.provider !== 'strava'" v-bind:text="'Register with Strava'"
                        style="margin-top: 20px;"></strava-login>
          <h4 v-else>
            <v-icon>check</v-icon>
            &nbsp;You are already connected to Strava, great!
          </h4>
        </v-flex>
        <v-flex xs12 sm6 md6 class="hidden-sm-and-down">
          <v-container>
            <img style="width:100%;" src="@/assets/img/action-adults-adventure-small.jpg" class="elevation-5">
          </v-container>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap style="margin:30px;">
        <v-flex xs12 sm6 md6>
          <h2>Step 2: Your Dashboard</h2>
          <br>
          <p>Your
            <router-link to="dashboard">personalized Dashboard</router-link>
            shows you:
          </p>
          <ul>
            <li>General profile info</li>
            <li>Your own Activity Map</li>
            <li>A list of all past activities</li>
            <li>Your own and starred routes</li>
          </ul>
          <br>
          <p>You can edit your profile data or synchronize your data with your Strava profile.</p>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-container>
            <img style="width:100%;" src="@/assets/img/dashboard.png" class="elevation-5">
          </v-container>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap style="margin:30px;">
        <v-flex xs12 sm6 md6>
          <h2>Step 3: Find Existing Routes</h2>
          <br>
          <p>Finding existing routes couldn't be any simpler.
            Just open
            <router-link to="routes">Route Finder</router-link>
            and enter the location, distance and some other search criteria and we will find you all matching routes by
            other cyclists.
            If you create or upload your own routes other users can also find them here.
          </p>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-container>
            <img style="width:100%;" src="@/assets/img/route-finder.png" class="elevation-5">
          </v-container>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap style="margin:30px;">
        <v-flex xs12 sm6 md6>
          <h2>Step 4: Create New Routes</h2>
          <br>
          <p>
            <router-link to="creator">Creator</router-link>
            is at the heart of ExploX and let's you find totally new routes from your desired start location.
          </p>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-container>
            <img style="width:100%;" src="@/assets/img/creator.png" class="elevation-5">
          </v-container>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap style="margin:30px;">
        <v-flex xs12 sm6 md6>
          <br>
          <h2>Step 5: Invite Some Friends</h2>
          <br>
          <p>Got some cycling buddies? Why not invite them and find new routes together?<br>
            ExploX is currently only available for a small set of users including you and everybody you want to invite.
            We also encourage you to share this website with your cycling groups!<br></p>
          <p style="color: darkgrey"><i>Of course, you do not have to do this.</i></p>
          <invite-friend :user="user"></invite-friend>
        </v-flex>
        <v-flex class="hidden-sm-and-down" xs12 sm6 md6>
          <v-container>
            <img style="width:100%;" src="@/assets/img/friends.jpg" class="elevation-5">
          </v-container>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap style="margin:30px;">
        <v-flex xs12 sm6 md6>
          <br>
          <h2>Where do you want to go next?</h2>
          <quick-access></quick-access>

        </v-flex>
        <v-flex  class="hidden-sm-and-down" xs12 sm6 md6>
          <v-container>
            <br><br><br>
            <img style="width:75%;" src="@/assets/img/bicycle-cloud-clouds.jpg" class="elevation-5">
          </v-container>
        </v-flex>
      </v-layout>
      <v-layout row wrap style="margin:30px;">
        <v-flex xs12 sm12 md12>
          <br>
          <h2>Questions?</h2>
          <br>
          <p>If you have trouble using this website or want to ask a question, just use the
            <router-link to="feedback">Feedback Form</router-link>
            to send us a message and we will write you back.
          </p>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
  import UnderConstruction from "../includes/UnderConstruction";
  import StravaLogin from "../includes/StravaLogin";
  import InviteFriend from "./InviteFriend";
  import QuickAccess from "./home/QuickAccess";

  export default {
    name: "Explanation",
    components: {QuickAccess, InviteFriend, StravaLogin, UnderConstruction},
    props: {
      user: Object,
    }
  }
</script>

<style scoped>

</style>
