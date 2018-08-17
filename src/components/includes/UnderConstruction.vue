<template>
  <v-container grid-list-md>
    <v-layout>
      <v-flex xs12>
        <v-alert class="elevation-10 gradient-no-switch gradient-orange" light :value=true type="info" color="accent" transition="slide-y-transition">
          <v-layout row wrap>
            <v-flex sm12 md8>
              <p style="margin-top: 10px;"><b>We are currently working on this page.</b><br>This functionality is not available.
              </p>
            </v-flex>
            <v-flex sm12 md4>
              <v-btn class="gradient gradient-green" large round v-on:click="() => this.$router.push('/about')">
                <v-icon>info</v-icon>&nbsp;Learn More</v-btn>
            </v-flex>
          </v-layout>
        </v-alert>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
        name: "UnderConstruction"
    }
</script>

<style scoped>

</style>
