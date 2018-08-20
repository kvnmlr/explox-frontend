<template>
  <div>
    <div v-if="$vuetify.breakpoint.lgAndUp && !dense">
      <h1>Login</h1>
      <br>
    </div>
    <v-layout row wrap>
      <v-flex xs12 sm5 md5>
        <strava-login v-bind:text="'Strava Login'"></strava-login>
        <v-btn outline color="primary" round v-on:click="() => this.$router.push('/strava')">Learn More</v-btn>
      </v-flex>
      <br><br><br>
      <v-flex v-if="$vuetify.breakpoint.mdAndUp" xs0 sm1 md1>
        <v-divider vertical></v-divider>
      </v-flex>
      <v-flex v-else xs12>
        <div class="separator"></div>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-form>
          <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email"></v-text-field>
          <v-text-field prepend-icon="lock" name="password" label="Password" type="password"
                        v-model="password"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="gradient gradient-orange" round dark v-on:click.prevent="login">Login</v-btn>
        </v-form>
      </v-flex>
    </v-layout>


  </div>
</template>

<script>
  import StravaLogin from "../includes/StravaLogin";
  import apiMixin from "../../mixins/apiMixin";
  import {EventBus} from "@/eventBus";

  export default {
    name: "LogIn",
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
      async loginStrava() {
        window.location.href = 'http://localhost:3000/auth/strava';
      },

      async login() {
        const formData = {
          _csrf: this.csrfToken,
          email: (this.email).toLowerCase(),
          password: this.password
        };

        this.POST('login', formData, null, (data, err) => {
          if (!err) {
            this.$emit('authorizeUser');
            this.$emit('flash', {
              type: 'success',
              text: 'Welcome back, you are logged in'
            });
            this.$router.push('/dashboard');
          }
        });
      }
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
