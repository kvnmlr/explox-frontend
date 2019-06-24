<template>
  <Footer class="font-small">
    <template>
      <v-footer style="z-index: 100; background-color: darkgray" class="pa-4">
        <img src="@/assets/img/strava/powered_white.png" alt="Powered by Strava" height="35px">
        <v-spacer></v-spacer>
        <router-link tag="a" to="dataprotection"><a style="color: white">Data protection</a></router-link>

        &nbsp;&nbsp;&nbsp;
        <router-link tag="a" to="about"><a style="color: white">Impressum</a></router-link>

        &nbsp;&nbsp;&nbsp;
        <div style="color: white">&copy; ExploX {{ new Date().getFullYear() }}</div>
      </v-footer>
    </template>
  </Footer>
</template>

<script>
  export default {
    components: {},
    name: 'app-footer'
  }
</script>

