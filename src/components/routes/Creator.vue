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
      async requestData() {
        this.GET('creator', (data, err) => {
          if (err) {
            if (!this.user) {
              this.$router.push('/login');
              this.$emit('flash', err.flash);
            }
          } else {
            // TODO
          }
        });
      }
    },
    beforeMount() {
      this.requestData();
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
