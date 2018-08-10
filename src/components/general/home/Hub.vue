<template>
  <div>
    <h1>Hub</h1>
    <h2>Quick Access</h2>
    <QuickAccess></QuickAccess>
  </div>
</template>

<script>
  import QuickAccess from "./QuickAccess";
  import axios from 'axios'

  export default {
    name: 'Hub',
    components: {QuickAccess},
    data: () => ({}),
    props: {
      user: Object
    },
    created() {
      this.requestData();
    },
    methods: {
      async requestData() {
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
