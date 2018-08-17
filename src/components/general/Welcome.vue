<template>
  <div>
    <h2>Welcome Athletes!</h2>

    <p>Tired of running or cycling the same old routes over and over again? Explox takes your and other
      atheltes' activity history and creates new and unique routes for you. All you need is an account on Strava.</p>

    <v-btn class="gradient gradient-orange" dark round large to="/login">Log In</v-btn>
    <v-btn class="gradient gradient-secondary" dark round large to="/signup">Sign Up</v-btn>
    <div class="separator"></div>
  </div>
</template>

<script>
    export default {
        name: "Welcome"
    }
</script>

<style scoped>

</style>
