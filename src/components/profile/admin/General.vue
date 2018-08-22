<template>
  <div>
    <h2>General</h2>
    <div class="separator"></div>
    <h3>API Limits</h3>
    <b>Short Term</b>
    <p>{{limits.shortTermUsage}} out of {{limits.shortTermLimit}} ({{limits.shortTerm}}%)</p>
    <v-progress-linear class="gradient" :color="this.limits.shortTerm < 67 ? this.limits.shortTerm < 34 ? 'success' : 'warning' : 'error'" height="20" :value="this.limits.shortTerm"></v-progress-linear>
    <div class="separator"></div>
    <b>Long Term</b>
    <p>{{limits.longTermUsage}} out of {{limits.longTermLimit}} ({{limits.longTerm}}%)</p>
    <v-progress-linear class="gradient":color="this.limits.longTerm < 67 ? this.limits.longTerm < 34 ? 'success' : 'warning' : 'error'" height="20" :value="this.limits.longTerm"></v-progress-linear>
    <div class="separator"></div>
    <v-divider></v-divider>
    <div class="separator"></div>

    <h3>Feedback</h3>
    <v-container v-if="feedbacks.length > 0" fluid grid-list-md>
      <v-layout column wrap>
        <v-flex v-for="feedback in feedbacks" :key="feedback._id" d-flex xs12>
          <v-card class="gradient-no-switch gradient-green">
            <v-card-text>
              <v-layout row>
                <v-flex xs10>
                  {{ feedback.body }}
                </v-flex>
                <v-flex xs2>
                  <v-btn class="gradient gradient-orange" dark fab small style="float: right"
                         v-on:click="remove(feedback._id)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <p style="color: #ff6d00" v-if="!feedback.user">Sent on {{ feedback.createdAt }}, reply to {{
                feedback.email}}</p>
              <p style="color: #ff6d00" v-else>Sent on {{ formatDate(feedback.createdAt) }}
                by user {{feedback.user.name }}
                (reply to {{ feedback.email }})</p>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <p v-else>No feedback submitted</p>

  </div>

</template>

<script>
  import apiMixin from "../../../mixins/apiMixin";
  import formatDateMixin from "../../../mixins/formatDateMixin";
  import { EventBus } from '@/eventBus.js';

  export default {
    name: "Api",
    created() {
      EventBus.$on('adminFeedbacksReady', (data) => {
        this.feedbacks = data;
      });
      EventBus.$on('adminLimitsReady', (data) => {
        this.limits = Object.assign({}, data);
        this.limits.longTerm =  Math.floor(this.limits.longTermUsage * 100  / this.limits.longTermLimit);
        this.limits.shortTerm = Math.floor(this.limits.shortTermUsage * 100 / this.limits.shortTermLimit);
      });
    },
    data() {
      return {
        feedbacks: Array,
        limits: Object,
      }
    },
    methods: {
      async remove(id) {
        this.DELETE('feedback/' + id, (data, err) => {
          if (!err) {
            this.feedbacks.forEach((feedback, index) => {
              if (feedback._id === id) {
                this.feedbacks.splice(index, 1);
                this.$emit('flash', data.flash);
              }
            });
          }
        });
      }
    },
    mixins: [apiMixin, formatDateMixin]
  }
</script>

<style scoped>

</style>
