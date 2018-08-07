<template>
  <div>
    <h1>{{ title }}</h1>
    <input type="text" v-model="search" placeholder="search"/>
    <div class="separator"></div>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <route v-for="route in filteredRoutes" v-bind:route="route" :key="route.details"></route>
      </v-layout>
    </v-container>
    <div class="separator"></div>
  </div>
</template>

<script>
  import Route from './Route'
  import routeSearchMixin from "../../mixins/routeSearchMixin";

  export default {
    name: "List",
    components: {
      route: Route,
    },
    data() {
      return {
        title: "Routes",
        search: '',
        routes: [
          {name: 'Ryu', speciality: 'Vue Components', tags: ["running", "trail", "mountain"]},
          {name: 'Crystal', speciality: 'HTML Wizardry',},
          {name: 'Hitoshi', speciality: 'Click Events'},
          {name: 'Tango', speciality: 'Conditionals'},
          {name: 'Kami', speciality: 'Webpack'},
          {name: 'Yoshi', speciality: 'Data Diggin'}
        ],
      }
    },
    mixins: [routeSearchMixin]
  }


</script>

<style scoped>

</style>
