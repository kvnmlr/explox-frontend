<template>
  <div>
    <card class="shadow">
      <card-body>
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
            <users></users>
          </v-tab-item>
          <v-tab-item :id="`tab-routes`">
            <v-card flat>
              <p>Routes</p>
            </v-card>
          </v-tab-item>
          <v-tab-item :id="`tab-activities`">
            <v-card flat>
              <p>Activities</p>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </card-body>
    </card>

  </div>
</template>

<script>
  import Api from './Api'
  import Users from './Users'

  export default {
    components: {
      Api,
      Users
    },
    name: "Admin",
    data() {
      return {
        currentTab: 'tab-api',
      };
    }
  }
</script>

<style scoped>

</style>
