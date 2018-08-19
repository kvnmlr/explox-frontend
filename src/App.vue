<template>
  <v-app id="app">
    <v-snackbar v-model="alertVisible" :timeout=3500 :bottom=true :color="alert.type">
      {{ alert.text }}
    </v-snackbar>
    <app-header v-bind:user="user" v-on:logout="logout" v-on:authorizeUser="authorizeUser"></app-header>
    <v-content style="background-color: #FFFFFF">
      <v-container fill-height fill-width>
        <v-layout justify-center>
          <v-flex>
            <router-view v-bind:user="user" v-on:logout="logout" v-on:authorizeUser="authorizeUser" v-on:flash="flash">
            </router-view>
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
  import Fullscreen from "./components/general/FullscreenRoute"
  import apiMixin from "./mixins/apiMixin";
  import {EventBus} from "./eventBus";

  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer,
      Fullscreen
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
        this.GET('logout', (data, err) => {
          if (!err) {
            this.user = undefined;
            this.flash({
              type: 'info',
              text: 'You are now logged out'
            });
            this.$router.push('/login');
          }
        });
      },
      async authorizeUser() {
        this.GET('authenticate', (data, err) => {
          if (!err) {
            this.user = data.user;
            EventBus.$emit('authenticated', this.user);
          }
        });
      },
      flash(value) {
        if (value) {
          this.alert = value;
          this.alertVisible = true;

          setTimeout(() => {
            this.alertVisible = false;
          }, 2000);
        }
      }
    },
    mixins: [apiMixin]
  }
</script>
