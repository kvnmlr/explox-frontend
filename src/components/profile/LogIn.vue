<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6>
        <v-btn large color="primary" style="display: block; width: 80%; align: center;">Login with <br> Strava</v-btn>

      </v-flex>
      <br>
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
