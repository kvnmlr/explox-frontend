<template>
  <div>
    <h1>Admin Dashboard</h1>
    <v-tabs fixed-tabs slot="extension" v-model="currentTab" centered>
      <v-tab :href="`#tab-api`">
        General
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
        <api :invitations="invitations" :feedbacks="feedbacks" :limits="limits"></api>
      </v-tab-item>
      <v-tab-item :id="`tab-users`">
        <users :users="users"></users>
      </v-tab-item>
      <v-tab-item :id="`tab-routes`">
        <routes :routes="routes"></routes>
      </v-tab-item>
      <v-tab-item :id="`tab-activities`">
        <activities :activities="activities"></activities>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
  import General from './General'
  import Users from './Users'
  import Activities from './Activities'
  import Routes from './Routes'
  import { EventBus } from '@/eventBus.js';
  import apiMixin from "../../../mixins/apiMixin";

  export default {
    components: {
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
        this.GET('dashboard', (data, err) => {
          if (!err) {
            this.users = data.users;
            this.activities = data.activities;
            this.routes = data.routes;
            this.feedbacks = data.feedbacks;
            this.limits = data.limits;
            this.invitations = data.invitations;
            EventBus.$emit('adminRoutesReady', this.routes);
            EventBus.$emit('adminActivitiesReady', this.activities);
            EventBus.$emit('adminUsersReady', this.users);
          }
        });
      },
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
