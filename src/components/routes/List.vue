<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-for="route in routes">
      <route v-bind:route="route"></route>
      <div class="separator"></div>
    </div>
  </div>
</template>

<script>
  import Route from './Route'

  export default {
    name: "List",
    components: {
      route: Route
    },
    data() {
      return {
        title: "List",
        routes: [
          {name: 'Ryu', speciality: 'Vue Components', tags: ["running","trail","mountain"]},
          {name: 'Crystal', speciality: 'HTML Wizardry',},
          {name: 'Hitoshi', speciality: 'Click Events'},
          {name: 'Tango', speciality: 'Conditionals'},
          {name: 'Kami', speciality: 'Webpack'},
          {name: 'Yoshi', speciality: 'Data Diggin'}
        ],
      }
    },
  }


</script>

<style scoped>

</style>
