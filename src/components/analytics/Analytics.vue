<template>
  <div>
    <h1>Analytics</h1>
    <under-construction></under-construction>
    <h2>General</h2>
    <pre>{{ JSON.stringify(user.strava, null, 2) }}</pre>
    <h2>Stats</h2>
    <pre> {{ JSON.stringify(user.stravaStats, null, 2) }}</pre>
  </div>
</template>

<script>
  import UnderConstruction from "../includes/UnderConstruction";

  export default {
    name: "Analytics",
    components: {UnderConstruction},
    props: {
      user: Object,
    }
  }
</script>

<style scoped>

</style>
