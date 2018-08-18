<template>
  <div>
    <welcome></welcome>
    <v-container align baseline grid-list-md text-xs-cente>
    </v-container>
    <explanation></explanation>
  </div>
</template>

<script>
  import Welcome from './Welcome'
  import apiMixin from "../../mixins/apiMixin";
  import Explanation from "./Explanation";

  export default {
    name: 'Landing',
    components: {Explanation, Welcome,},
    created() {
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
