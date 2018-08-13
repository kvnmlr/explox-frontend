<template>
  <v-app id="app">
    <!-- <v-alert style="position: fixed; z-index: 999; left:0; top:-5px; width: 100%; height: 65px;" :value="alertVisible" v-bind:type="alert.type"
             transition="slide-y-transition">
      {{alert.text}}
    </v-alert> -->
    <v-snackbar v-model="alertVisible" :timeout=3500 :bottom=true :color="alert.type">
      {{ alert.text }}
      <!--<v-btn color="white" flat @click="alertVisible = false">Close</v-btn>-->
    </v-snackbar>
    <app-header v-bind:user="user" v-on:logout="logout" v-on:authorizeUser="authorizeUser"></app-header>
    <v-content style="background-color: #FFFFFF">
      <v-container fill-height fill-width>
        <v-layout justify-center>
          <v-flex>
            <router-view v-bind:user="user" v-on:logout="logout" v-on:authorizeUser="authorizeUser"
                         v-on:flash="flash"></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
  import Header from "./components/layout/Header"
  import Footer from "./components/layout/Footer"
  import axios from "axios"

  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer
    },
    data: () => ({
      csrfToken: '',
      user: undefined,
      alert: {},
      alertVisible: false,
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
      flash(value) {
        this.alert = value;
        this.alertVisible = true;

        setTimeout(() => {this.alertVisible = false; console.log(this.alert)}, 2000);
      }
    }
  }
</script>
