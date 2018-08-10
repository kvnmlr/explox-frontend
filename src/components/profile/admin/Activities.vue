<template>
  <div>
    <h2>Users</h2>
    <v-data-table :headers="columns" :items="rows" class="elevation-1">
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
        <td class="text-xs-left">{{ props.item.activities }}</td>
        <td class="text-xs-left">{{ props.item.routes }}</td>
        <td class="text-xs-left">{{ props.item.createdAt }}</td>
        <td class="text-xs-left">{{ props.item.lastLogin }}</td>
      </template>
    </v-data-table>
    <div class="separator"></div>
  </div>
</template>

<script>
  export default {
    name: "Users",
    data() {
      return {
        currentTab: 'tab-api',
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
            value: 'activities',
          },
          {
            text: 'Routes',
            value: 'routes',
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
    props: {
      activities: Array,
    },
    created() {
    },
    computed: {
      rows() {
        let rows = [];
        if (this.activities.length > 0) {
          this.activities.forEach(function (a) {
            a.activities = a.activities.length;
            a.routes = a.routes.length;
            rows.push(a);
          });
          return rows;
        }
      }
    }
  }
</script>

<style scoped>

</style>
