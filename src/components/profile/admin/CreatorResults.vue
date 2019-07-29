<template>
  <section>
    <v-checkbox v-model="allResults" label="Use incomplete ratings"></v-checkbox>
    <br>
    <h3>Ratings</h3>
    <br>
    <v-layout row wrap align-center>
      <v-flex xs12 md3>
        <h4>Route Type</h4><br>
        <p>Explorative</p>
        <p>Familair</p>
      </v-flex>
      <v-flex xs12 md3>
        <h4>E (rating)</h4><br>
        <p>{{ ratings(false, false)[0] }} ({{ ratings(false, false)[2] }})</p>
        <p>{{ ratings(false, false)[1] }} ({{ ratings(false, false)[3] }})</p>
      </v-flex>
      <v-flex xs12 md3>
        <h4>E (rating | user likes the type)</h4><br>
        <p>{{ ratings(true, true)[0] }} ({{ ratings(true, true)[2] }})</p>
        <p>{{ ratings(true, true)[1] }} ({{ ratings(true, true)[3] }})</p>
      </v-flex>
      <v-flex xs12 md3>
        <h4> E (rating | user dislikes the type)</h4><br>
        <p>{{ ratings(true, false)[0] }} ({{ ratings(true, false)[2] }})</p>
        <p>{{ ratings(true, false)[1] }} ({{ ratings(true, false)[3] }})</p>
      </v-flex>
    </v-layout>

    <br>
    <h3>Algorithm Metrics</h3>
    <br>
    <v-layout v-for="metric in metrics()" row wrap align-center>
      <v-flex xs12 md3>
        <h4>Metric</h4><br>
        <p>Average tracks after distance filter: </p>
        <p>Average tracks after lower bounds filter: </p>
        <p>Average combos found: </p>
        <p>Average parts in combos: </p>
        <p>Average familiarity scores: </p>
        <p>Average total runtime: </p>
      </v-flex>
      <v-flex xs12 md3>
        <h4>Explorative</h4><br>
        <p>{{ metric.distance[0] }}</p>
        <p>{{ metric.lower[0] }}</p>
        <p>{{ metric.combos[0] }}</p>
        <p>{{ metric.parts[0] }}</p>
        <p>{{ metric.scores[0] }}</p>
        <p>{{ metric.runtime }}</p>

      </v-flex>
      <v-flex xs12 md3>
        <h4>Familiar</h4><br>
        <p>{{ metric.distance[1] }}</p>
        <p>{{ metric.lower[1] }}</p>
        <p>{{ metric.combos[1] }}</p>
        <p>{{ metric.parts[1] }}</p>
        <p>{{ metric.scores[1] }}</p>
        <p>{{ metric.runtime }}</p>

      </v-flex>
    </v-layout>


    <br>

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
          <b>Preference:</b> {{ props.item.query.tags }}<br>
          <b>Distance:</b> {{ props.item.query.distance }} m <br>
          <b>Start:</b> ({{ props.item.query.start.lat.toString().substr(0,6) + ', ' +
          props.item.query.start.lng.toString().substr(0,6) }})<br>
          <b>End:</b> ({{ props.item.query.end.lat.toString().substr(0,6) + ', ' +
          props.item.query.end.lng.toString().substr(0,6) }})<br><br>
        </td>
        <td class="text-xs-left"><a :href="'/explox/users/'+props.item.user._id">{{ (props.item.user ?
          props.item.user.username : '') }}</a></td>
        <!--<td class="text-xs-left">{{ props.item.generatedRoutes }}</td>-->
        <td class="text-xs-left" v-if="props.item.routeRatings[0]"><br>
          <a :href="'/explox/route/'+props.item.routeRatings[0].route"> Go to Route</a><br>
          <b>Familiarity:</b> {{ Math.floor(props.item.familiarityScores[0] * 100) }} %<br><br>

          <b>Rating:</b> {{ props.item.routeRatings[0].rating }} <br>
          <b>Comment:</b> {{ props.item.routeRatings[0].comment }}<br><br>

        </td>
        <td class="text-xs-left" v-if="props.item.routeRatings[1]"><br>
          <a :href="'/explox/route/'+props.item.routeRatings[1].route"> Go to Route</a><br>
          <b>Comment:</b> {{ Math.floor(props.item.familiarityScores[1] * 100) }} %<br><br>

          <b>Rating:</b> {{ props.item.routeRatings[1].rating }} <br>
          <b>Comment:</b> {{ props.item.routeRatings[1].comment }}<br><br>
        </td>
        <td class="text-xs-left">{{ formatDate(props.item.createdAt, true) }}</td>
        <td class="text-xs-left"><br>
          <b>Distance:</b> {{ props.item.query.metadata.distanceFilter }}<br>
          <b>Lower Bound:</b> {{ props.item.query.metadata.lowerBoundsFilter }}<br>
          <b>Combine:</b> {{ props.item.query.metadata.combine }}<br>
          <b>Time:</b> {{ Math.round(props.item.query.metadata.totalTime / 1000) }} s<br>
        </td>
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
        allResults: true,
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
            text: 'Explorative',
            value: 'explorativeRating',
          },
          {
            text: 'Familiar',
            value: 'familiarRating',
          },
          {
            text: 'Created',
            value: 'createdAt',
          },
          {
            text: 'Metadata',
            value: 'metadata',
          },
        ],
      }
    },
    computed: {
      rows () {
        let self = this
        let rows = []
        if (this.results.length > 0) {
          this.results.forEach(function (a) {
            if (!self.allResults) {
              let isCompleted = true
              a.routeRatings.forEach((rating) => {
                if (rating.rating === 0) {
                  isCompleted = false
                }
                if (rating.comment === '') {
                  isCompleted = false
                }
              })
              if (isCompleted) {
                rows.push(a)
              }

            } else {
              rows.push(a)
            }
          })
          return rows
        }
      },
    },
    methods: {
      metrics () {
        let num = 0
        let ret = {
          distance: [0, 0],
          lower: [0, 0],
          combos: [0, 0],
          parts: [0, 0],
          scores: [0, 0],
          runtime: 0,
        }

        if (this.results.length > 0) {
          this.results.forEach(function (a) {
            const metadata = a.query.metadata
            console.log(a)
            ret.distance[0] += (metadata.distanceFilter[0] + metadata.distanceFilter[1])
            ret.distance[1] += (metadata.distanceFilter[1] + metadata.distanceFilter[2])

            ret.lower[0] += (metadata.lowerBoundsFilter[0] + metadata.lowerBoundsFilter[1])
            ret.lower[1] += (metadata.lowerBoundsFilter[1] + metadata.lowerBoundsFilter[2])

            ret.combos[0] += metadata.combine[0]
            ret.combos[1] += metadata.combine[1]

            ret.parts[0] += Math.round(metadata.combine[2])
            ret.parts[1] += Math.round(metadata.combine[3])

            ret.scores[0] += Math.round(a.familiarityScores[0] * 100)
            ret.scores[1] += Math.round(a.familiarityScores[1] * 100)

            if (metadata.totalTime || metadata.totalTime === 'NaN') {
              ret.runtime += Math.round(metadata.totalTime / 1000)
            } else {
              ret.runtime += ret.runtime /= num
            }
            num += 1
          })
        }
        ret.distance[0] /= num
        ret.distance[1] /= num

        ret.lower[0] /= num
        ret.lower[1] /= num

        ret.combos[0] /= num
        ret.combos[1] /= num

        ret.parts[0] /= num
        ret.parts[1] /= num

        ret.scores[0] /= num
        ret.scores[1] /= num

        ret.runtime /= num

        return [ret]
      },

      ratings (conditional, positive) {

        let self = this
        let totalExplRatings = 0
        let totalExplRatingsSum = 0.0
        let totalFamRatings = 0
        let totalFamRatingsSum = 0.0
        if (this.results.length > 0) {
          this.results.forEach(function (a) {
            if (!self.allResults) {
              let isCompleted = true
              a.routeRatings.forEach((rating) => {
                if (rating.rating === 0) {
                  isCompleted = false
                }
                if (rating.comment === '') {
                  isCompleted = false
                }
              })
              if (!isCompleted) {
                return
              }
            }

            console.log(a)

            if (!a.user || !a.user.routePlanning) {
              return
            }

            if (!conditional) {
              if (a.routeRatings[0] && a.routeRatings[0].rating > 0) {
                totalExplRatings++
                totalExplRatingsSum += parseInt(a.routeRatings[0].rating)
              }
              if (a.routeRatings[1] && a.routeRatings[1].rating > 0) {
                totalFamRatings++
                totalFamRatingsSum += parseInt(a.routeRatings[1].rating)
              }
            }
            else {
              if (a.routeRatings[0] && a.routeRatings[0].rating > 0) {
                // Explorative route
                if (a.user.routePlanning.q7 > 3 && positive) {
                  // Explorative preference
                  totalExplRatings++
                  totalExplRatingsSum += parseInt(a.routeRatings[0].rating)
                } else if (a.user.routePlanning.q7 <= 3 && !positive) {
                  // Familiar preference and negative weight
                  totalExplRatings++
                  totalExplRatingsSum += parseInt(a.routeRatings[0].rating)
                }
              }
              if (a.routeRatings[1] && a.routeRatings[1].rating > 0) {
                // Familiar route
                if (a.user.routePlanning.q7 <= 3 && positive) {
                  // Familiar preference
                  totalFamRatings++
                  totalFamRatingsSum += parseInt(a.routeRatings[1].rating)
                } else if (a.user.routePlanning.q7 > 3 && !positive) {
                  // Explorative preference and negative weight
                  totalFamRatings++
                  totalFamRatingsSum += parseInt(a.routeRatings[1].rating)
                }
              }
            }
          })
        }

        let avgExplorativeRating = 0.0
        let avgFamiliarRating = 0.0

        if (totalExplRatings > 0) {
          avgExplorativeRating = (totalExplRatingsSum / totalExplRatings).toFixed(2)
        }

        if (totalFamRatings > 0) {
          avgFamiliarRating = (totalFamRatingsSum / totalFamRatings).toFixed(2)
        }
        return [avgExplorativeRating, avgFamiliarRating, totalExplRatings, totalFamRatings]
      },
    },
    mixins: [formatDateMixin]
  }
</script>

<style scoped>

</style>
