<template>
  <section>
    <h3>Users</h3>
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
        <td class="text-xs-left"><router-link :to="{path: '/users/' + props.item._id}">{{ props.item.username }}</router-link></td>
        <td class="text-xs-left"><router-link :to="{path: '/users/' + props.item._id}">{{ props.item.firstName + ' ' + props.item.lastName }}</router-link></td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.participates }}</td>
        <td class="text-xs-left">{{ props.item.activitiesCount }}</td>
        <td class="text-xs-left">{{ props.item.routesCount }}</td>
        <td class="text-xs-left">{{ formatDate(props.item.createdAt, true) }}</td>
        <td class="text-xs-left">{{ formatDate(props.item.lastLogin, true) }}</td>
      </template>
    </v-data-table>
    <div class="separator"></div>
  </section>
</template>

<script>
  import {EventBus} from '@/eventBus.js';
  import formatDateMixin from "../../../mixins/formatDateMixin";

  export default {
    name: "Users",
    props: {
      users: Array,
    },
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
            text: 'Participates',
            value: 'participates',
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
    computed: {
      rows() {

        let rows = [];
        if (this.users.length > 0) {
          for (let u of this.users) {
            console.log("USER")
            console.log(u)
            u.activitiesCount = u.activities.length;
            u.routesCount = u.routes.length;
            if (u.questionnaireInfo) {
              u.participates = u.questionnaireInfo.participates;
            } else {
              u.participates = false;
            }
            rows.push(u);
          }
          return rows;
        }
      }
    },
    mixins: [formatDateMixin]
  }
</script>

<style scoped>

</style>
