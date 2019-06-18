<template>
  <v-container fluid style="min-height:500px;">
    <strava-alert v-if="user.provider !== 'strava'" style="height:400px;"></strava-alert>
    <div v-else>
      <h2>
        <v-icon>add
        </v-icon>
        &nbsp;Generated Routes
      </h2>
      <v-layout row wrap v-if="user.creatorResults">
        <v-flex xs12 md12 style="padding-right:20px;">
          <br>
          <div v-for="(cr, i) in user.creatorResults.slice().sort((r1, r2) => {return r1.createdAt < r2.createdAt ? 1 :-1;})">
            <creator-result style="margin-bottom: 40px;" v-bind:creatorResult="cr"></creator-result>
          </div>
        </v-flex>
      </v-layout>
    </div>

  </v-container>
</template>

<script>
  import Route from '../../routes/Route'
  import formatDateMixin from '../../../mixins/formatDateMixin'
  import LoadingDialog from '../../includes/LoadingDialog'
  import apiMixin from '../../../mixins/apiMixin'
  import CreatorResult from '../../routes/CreatorResult'

  export default {
    name: 'GeneratedRoutes',
    components: {
      CreatorResult,
      LoadingDialog,
      Route
    },
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
    data () {
      return {
        stravaImportDialog: false,
        currentSelectedRoute: null,
        saveRouteDialog: false,
        ratingMapping: ['Not rated', 'You want to cycle this route soon', 'You would give this route a try', 'You would rather not cycle this route', 'You do not want to cycle this route',]
      }
    },
    methods: {
      saveRoute () {
        if (this.currentSelectedRoute === null) {
          return
        }
        this.saveRouteDialog = false
        this.stravaImportDialog = true
        this.GET('stravaimport?id=' + this.currentSelectedRoute._id + '&title=' + this.currentSelectedRoute.title + '&description=' + this.currentSelectedRoute.description, (data, err) => {
          if (!err) {
            let redirect = ''
            if (data.isActivity) {
              redirect = 'https://www.strava.com/activities/' + data.activityId + '/route'
            } else {
              redirect = 'https://www.strava.com/routes/' + data.activityId
            }
            console.log('Redirecting to ' + redirect)
            setTimeout(() => {
              this.stravaImportDialog = false
              window.location.href = redirect
            }, 5000)
          }
        })

      }
    },
    mixins: [formatDateMixin, apiMixin],

  }
</script>

<style scoped>

</style>
