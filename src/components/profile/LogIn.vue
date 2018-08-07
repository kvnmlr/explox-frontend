<template>
  <div>
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
          <v-btn color="accent">Login</v-btn>
        </v-form>
      </v-flex>
    </v-layout>


  </div>
</template>

<script>
  export default {
    name: "LogIn",
    email: '',
    password: '',
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>

<style scoped>

</style>
