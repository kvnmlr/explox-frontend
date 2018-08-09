<template>
  <h1>About</h1>
</template>

<script>
  export default {
    name: 'About',
    created() {
      this.requestData();
    },
    methods: {
      async requestData() {
        this.$http.get('http://localhost:3000/about').then(response => {
          const data = response.body;
          console.log(data.text);
        }, error => {
          console.log(error.body);
        });
      }
    }
  }
</script>

<style scoped>

</style>
