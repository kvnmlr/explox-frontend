<template>
  <v-container fluid style="min-height:500px;">
    <strava-alert v-if="user.provider !== 'strava'" style="height:400px;"></strava-alert>
    <div v-else>
      <h2>
        <v-icon>gesture
        </v-icon>
        &nbsp;Personal Routes
      </h2>
      <v-layout row wrap>
        <v-flex xs12 sm7 style="padding-right:20px;">
          <br>
          <div v-if="user.routes.length" >
            <route v-for="(route, i) in user.routes" v-bind:route="route" :key="i"></route>
          </div>
          <div v-else style="height:300px">
            <p>
              You do not have any routes</p>
            <br>
          </div>


          <create-new-route-prompt></create-new-route-prompt>
        </v-flex>
        <v-flex xs12 sm5 style="padding-left:20px;">
          <br>
          <upload-file route></upload-file>
          <br>
          <h2><v-icon>star</v-icon>&nbsp;Starred Routes</h2>
          <br>
          <p>You have not starred any routes</p>
          <route v-for="(route, i) in []" v-bind:route="route" :key="i"></route>
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
  import StravaAlert from "../../includes/StravaAlert";
  import Route from "../../routes/Route";
  import CreateNewRoutePrompt from "../../routes/CreateNewRoutePrompt";
  import UploadFile from "../../routes/UploadFile";

  export default {
    name: "PersonalRoutes",
    components: {
      UploadFile,
      CreateNewRoutePrompt,
      StravaAlert,
      Route
    },
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
  }
</script>

<style scoped>

</style>
