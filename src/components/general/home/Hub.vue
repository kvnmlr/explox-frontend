<template>
  <div>
    <h1>Hub</h1>
    <h2>Quick Access</h2>
    <QuickAccess></QuickAccess>
  </div>
</template>

<script>
  import QuickAccess from "./QuickAccess";
  export default {
    name: 'Hub',
    components: {QuickAccess},
    data: () => ({
    }),
    props: {
      user: Object
    },
    created() {
      this.requestData();
    },
    methods: {
      async requestData() {
        this.$http.get('http://localhost:3000/hub').then(response => {
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
