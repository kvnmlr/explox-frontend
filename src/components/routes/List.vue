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
  import axios from 'axios'

  export default {
    name: "List",
    components: {
      route: Route,
    },
    data() {
      return {
        title: "Routes",
        search: '',
        routes: [],
      }
    },
    created() {
      this.requestData();
    },
    methods: {
      async requestData() {
        axios.get('http://localhost:3000/routes?segments=false&page=1')
          .then(response => {
            const data = response.data;
            console.log(data);
            this.routes = data.routes;
          })
          .catch(error => {
            console.log(error.body);
          });
      }
    },
    mixins: [routeSearchMixin]
  }


</script>

<style scoped>

</style>
