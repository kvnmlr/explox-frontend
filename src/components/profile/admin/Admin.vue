<template>
  <div>
    <h1>Admin Dashboard</h1>
    <v-tabs fixed-tabs slot="extension" v-model="currentTab" centered>
      <v-tab :href="`#tab-api`">
        API
      </v-tab>
      <v-tab :href="`#tab-users`">
        Users
      </v-tab>
      <v-tab :href="`#tab-routes`">
        Routes
      </v-tab>
      <v-tab :href="`#tab-activities`">
        Activities
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item :id="`tab-api`">
        <api v-bind:feedbacks="feedbacks"></api>
      </v-tab-item>
      <v-tab-item :id="`tab-users`">
        <users v-bind:users="users"></users>
      </v-tab-item>
      <v-tab-item :id="`tab-routes`">
        <routes v-bind:routes="routes"></routes>
      </v-tab-item>
      <v-tab-item :id="`tab-activities`">
        <activities v-bind:activities="activities"></activities>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
  import Api from './General'
  import Users from './Users'
  import Activities from './Activities'
  import Routes from './Routes'
  import { EventBus } from '@/eventBus.js';
  import apiMixin from "../../../mixins/apiMixin";

  export default {
    components: {
      Api,
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
        feedbacks: [],
      };
    },
    created() {
      this.performSearch();
    },
    methods: {
      async performSearch() {
        this.GET('dashboard', (data, err) => {
          if (!err) {
            this.users = data.users;
            this.activities = data.activities;
            this.routes = data.routes;
            this.feedbacks = data.feedbacks;

            console.log(this.activities);

            EventBus.$emit('routesReady', this.routes);
            EventBus.$emit('activitiesReady', this.activities);
            EventBus.$emit('usersReady', this.users);
            EventBus.$emit('feedbacksReady', this.feedbacks);
          }
        });
      },
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
