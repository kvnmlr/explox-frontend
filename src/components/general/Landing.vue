<template>
  <div>
    <welcome></welcome>
    <under-construction></under-construction>
  </div>
</template>

<script>
  import Welcome from './Welcome'
  import apiMixin from "../../mixins/apiMixin";
  import Explanation from "./Explanation";
  import { EventBus } from '@/eventBus.js';
  import UnderConstruction from "../includes/UnderConstruction";

  export default {
    name: 'Landing',
    components: {UnderConstruction, Explanation, Welcome,},
    created() {
      EventBus.$emit('expandDrawer');
      this.performSearch();
    },
    methods: {
      async performSearch() {
        this.GET('', (data, err) => {
          // TODO
        });
      }
    },
    mixins: [apiMixin]
  }
</script>

<style>
</style>
