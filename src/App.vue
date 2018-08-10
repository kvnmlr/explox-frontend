<template>
  <v-app id="app">
    <app-header v-bind:user="user" v-on:logout="logout" v-on:authorizeUser="authorizeUser"></app-header>
    <v-content style="background-color: #FFFFFF">
      <v-card style="margin:30px">
        <v-container fill-height fill-width>
          <v-layout justify-center>
            <v-flex>
              <router-view v-bind:user="user" v-on:logout="logout" v-on:authorizeUser="authorizeUser"></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
  import Header from "./components/includes/Header"
  import Footer from "./components/includes/Footer"
  import axios from "axios"

  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer
    },
    data: () => ({
      csrfToken: '',
      user: undefined,
    }),
    created() {
      this.authorizeUser();
    },
    methods: {
      async logout() {
        axios.get('http://localhost:3000/logout')
          .then(response => {
            console.log(response);
            this.user = undefined;
            this.$router.push('/login');
          })
          .catch(error => {
            console.log(error.response.data.error);
          });
      },
      async authorizeUser() {
        axios.get('http://localhost:3000/authorize')
          .then(response => {
            console.log(response);
            this.user = response.data.user;
          })
          .catch(error => {
            console.log(error.response.data.error);
          });
      },
    }
  }
</script>
