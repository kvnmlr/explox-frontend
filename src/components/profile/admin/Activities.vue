<template>
  <div>
    <h2>Activities</h2>
    <v-data-table :headers="columns" :items="rows" :rows-per-page-items=[10,50,100,200]>
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
        <td class="text-xs-left">{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.user.name }}</td>
        <td class="text-xs-left">{{ props.item.distance.toFixed(2) + ' m' }}</td>
        <td class="text-xs-left">{{ props.item.geo }}</td>
        <td class="text-xs-left">{{ formatDate(props.item.createdAt, true) }}</td>
      </template>
    </v-data-table>
    <div class="separator"></div>
  </div>
</template>

<script>
  import {EventBus} from '@/eventBus.js';
  import formatDateMixin from "../../../mixins/formatDateMixin";

  export default {
    name: "Activities",
    data() {
      return {
        currentTab: 'tab-api',
        activities: [],
        columns: [
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
    props: {},
    created() {
      EventBus.$on('adminActivitiesReady', (data) => {
        this.activities = data;
      });

    },
    computed: {
      rows() {
        let rows = [];
        if (this.activities.length > 0) {
          this.activities.forEach(function (a) {
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
