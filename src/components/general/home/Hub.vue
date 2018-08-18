<template>
  <div>
    <h1>Hub</h1>
    <div v-if="!user">
      <br>
      <welcome ></welcome>
    </div>
    <br>
    <h2>Overview</h2>
    <QuickAccess></QuickAccess>
    <br>
    <h2>News</h2>
    <news></news>
  </div>
</template>

<script>
  import QuickAccess from "./QuickAccess";
  import axios from 'axios'
  import Welcome from "../Welcome";
  import News from "./News";

  export default {
    name: 'Hub',
    components: {News, Welcome, QuickAccess},
    data: () => ({}),
    props: {
      user: Object
    },
    created() {
      this.performSearch();
    },
    methods: {
      async performSearch() {
        axios.get('http://localhost:3000/hub')
          .then(response => {
            const data = response.data;
            console.log(data.text);
          })
          .catch(error => {
            console.log(error.body);
          });
      }
    }
  }
</script>

<style scoped>

</style>
