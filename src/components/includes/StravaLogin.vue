<template>
  <v-btn v-on:click="loginStrava" color="primary"
         style="display: block; width: 95%; text-align: center; margin-bottom: 20px">
    {{ text }}
  </v-btn>
</template>

<script>
  import axios from 'axios'

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
        window.location.href = 'http://localhost:3000/auth/strava';

        /* axios.get('https://www.strava.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fstrava%2Fcallback&client_id=21869', {
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        })
          .then(response => {
            console.log('Data');
            console.log(response);
          })
          .catch(error => {
            console.log(error);
            console.log(error.response.data.error);
          })*/
      },
    }
  }
</script>

<style scoped>

</style>
