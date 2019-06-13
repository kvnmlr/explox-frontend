<template>
  <div>
    <div v-if="!dense">
      <h1>Login</h1>
      <h3>Please log in using your Strava account</h3>
      <br>
    </div>
    <v-layout style="height: 500px;" v-if="!dense" column wrap align-center justify-center>

      <strava-login v-bind:text="'Strava Login'"></strava-login>
      <v-btn flat color="primary" v-on:click="() => this.$router.push('/strava')">Learn more about Strava</v-btn>
      <br>
    </v-layout>

    <div v-else style="min-width: 320px;">
      <v-layout row wrap>
        <strava-login style="margin-left: 30px;" dense v-bind:text="'Strava Login'"></strava-login>
        <v-btn flat color="primary" v-on:click="() => this.$router.push('/strava')">About<br>Strava</v-btn>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import StravaLogin from '../includes/StravaLogin'
  import apiMixin from '../../mixins/apiMixin'
  import {EventBus} from '@/eventBus'

  export default {
    name: 'LogIn',
    components: {StravaLogin},
    data: () => ({
      drawer: null,
      email: '',
      password: '',
      error: null,
    }),
    props: {
      source: String,
      csrfToken: String,
      user: Object,
      dense: Boolean
    },
    methods: {
      async login () {
        const formData = {
          _csrf: this.csrfToken,
          email: this.email,
          password: this.password
        }

        this.POST('login', formData, null, (data, err) => {
          if (!err) {
            EventBus.$emit('authorizeUser')
            EventBus.$emit('flash', {
              type: 'success',
              text: 'Welcome back, you are logged in'
            })
            this.$router.push('/dashboard')
            // EventBus.$emit('expandDrawer');
          }
        })
      }
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
