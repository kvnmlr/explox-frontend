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
        routes: [],
      }
    },
    created() {
      this.requestData();
    },
    methods: {
      async requestData() {
        this.$http.get('http://localhost:3000/routes?segments=false&page=1').then(response => {
          const data = response.body;
          console.log(data);
          this.routes = data.routes;
        }, error => {
          console.log(error.body);
        });
      }
    },
    mixins: [routeSearchMixin]
  }


</script>

<style scoped>

</style>
