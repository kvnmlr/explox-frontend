<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm5 md5>
        <v-btn large v-on:click="loginStrava" color="primary" style="display: block; width: 95%; text-align: center; margin-bottom: 20px">
          Strava Login
        </v-btn>
      </v-flex>
      <br><br><br>
      <v-flex xs0 sm1 md1>
        <v-divider vertical></v-divider>
      </v-flex>
      <v-flex xs12 sm6 md6>
        <v-form>
          <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email"></v-text-field>
          <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"
                        v-model="password"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="accent" v-on:click.prevent="login">Login</v-btn>
        </v-form>
      </v-flex>
    </v-layout>


  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "LogIn",
    data: () => ({
      drawer: null,
      email: '',
      password: '',
      error: null,
    }),
    props: {
      source: String,
      csrfToken: String,
      user: Object
    },
    methods: {
      async loginStrava() {
        window.location.href = 'http://localhost:3000/auth/strava';
        return;

        axios.get('https://www.strava.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fstrava%2Fcallback&client_id=21869', {
          headers: {
            'Access-Control-Allow-Origin': '*',
          }})
          .then(response => {
            console.log('Data');
            console.log(response);
          })
          .catch(error => {
            console.log(error);
            console.log(error.response.data.error);
          })
      },

      async login() {
        const formData = {
          _csrf: this.csrfToken,
          email: (this.email).toLowerCase(),
          password: this.password
        };
        const requestParams = {
          method: 'POST',
          responseType: 'text',
        };
        axios.post('http://localhost:3000/login', formData, requestParams)
          .then(response => {
            console.log(response);
            this.$emit('authorizeUser');
            this.$router.push('/dashboard');
          })
          .catch(error => {
            console.log(error.response.data.error);
          });
      }
    },
    created() {
      console.log('created');
      console.log(this.$cookies.keys());
      console.log(this.$cookies.get('_csrf'));
    }
  }
</script>

<style scoped>

</style>
