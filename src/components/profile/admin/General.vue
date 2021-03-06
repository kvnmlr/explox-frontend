<template>
  <div>
    <section>
      <h3>API Limits</h3>
      <div v-if="limits">
        <b>Short Term</b>
        <p>{{limits.shortTermUsage}} out of {{limits.shortTermLimit}} ({{shortTerm}}%)</p>
        <v-progress-linear class="gradient"
                           :color="this.shortTerm < 67 ? this.shortTerm < 34 ? 'success' : 'warning' : 'error'"
                           height="20" :value="this.shortTerm"></v-progress-linear>
        <div class="separator"></div>
        <b>Long Term</b>
        <p>{{limits.longTermUsage}} out of {{limits.longTermLimit}} ({{longTerm}}%)</p>
        <v-progress-linear class="gradient"
                           :color="this.longTerm < 67 ? this.longTerm < 34 ? 'success' : 'warning' : 'error'"
                           height="20" :value="this.longTerm"></v-progress-linear>
        <v-btn round :loading="task4loading" :disabled="task4loading" class="gradient gradient-green"
               @click="triggerUpdateLimits">
          Update API Limits
          <span slot="loader" class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
        </v-btn>
      </div>
    </section>
    <v-divider class="separator"></v-divider>
    <section>
      <h3>Study Progress</h3>
      <p><b>Total Registrations: </b>{{ questionnaireInfo.totalRegistrations }}</p>
      <p><b>Can Use Website: </b>{{ questionnaireInfo.canUseWebsite }}</p>
      <p><b>Eligible: </b>{{ questionnaireInfo.eligible }}</p>
      <p><b>Participants: </b>{{ questionnaireInfo.participants }}</p>
      <br>
      <p><b>Seen Activity Map: </b>{{ seenActivityMap() }} / {{ questionnaireInfo.participants }}</p>
      <p><b>Finished All Duties: </b>{{ finishedAllDuties() }} / {{ questionnaireInfo.participants }}</p>
      <p><b>Total Results Rated: </b>{{ totalResultsRated() }}</p>

      <v-btn round class="gradient gradient-orange" dark
             to="/admin/dashboard/questionnaire">
        Open Questionnaire Results
      </v-btn>
      <v-btn round class="gradient gradient-orange" dark
             to="/admin/dashboard/psq">
        Open PSQ Results
      </v-btn>
    </section>
    <v-divider class="separator"></v-divider>
    <section>
      <h3>Task Triggers</h3>
      <v-btn round :loading="task1loading" :disabled="task1loading" class="gradient gradient-orange" dark
             @click.native="triggerCoarseSegmentCrawler">
        Coarse Segment Crawler
        <span slot="loader" class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
      </v-btn>
      <v-btn round :loading="task2loading" :disabled="task2loading" class="gradient gradient-orange" dark
             @click="triggerFineSegmentCrawler">
        Fine Segment Crawler
        <span slot="loader" class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
      </v-btn>
      <v-btn round :loading="task3loading" :disabled="task3loading" class="gradient gradient-orange" dark
             @click="triggerUpdateUsers">
        Update Users
        <span slot="loader" class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
      </v-btn>
      <v-btn round :loading="task5loading" :disabled="task5loading" class="gradient gradient-orange" dark
             @click="triggerBackup">
        Make Database Backup
        <span slot="loader" class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
      </v-btn>
    </section>
    <v-divider class="separator"></v-divider>
    <section>
      <h3>Logs</h3>
      <v-dialog v-model="applicationLogDialog" width="80%">
        <v-btn slot="activator" class="gradient gradient-green" round v-on:click="getLogs">Show Application Logs</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Application Logs</span>
          </v-card-title>
          <v-card-text>
            <div v-for="log in applicationLogs">{{ log }}</div>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="errorLogDialog" width="600px">
        <v-btn slot="activator" class="gradient gradient-green" round v-on:click="getLogs">Show Error Logs</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Error Logs</span>
          </v-card-title>
          <v-card-text>
            <div v-for="log in errorLogs">{{ log }}</div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </section>
    <v-divider class="separator"></v-divider>
    <section>
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
              <v-card-actions style="margin-top: -30px;">
                <p style="color: #ff6d00" v-if="!feedback.user">Sent on {{ feedback.createdAt }}, reply to {{
                  feedback.email}}</p>
                <p style="color: #ff6d00" v-else>Sent on {{ formatDate(feedback.createdAt) }}
                  by user {{feedback.user.username }}
                  (reply to {{ feedback.email }})</p>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <p v-else>No feedback submitted</p>
    </section>
    <v-divider class="separator"></v-divider>
    <section>
      <h3>Invitations</h3>
      <v-container v-if="invitations.length > 0" fluid grid-list-md>
        <v-layout column wrap>
          <v-flex v-for="invitation in invitations" :key="invitation._id" d-flex xs12>
            <v-card class="gradient-no-switch gradient-green">
              <v-card-text style="margin-bottom: -20px;">
                <p>
                  <v-chip v-if="invitation.accepted" color="green" text-color="white">Accepted</v-chip>
                  <v-chip small v-else color="red" text-color="white">Not Accepted</v-chip>
                  <b>Invitation on </b>{{formatDate(invitation.createdAt)}}
                  <b>From: </b>
                  <router-link v-if="invitation.user" :to="{path: '/users/' + invitation.user._id}">
                    {{invitation.user.username}}
                  </router-link>
                  <b>To:</b>
                  <router-link v-if="invitation.receiverUser"
                               :to="{path: '/users/' + ((invitation.receiverUser) ? invitation.receiverUser._id : '')}">
                    {{invitation.email}} ({{invitation.receiver}})
                  </router-link>
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <p v-else>No feedback submitted</p>
    </section>
  </div>
</template>

<script>
  import apiMixin from '../../../mixins/apiMixin'
  import formatDateMixin from '../../../mixins/formatDateMixin'
  import {EventBus} from '@/eventBus.js'

  export default {
    name: 'Api',
    created () {
      this.getLogs()
    },
    data () {
      return {
        loader: null,
        task1loading: false,
        task2loading: false,
        task3loading: false,
        task4loading: false,
        task5loading: false,
        applicationLogDialog: false,
        errorLogDialog: false,
        applicationLogs: 'No application logs available',
        errorLogs: 'No error logs available',
      }
    },
    props: {
      results: Array,
      users: Array,
      invitations: Array,
      feedbacks: Array,
      limits: Object,
      questionnaireInfo: Object,
    },
    methods: {
      seenActivityMap () {
        if (!this.users || this.users.length === 0) {
          return 0
        }
        let n = 0
        this.users.forEach((user) => {
          if (user.questionnaireInfo) {
            if (user.questionnaireInfo.participates && user.visitedActivityMap) {
              n++
            }
          }
        })
        return n
      },

      finishedAllDuties () {
        if (!this.users || this.users.length === 0) {
          return 0
        }
        let n = 0
        this.users.filter((user) => {
          return user.questionnaireInfo && user.questionnaireInfo.participates
        }).forEach((user) => {
          if (user.visitedActivityMap) {
            if (this.numCompletedRouteRatingsForUser(user) >= 15) {
              n++
            }
          }
        })
        return n
      },

      totalResultsRated () {
        if (!this.users || this.users.length === 0) {
          return 0
        }
        let n = 0
        this.users.filter((user) => {
          return user.questionnaireInfo && user.questionnaireInfo.participates
        }).forEach((user) => {
          if (user.creatorResults) {
            n += this. numCompletedRouteRatingsForUser(user);
          }
        })
        return n
      },

      numCompletedRouteRatingsForUser(user) {
        return user.creatorResults.filter((res) => {
          if (!res.routeRatings) {
            return false
          }
          return res.routeRatings.length === 2
            && (res.routeRatings[0].rating !== 0 && res.routeRatings[1].rating !== 0)
            && (res.routeRatings[0].comment !== '' && res.routeRatings[1].comment !== '')
        }).length;
      },

      async getLogs () {
        this.GET('logs', (data, err) => {
          console.log(data)
          this.applicationLogs = data.application
          this.errorLogs = data.errors
        })
      },
      async remove (id) {
        this.DELETE('feedback/' + id, (data, err) => {
          if (!err) {
            this.feedbacks.forEach((feedback, index) => {
              if (feedback._id === id) {
                this.feedbacks.splice(index, 1)
                this.$emit('flash', data.flash)
              }
            })
          }
        })
      },
      async triggerCoarseSegmentCrawler () {
        this.task1loading = true
        this.GET('triggers/crawler?detailed=false', (data, err) => {
          this.task1loading = null
          if (!err) {
          }
        })
      },
      async triggerFineSegmentCrawler () {
        this.task2loading = true
        this.GET('triggers/crawler?detailed=true', (data, err) => {
          this.task2loading = null
          if (!err) {

          }
        })
      },
      async triggerUpdateUsers () {
        this.task3loading = true
        this.GET('triggers/users', (data, err) => {
          this.task3loading = null
          if (!err) {

          }
        })
      },
      async triggerUpdateLimits () {
        this.task4loading = true
        this.GET('triggers/limits', (data, err) => {
          this.task4loading = null
          if (!err) {

          }
        })
      },
      async triggerBackup () {
        this.task5loading = true
        this.GET('triggers/backup', (data, err) => {
          this.task5loading = null
          if (!err) {

          }
        })
      },
    },
    computed: {
      shortTerm () {
        if (this.limits) {
          return Math.floor(this.limits.shortTermUsage * 100 / this.limits.shortTermLimit)
        }
      },
      longTerm () {
        if (this.limits) {
          return Math.floor(this.limits.longTermUsage * 100 / this.limits.longTermLimit)

        }
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
      }
    },
    mixins: [apiMixin, formatDateMixin]
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
