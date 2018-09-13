<template>
  <div>
    <h1>Creator</h1>
    <under-construction></under-construction>
  </div>
</template>

<script>
  import UnderConstruction from "../includes/UnderConstruction";
  import apiMixin from "../../mixins/apiMixin";

  export default {
    name: "Creator",
    components: {UnderConstruction},
    props: {
      user: Object
    },
    methods: {
      async performSearch() {
        this.GET('creator', (data, err) => {
          if (err) {
            if (!this.user) {
              this.$router.push('/login');
              this.$emit('flash', err.flash);
            }
          }
        });
      }
    },
    beforeMount() {
      this.performSearch();
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
