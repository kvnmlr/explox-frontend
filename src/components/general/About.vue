<template>
  <div>
    <h1>About</h1>
    <under-construction></under-construction>
    <v-card class="elevation-0" style="padding: 10px;">
      <v-layout row wrap style="margin:30px;">
        <v-flex xs12 sm6 md6>
          <h2>Motivation & Goal</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra dictum condimentum. Sed quis nisl laoreet diam molestie pharetra. Cras tempor sapien porttitor ligula finibus aliquet. Sed tincidunt eros ac tellus bibendum, sit amet feugiat erat ultrices. Quisque semper nunc vel ultricies mollis. Integer fermentum rhoncus ipsum, at iaculis magna ornare non. Quisque ac elit ut nibh convallis posuere. Curabitur suscipit iaculis odio ac dictum.</p>
          <h2>Field Study</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra dictum condimentum. Sed quis nisl laoreet diam molestie pharetra. Cras tempor sapien porttitor ligula finibus aliquet. Sed tincidunt eros ac tellus bibendum, sit amet feugiat erat ultrices. Quisque semper nunc vel ultricies mollis. Integer fermentum rhoncus ipsum, at iaculis magna ornare non. Quisque ac elit ut nibh convallis posuere. Curabitur suscipit iaculis odio ac dictum.</p>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-container>
            <img style="width:100%;" src="@/assets/img/home-banner.jpg" class="elevation-5">
          </v-container>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <h2>Roadmap</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra dictum condimentum. Sed quis nisl laoreet diam molestie pharetra. Cras tempor sapien porttitor ligula finibus aliquet. Sed tincidunt eros ac tellus bibendum, sit amet feugiat erat ultrices. Quisque semper nunc vel ultricies mollis. Integer fermentum rhoncus ipsum, at iaculis magna ornare non. Quisque ac elit ut nibh convallis posuere. Curabitur suscipit iaculis odio ac dictum.</p>
          <h2>Contact</h2>
          <p>Please use the <router-link to="feedback">Send Feedback</router-link> form to contact us. Make sure to leave your e-mail address so we can reply to your request.</p>
        </v-flex>
      </v-layout>
    </v-card>
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
