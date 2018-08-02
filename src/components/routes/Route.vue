<template>
  <div>
    <card>
      <card-body>
        <card-title>
          <router-link :to="{path: '/route/' + route.name}">
            {{ route.name }}
          </router-link>
        </card-title>
        <card-text>{{ route.speciality }}</card-text>
        <span>
          by
          <a href="/">Kevin</a>
        </span>
        <span>
          <row v-for="tag in route.tags" v-bind:key="tag">
            <badge tag="a" href="#" color="orange darken-1">{{ tag }}</badge>
            &nbsp;
          </row>
        </span>
      </card-body>
    </card>
  </div>
</template>

<script>
  import {Btn, Card, CardBody, CardText, CardTitle, Badge} from 'mdbvue'

  export default {
    components: {
      Btn, Card, CardBody, CardTitle, CardText, Badge
    },
    props: {
      route: {
        type: Object,
        required: true,
      }
    },
    name: 'Route'
  }
</script>

<style scoped>
</style>
