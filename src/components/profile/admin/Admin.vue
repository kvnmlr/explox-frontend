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
        <api></api>
      </v-tab-item>
      <v-tab-item :id="`tab-users`">
        <users v-bind:users="users"></users>
      </v-tab-item>
      <v-tab-item :id="`tab-routes`">
        <v-card flat>
          <p>Routes</p>
        </v-card>
      </v-tab-item>
      <v-tab-item :id="`tab-activities`">
        <activities v-bind:activities="users"></activities>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
  import Api from './Api'
  import Users from './Users'
  import Activities from './Activities'
  import axios from 'axios'

  export default {
    components: {
      Api,
      Users,
      Activities,
    },
    name: "Admin",
    data() {
      return {
        currentTab: 'tab-api',
        users: {},
        activities: {},
        routes: {},
      };
    },
    created() {
      this.requestData();
    },
    methods: {
      async requestData() {
        axios.get('http://localhost:3000/dashboard')
          .then(response => {
            const data = response.data;
            this.users = data.users;
            this.activities = data.activities;
            this.routes = data.routes;
            console.log(data);
          })
          .catch(error => {
            console.log(error.response.data.error);
          });
      },
    }
  }
</script>

<style scoped>

</style>
