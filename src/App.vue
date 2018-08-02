<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import { Btn } from 'mdbvue';
  import Footer from './components/includes/Footer.vue'
  import Header from './components/includes/Header.vue'

  export default {
    components: {
      Btn,
      'app-header': Header,
      'app-footer': Footer
    },
    name: 'App'
  }
</script>

<style src="./assets/css/app.css"></style>

<style scoped>
</style>
