<template>
  <div>
    <h1>About</h1>
    <under-construction></under-construction>
  </div>

</template>

<script>
  import UnderConstruction from "../includes/UnderConstruction";
  import apiMixin from "../../mixins/apiMixin";

  export default {
    name: 'About',
    components: {UnderConstruction},
    created() {
      this.performSearch();
    },
    methods: {
      async performSearch() {
        this.GET('about', (data, err) => {
          // TODO
        });
      }
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
