<template>
  <div>
    <h2>Users</h2>
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
        <td>{{ props.item.username }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.provider }}</td>
        <td class="text-xs-left">{{ props.item.role }}</td>
        <td class="text-xs-left">{{ props.item.activitiesCount }}</td>
        <td class="text-xs-left">{{ props.item.routesCount }}</td>
        <td class="text-xs-left">{{ formatDate(props.item.createdAt, true) }}</td>
        <td class="text-xs-left">{{ formatDate(props.item.lastLogin, true) }}</td>
      </template>
    </v-data-table>
    <div class="separator"></div>
  </div>
</template>

<script>
  import { EventBus } from '@/eventBus.js';
  import formatDateMixin from "../../../mixins/formatDateMixin";

  export default {
    name: "Users",
    data() {
      return {
        currentTab: 'tab-api',
        users: [],
        columns: [
          {
            text: 'Username',
            value: 'username',
          },
          {
            text: 'Name',
            value: 'name',
          },
          {
            text: 'E-Mail',
            value: 'email',

          },
          {
            text: 'Provider',
            value: 'provider',
          },
          {
            text: 'Role',
            value: 'role',
          },
          {
            text: 'Activities',
            value: 'activitiesCount',
          },
          {
            text: 'Routes',
            value: 'routesCount',
          },
          {
            text: 'Registered',
            value: 'createdAt',
          },
          {
            text: 'Last Login',
            value: 'lastLogin',
          }
        ],
      };
    },
    created() {
      EventBus.$on('usersReady', (data) => {
        this.users = data;
      });
    },
    computed: {
      rows() {
        let rows = [];
        if (this.users) {
          if (this.users.length > 0) {
            for (let u of this.users) {
              u.activitiesCount = 5;
              u.routesCount = 5;
              rows.push(u);
            }
            return rows;
          }
        }
      }
    },
    mixins: [formatDateMixin]
  }
</script>

<style scoped>

</style>
