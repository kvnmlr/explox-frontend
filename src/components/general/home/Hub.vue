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
  import apiMixin from "../../../mixins/apiMixin";

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
        this.GET('hub', (data, err) => {
          if (!err) {
          }
        });
      }
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
