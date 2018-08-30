<template>
  <div>
    <h1>About</h1>
    <under-construction></under-construction>
    <section>
      <v-layout column wrap class="my-5" align-center>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md6>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">flag</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Motivation & Goal</div>
                  </v-card-title>
                  <v-card-text>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra dictum condimentum.
                      Sed quis nisl laoreet diam molestie pharetra. Cras tempor sapien porttitor ligula finibus aliquet.
                      Sed tincidunt eros ac tellus bibendum, sit amet feugiat erat ultrices. Quisque semper nunc vel
                      ultricies mollis. Integer fermentum rhoncus ipsum, at iaculis magna ornare non. Quisque ac elit ut
                      nibh convallis posuere. Curabitur suscipit iaculis odio ac dictum.</p>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md6>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">group</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Field Study</div>
                  </v-card-title>
                  <v-card-text>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra dictum condimentum.
                      Sed quis
                      nisl laoreet diam molestie pharetra. Cras tempor sapien porttitor ligula finibus aliquet. Sed
                      tincidunt eros
                      ac tellus bibendum, sit amet feugiat erat ultrices. Quisque semper nunc vel ultricies mollis.
                      Integer
                      fermentum rhoncus ipsum, at iaculis magna ornare non. Quisque ac elit ut nibh convallis posuere.
                      Curabitur
                      suscipit iaculis odio ac dictum.</p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
            <br>
            <v-layout row wrap align-center>
              <v-flex xs12 md6>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">list</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Roadmap</div>
                  </v-card-title>
                  <v-card-text>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra dictum condimentum.
                      Sed quis
                      nisl laoreet diam molestie pharetra. Cras tempor sapien porttitor ligula finibus aliquet. Sed
                      tincidunt eros
                      ac tellus bibendum, sit amet feugiat erat ultrices. Quisque semper nunc vel ultricies mollis.
                      Integer
                      fermentum rhoncus ipsum, at iaculis magna ornare non. Quisque ac elit ut nibh convallis posuere.
                      Curabitur
                      suscipit iaculis odio ac dictum.</p>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md6>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="orange--text text--lighten-2">map</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Contact</div>
                  </v-card-title>
                  <v-card-text>
                    <p>Please use the
                      <router-link to="feedback">contact form</router-link>
                      to contact us. Make sure to leave your e-mail address so we can reply to your request.
                      We are always happy to receive your feedback!
                    </p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
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
