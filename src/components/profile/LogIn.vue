<template>
  <div>
    <form action="http://localhost:3000/users/session" method="post" role="form" v-on:submit.prevent="login">
      <input type="hidden" name="_csrf" v-bind:value="csrfToken">

      Favorite color: <input type="text" name="favoriteColor">
      <button type="submit">Submit</button>
    </form>


    <v-layout row>
      <v-flex>
        <v-btn color="primary">Login with Strava</v-btn>

      </v-flex>
      <v-flex xs1>
        <v-divider vertical></v-divider>
      </v-flex>

      <v-flex>
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
          emulateJSON: true
        };
        this.$http.post('http://localhost:3000/login', formData, requestParams).then(response => {
          console.log(response);
          this.$emit('authorizeUser');
          this.$router.push('/user');
        }, error => {
          console.log(error.body);
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
