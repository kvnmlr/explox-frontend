<template>
  <div id="app">
    <div id="wrapper">
      <app-header></app-header>
      <div class="separator"></div>
      <container>
        <router-view/>
      </container>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import { Btn, Container } from 'mdbvue';
  import Footer from './components/includes/Footer.vue'
  import Header from './components/includes/Header.vue'

  export default {
    components: {
      Btn, Container,
      'app-header': Header,
      'app-footer': Footer
    },
    name: 'App'
  }
</script>

<style src="./assets/css/app.css"></style>

<style>
  .separator{
    height:20px;
  }
</style>
