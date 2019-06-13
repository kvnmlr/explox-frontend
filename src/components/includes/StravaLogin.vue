<template>
  <div>
    <!--<v-btn large v-on:click="loginStrava" class="gradient gradient-orange" round dark
           style="display: block; width: 90%; text-align: center; margin-bottom: 20px" :disabled="loadingDialog"
           :loading="loadingDialog">
      <v-icon>device_hub</v-icon>&nbsp;{{ text }}

    </v-btn>-->
    <a v-if="dense">
      <img
        src="@/assets/img/strava/connect.png" alt="Connect with Strava"
        v-on:click="loginStrava"
        :disabled="loadingDialog"
        :loading="loadingDialog">
    </a>
    <a v-else>
      <img
        src="@/assets/img/strava/connect_large.png" alt="Connect with Strava"
        v-on:click="loginStrava"
        :disabled="loadingDialog"
        :loading="loadingDialog">
    </a>

    <loading-dialog :show="loadingDialog" body="Your activities are being updated"
                    header="Login ..."
                    :width="500">
    </loading-dialog>
  </div>
</template>

<script>
  import LoadingDialog from './LoadingDialog'

  export default {
    name: 'StravaLogin',
    components: {LoadingDialog},
    props: {
      text: {
        type: String,
        required: true
      },
      dense: {
        type: Boolean,
        required: false
      }
    },
    data () {
      return {
        loadingDialog: false,
      }
    },
    methods: {
      async loginStrava () {
        this.loadingDialog = true
        window.location.href = process.env.API_ROOT + 'auth/strava'
      },
    }
  }
</script>

<style scoped>

</style>
