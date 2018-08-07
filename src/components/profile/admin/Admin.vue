<template>
  <div>
    <card class="shadow">
      <card-body>
        <h1>Admin Dashboard</h1>
        <v-tabs fixed-tabs
          slot="extension"
          v-model="currentTab"
          centered>
          <v-tab
            :href="`#tab-api`">
            API
          </v-tab>
          <v-tab
            :href="`#tab-users`">
            Users
          </v-tab>
          <v-tab
            :href="`#tab-routes`">
            Routes
          </v-tab>
          <v-tab
            :href="`#tab-activities`">
            Activities
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="currentTab">
          <v-tab-item
            :id="`tab-api`">
            <api></api>
          </v-tab-item>
          <v-tab-item
            :id="`tab-users`">
            <v-card flat>
              <p>Users</p>
            </v-card>
          </v-tab-item><v-tab-item
          :id="`tab-routes`">
          <v-card flat>
            <p>Routes</p>
          </v-card>
        </v-tab-item><v-tab-item
          :id="`tab-activities`">
          <v-card flat>
            <p>Activities</p>
          </v-card>
        </v-tab-item>
        </v-tabs-items>




        <h2>Users</h2>
        <v-data-table
          :headers="userTableColumns"
          :items="userTableRows"
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

        <h2>Routes</h2>

        <h2>Generated</h2>

        <h2>Segments</h2>

        <h2>Activities</h2>
      </card-body>
    </card>

  </div>
</template>

<script>
  import Api from './Api'
  export default {
    components: {
      'api': Api,
    },
    name: "Admin",
    data() {
      return {
        currentTab: 'tab-api',
        userTableColumns: [
          {
            text: 'Username',
            value: 'username',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Name',
            value: 'name',
            align: 'left',
            sortable: false,
          },
          {
            text: 'E-Mail',
            value: 'email',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Provider',
            value: 'provider',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Role',
            value: 'role',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Activities',
            value: 'activities',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Registered',
            value: 'registered',
            align: 'left',
            sortable: false,
          },
          {
            text: 'Last Login',
            value: 'lastlogin',
            align: 'left',
            sortable: false,
          }
        ],
        userTableRows: [
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
