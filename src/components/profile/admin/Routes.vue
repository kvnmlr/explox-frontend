<template>
  <section>
    <h3>Routes</h3>
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
        <td class="text-xs-left">{{ props.item.isGenerated }}</td>
        <td class="text-xs-left"><router-link :to="{path: '/route/' + props.item._id}">{{ props.item.title }}</router-link></td>
        <td class="text-xs-left"><router-link :to="{path: '/users/' + props.item.user._id}">{{ props.item.user.username.toString() }}</router-link></td>
        <td class="text-xs-left">{{ props.item.distance.toFixed(2) + ' m' }}</td>
        <td class="text-xs-left">{{ props.item.geo }}</td>
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
    name: "Routes",
    props: {
      routes: Array,
    },
    data() {
      return {
        currentTab: 'tab-api',
        columns: [
          {
            text: 'Generated',
            value: 'generated',
          },
          {
            text: 'Title',
            value: 'title',
          },
          {
            text: 'User',
            value: 'user',
          },
          {
            text: 'Distance',
            value: 'distance',

          },
          {
            text: 'Coords',
            value: 'coordinates',
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
        if (this.routes.length > 0) {
          this.routes.forEach(function (a) {
            if (a.geo) {
              a.geo = a.geo.length;
            }
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
