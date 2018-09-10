<template>
  <section>
    <h3>Creator Results</h3>
    <v-data-table :headers="this.columns" :items="this.rows" :rows-per-page-items=[10,50,100,200]>
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
          <span>
                {{ props.header.text }}
              </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.query }}</td>
        <td class="text-xs-left">{{ (props.item.user ? props.item.user.username : '') }}</td>
        <td class="text-xs-left">{{ props.item.generatedRoutes }}</td>
        <td class="text-xs-left">{{ props.item.acceptedRoutes }}</td>
        <td class="text-xs-left">{{ formatDate(props.item.createdAt, true) }}</td>
      </template>
    </v-data-table>
    <div class="separator"></div>
  </section>
</template>

<script>
  import { EventBus } from '@/eventBus.js';
  import formatDateMixin from "../../../mixins/formatDateMixin";

  export default {
    name: "CreatorResults",
    props: {
      results: Array,
    },
    data() {
      return {
        currentTab: 'tab-api',
        columns: [
          {
            text: 'Query',
            value: 'query',
          },
          {
            text: 'User',
            value: 'user',
          },
          {
            text: 'Generated',
            value: 'generatedRoutes',

          },
          {
            text: 'Accepted',
            value: 'acceptedRoutes',
          },
          {
            text: 'Created',
            value: 'cratedAt',
          },
        ],
      };
    },
    computed: {
      rows() {
        let rows = [];
        if (this.results.length > 0) {
          this.results.forEach(function (a) {
            rows.push(a);
          });
          return rows;
        }
      }
    },
    mixins: [formatDateMixin]
  }
</script>

<style scoped>

</style>
