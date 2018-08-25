<template>
  <div>
    <h1>Creator</h1>
    <v-container fluid style="min-height:500px;">
      <strava-alert v-if="user.provider !== 'strava'" style="height:400px;"></strava-alert>

      <div v-else>
        <v-layout row wrap>
          <v-flex xs12 sm6 style="padding-right:20px;">
            <h2><v-icon>gesture</v-icon>&nbsp;Generate New Route</h2>
            <br>
          </v-flex>
          <v-flex xs12 sm6 style="padding-left:20px;">
            <h2><v-icon>star</v-icon>&nbsp;Upload GPX File</h2>

          </v-flex>
        </v-layout>
      </div>
    </v-container>
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
          } else {
            // TODO
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
