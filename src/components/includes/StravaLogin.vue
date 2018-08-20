<template>
  <v-btn large v-on:click="loginStrava" class="gradient gradient-orange" round dark
         style="display: block; width: 90%; text-align: center; margin-bottom: 20px">
    <v-icon>device_hub</v-icon>&nbsp;{{ text }}
  </v-btn>
</template>

<script>
  export default {
    name: "StravaLogin",
    props: {
      text: {
        type: String,
        required: true
      }
    },
    methods: {
      async loginStrava() {
        window.location.href = process.env.API_ROOT + 'auth/strava';
      },
    }
  }
</script>

<style scoped>

</style>
