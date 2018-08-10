<template>
  <h1>About</h1>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'About',
    created() {
      this.requestData();
    },
    methods: {
      async requestData() {
        axios.get('http://localhost:3000/about')
          .then(response => {
            const data = response.data;
            console.log(data.text);
          })
          .catch(error => {
            console.log(error.response.data.error);
        });
      }
    }
  }
</script>

<style scoped>

</style>
