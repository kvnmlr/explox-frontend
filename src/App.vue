<template>
  <v-app id="app">
    <app-header></app-header>
    <v-content style="background-color: #FFFFFF">
      <v-card style="margin:30px">
        <v-container fill-height fill-width>
          <v-layout justify-center>
            <v-flex>
              <router-view></router-view>
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

  export default {
    components: {
      'app-header': Header,
      'app-footer': Footer
    }

  }
</script>
