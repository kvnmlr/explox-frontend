<template>
  <div>
    <h2>Users</h2>
    <v-data-table
      :headers="columns"
      :items="rows"
      class="elevation-1">
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
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.provider }}</td>
        <td class="text-xs-right">{{ props.item.role }}</td>
        <td class="text-xs-right">{{ props.item.activities }}</td>
        <td class="text-xs-right">{{ props.item.registered }}</td>
        <td class="text-xs-right">{{ props.item.lastlogin }}</td>
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
            text: 'Registered',
            value: 'registered',
          },
          {
            text: 'Last Login',
            value: 'lastlogin',
          }
        ],
        rows: [
          {
            value: false,
            username: 'Tiger Nixon',
            name: 'System Architect',
            email: 'Edinburgh',
            provider: 'strava',
            role: 'user',
            activities: 5,
            registered: '2011/04/25',
            lastlogin: '2011/04/25'

          }],
      };
    }

  }
</script>

<style scoped>

</style>
