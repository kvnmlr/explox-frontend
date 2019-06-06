<template>
  <section>
    <h3>Ratings</h3>
    <br>
    <v-layout row wrap align-center>
      <v-flex xs12 md3>
        <h4>Route Type</h4><br>
        <p>General</p>
        <p>Explorative Route</p>
        <p>Conservative Route</p>
      </v-flex>
      <v-flex xs12 md3>
        <h4>E (rating)</h4><br>
        <p>{{ ratings(false, false)[0] }}</p>
        <p>{{ ratings(false, false)[1] }}</p>
        <p>{{ ratings(false, false)[2] }}</p>
      </v-flex>
      <v-flex xs12 md3>
        <h4>E (rating | user likes the type)</h4><br>
        <p>{{ ratings(true, true)[0] }}</p>
        <p>{{ ratings(true, true)[1] }}</p>
        <p>{{ ratings(true, true)[2] }}</p>
      </v-flex>
      <v-flex xs12 md3>
        <h4> E (rating | user dislikes the type)</h4><br>
        <p>{{ ratings(true, false)[0] }}</p>
        <p>{{ ratings(true, false)[1] }}</p>
        <p>{{ ratings(true, false)[2] }}</p>
      </v-flex>
    </v-layout>

    <div class="separator"></div>
    <h3>Creator Results</h3>
    <br>
    <v-data-table :headers="this.columns" :items="this.rows" :rows-per-page-items=[10,50,100,200]>
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
          <span>
                {{ props.header.text }}
              </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left"><br>
          <b>Preference:</b> {{ props.item.query.preference }}<br>
          <b>Distance:</b> {{ props.item.query.distance }} m <br>
          <b>Start:</b> ({{ props.item.query.start.lat.toString().substr(0,6) + ', ' +
          props.item.query.start.lng.toString().substr(0,6) }})<br>
          <b>End:</b> ({{ props.item.query.end.lat.toString().substr(0,6) + ', ' +
          props.item.query.end.lng.toString().substr(0,6) }})<br><br>
        </td>
        <td class="text-xs-left">{{ (props.item.user ? props.item.user.username : '') }}</td>
        <!--<td class="text-xs-left">{{ props.item.generatedRoutes }}</td>-->
        <td class="text-xs-left" v-if="props.item.routeRatings[0]"><br>
          <b>Route:</b> {{ props.item.routeRatings[0].route }}<br>
          <b>Rating:</b> {{ props.item.routeRatings[0].rating }} <br>
          <b>Comment:</b> {{ props.item.routeRatings[0].comment }}<br><br>
        </td>
        <td class="text-xs-left" v-if="props.item.routeRatings[1]"><br>
          <b>Route:</b> {{ props.item.routeRatings[1].route }}<br>
          <b>Rating:</b> {{ props.item.routeRatings[1].rating }} <br>
          <b>Comment:</b> {{ props.item.routeRatings[1].comment }}<br><br>
        </td>
        <td class="text-xs-left" v-if="props.item.routeRatings[2]"><br>
          <b>Route:</b> {{ props.item.routeRatings[2].route }}<br>
          <b>Rating:</b> {{ props.item.routeRatings[2].rating }} <br>
          <b>Comment:</b> {{ props.item.routeRatings[2].comment }}<br><br>
        </td>
        <td class="text-xs-left">{{ formatDate(props.item.createdAt, true) }}</td>
      </template>
    </v-data-table>
    <div class="separator"></div>
  </section>
</template>

<script>
  import {EventBus} from '@/eventBus.js'
  import formatDateMixin from '../../../mixins/formatDateMixin'

  export default {
    name: 'CreatorResults',
    props: {
      results: Array,
    },
    data () {
      return {
        currentTab: 'tab-api',
        columns: [
          {
            text: 'Query',
            value: 'query',
          },
          {
            text: 'User',
            value: 'user',
          },
          {
            text: 'Basic Route',
            value: 'basicRating',
          },
          {
            text: 'Explorative',
            value: 'explorativeRating',
          },
          {
            text: 'Conservative',
            value: 'conservativeRating',
          },
          {
            text: 'Created',
            value: 'createdAt',
          },
        ],
      }
    },
    computed: {
      rows () {
        let rows = []
        if (this.results.length > 0) {
          this.results.forEach(function (a) {
            rows.push(a)
          })
          return rows
        }
      },
    },
    methods: {
      ratings (conditional, positive) {
        let totalGeneralRatings = 0
        let totalGeneralRatingsSum = 0.0
        let totalExplorativeRatings = 0
        let totalExplorativeRatingsSum = 0.0
        let totalConservativeRatings = 0
        let totalConservativeRatingsSum = 0.0
        if (this.results.length > 0) {
          this.results.forEach(function (a) {
            if (!conditional) {
              if (a.routeRatings[0]) {
                totalGeneralRatings++
                totalGeneralRatingsSum += parseInt(a.routeRatings[0].rating)
              }
              if (a.routeRatings[1]) {
                totalExplorativeRatings++
                totalExplorativeRatingsSum += parseInt(a.routeRatings[1].rating)
              }
              if (a.routeRatings[2]) {
                totalConservativeRatings++
                totalConservativeRatingsSum += parseInt(a.routeRatings[2].rating)
              }
            }
            else {
              if (a.routeRatings[0]) {
                if (a.user.TODO && positive) {
                  totalGeneralRatings++
                  totalGeneralRatingsSum += a.routeRatings[0].rating
                } else if (a.user.ANTITODO && !positive) {
                  totalGeneralRatings++
                  totalGeneralRatingsSum += a.routeRatings[0].rating
                }
              }
              if (a.routeRatings[1]) {
                if (a.user.TODO && positive) {
                  totalExplorativeRatings++
                  totalExplorativeRatingsSum += a.routeRatings[1].rating
                } else if (a.user.ANTITODO && !positive) {
                  totalExplorativeRatings++
                  totalExplorativeRatingsSum += a.routeRatings[0].rating
                }
              }
              if (a.routeRatings[2]) {
                if (a.user.TODO && positive) {
                  totalConservativeRatings++
                  totalConservativeRatingsSum += a.routeRatings[2].rating
                } else if (a.user.ANTITODO && !positive) {
                  totalConservativeRatings++
                  totalConservativeRatingsSum += a.routeRatings[0].rating
                }
              }
            }
          })
        }

        let avgGeneralRating = 0.0
        let avgExplorativeRating = 0.0
        let avgConservativeRating = 0.0

        if (totalGeneralRatings > 0) {
          avgGeneralRating = totalGeneralRatingsSum / totalGeneralRatings
        }

        if (totalExplorativeRatings > 0) {
          avgExplorativeRating = totalExplorativeRatingsSum / totalExplorativeRatings
        }
        if (totalConservativeRatings > 0) {
          avgConservativeRating = totalConservativeRatingsSum / totalConservativeRatings
        }

        return [avgGeneralRating, avgExplorativeRating, avgConservativeRating]
      },
    },
    mixins: [formatDateMixin]
  }
</script>

<style scoped>

</style>
