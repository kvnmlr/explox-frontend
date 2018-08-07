<template>
  <div>
    <card class="shadow">
      <card-body>
        <h1>Dashboard</h1>
        <v-tabs fixed-tabs slot="extension" v-model="currentTab" centered>
          <v-tab :href="`#tab-profile`">
            Profile
          </v-tab>
          <v-tab :href="`#tab-activity-map`">
            Activity Map
          </v-tab>
          <v-tab :href="`#tab-analytics`">
            Analytics
          </v-tab>
          <v-tab :href="`#tab-activities`">
            Activities
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="currentTab">
          <v-tab-item :id="`tab-profile`">
            <p>Profile</p>
          </v-tab-item>
          <v-tab-item :id="`tab-activity-map`">
            <p>Activity Map</p>
          </v-tab-item>
          <v-tab-item :id="`tab-analytics`">
            <p>Analytics</p>
          </v-tab-item>
          <v-tab-item :id="`tab-activities`">
            <p>Activities</p>

          </v-tab-item>
        </v-tabs-items>
      </card-body>
    </card>

  </div>
</template>

<script>
  export default {
    name: "User",
    data() {
      return {
        currentTab: 'tab-profile',
      };
    }
  }
</script>

<style scoped>

</style>
