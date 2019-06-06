<template>
  <div>
    <h1>Admin Dashboard</h1>
    <v-tabs fixed-tabs
            slot="extension"
            v-model="currentTab"
            centered
            grow
            hide-slider
    >
      <v-tab :href="`#tab-api`">
        General
      </v-tab>
      <v-tab :href="`#tab-users`">
        Users
      </v-tab>
      <v-tab :href="`#tab-routes`">
        Routes
      </v-tab>
      <v-tab :href="`#tab-segments`">
        Segments
      </v-tab>
      <v-tab :href="`#tab-activities`">
        Activities
      </v-tab>
      <v-tab :href="`#tab-creator-results`">
        Results
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab" touchless>
      <v-tab-item lazy :id="`tab-api`">
        <api :invitations="invitations" :feedbacks="feedbacks" :limits="limits"></api>
      </v-tab-item>
      <v-tab-item lazy :id="`tab-users`">
        <users :users="users"></users>
      </v-tab-item>
      <v-tab-item lazy :id="`tab-routes`">
        <routes :routes="routes"></routes>
      </v-tab-item>
      <v-tab-item lazy :id="`tab-segments`">
        <segments :segments="segments"></segments>
      </v-tab-item>
      <v-tab-item lazy :id="`tab-activities`">
        <activities :activities="activities"></activities>
      </v-tab-item>
      <v-tab-item lazy :id="`tab-creator-results`">
        <creator-results :results="creatorResults"></creator-results>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
  import General from './General'
  import Users from './Users'
  import Activities from './Activities'
  import Routes from './Routes'
  import {EventBus} from '@/eventBus.js';
  import apiMixin from "../../../mixins/apiMixin";
  import Segments from "./Segments";
  import CreatorResults from "./CreatorResults";

  export default {
    components: {
      CreatorResults,
      Segments,
      Api: General,
      Users,
      Activities,
      Routes
    },
    name: "Admin",
    data() {
      return {
        currentTab: 'tab-api',
        users: [],
        activities: [],
        routes: [],
        segments: [],
        creatorResults: [],
        invitations: [],
        feedbacks: [],
        limits: {},
        user: Object

      };
    },
    created() {
      this.performSearch();
      EventBus.$emit('authenticate');
    },
    methods: {
      async performSearch() {
        this.GET('dashboard/admin?general=true&users=true', (data, err) => {
          console.log(data);
          if (!err) {
            this.users = data.users;
            this.feedbacks = data.feedbacks;
            this.limits = data.limits;
            this.invitations = data.invitations;
          }
        });
        this.GET('dashboard/admin?activities=true', (data, err) => {
          console.log(data);
          if (!err) {
            this.activities = data.activities;
          }
        });
        this.GET('dashboard/admin?routes=true', (data, err) => {
          console.log(data);
          if (!err) {
            this.routes = data.routes;
            this.creatorResults = data.creatorResults;
          }
        });
        /* this.GET('dashboard/admin?segments=true', (data, err) => {
          console.log(data);
          if (!err) {
            this.segments = data.segments;
          }
        }); */
      },
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
