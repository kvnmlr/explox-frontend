<template>
  <div>
    <card class="shadow">
      <card-body>
        <h1>Admin Dashboard</h1>
        <span>
          <btn outline="orange darken-1">API and Performance</btn>
          <btn outline="orange darken-1">User Statistics</btn>
          <btn outline="orange darken-1">Routes and Segments</btn>

        </span>
        <h2>API Limits</h2>

        <b>Short Term</b>
        <p>20 out of 100</p>
        <progress-wrapper>
          <progress-bar :value="20"></progress-bar>
        </progress-wrapper>
        <div class="separator"></div>

        <b>Long Term</b>
        <p>1000 out of 30000</p>
        <progress-wrapper>
          <progress-bar :value="30"></progress-bar>
        </progress-wrapper>
        <div class="separator"></div>

        <h2>Users</h2>
        <mdb-datatable
          :columns="userTableColumns"
          :rows="userTableRows"
          striped

        />
        <div class="separator"></div>

        <h2>Routes</h2>
        <mdb-datatable
          :columns="routesTableColumns"
          :rows="routesTableRows"
          striped
        />

        <h2>Generated</h2>
        <mdb-datatable
          :columns="routesTableColumns"
          :rows="routesTableRows"
          striped
        />

        <h2>Segments</h2>
        <mdb-datatable
          :columns="routesTableColumns"
          :rows="routesTableRows"
          striped
        />

        <h2>Activities</h2>
        <mdb-datatable
          :columns="activitiesTableColumns"
          :rows="activitiesTableRows"
          striped
        />
      </card-body>
    </card>

  </div>
</template>

<script>
  import {Btn, Card, CardBody, mdbDatatable, Container, Row, Column, ProgressWrapper, ProgressBar} from 'mdbvue';

  export default {
    name: "Admin",
    components: {
      Btn,
      Container,
      Row,
      Column,
      ProgressWrapper,
      ProgressBar,
      mdbDatatable,
      Card,
      CardBody,
    },
    data() {
      return {
        basic1: '1',
        userTableColumns: [
          {
            label: 'Username',
            field: 'username',
            sort: 'asc'
          },
          {
            label: 'Name',
            field: 'name',
            sort: 'asc'
          },
          {
            label: 'E-Mail',
            field: 'email',
            sort: 'asc'
          },
          {
            label: 'Provider',
            field: 'provider',
            sort: 'asc'
          },
          {
            label: 'Role',
            field: 'role',
            sort: 'asc'
          },
          {
            label: 'Activities',
            field: 'activities',
            sort: 'asc'
          },
          {
            label: 'Registered',
            field: 'registered',
            sort: 'asc'
          },
          {
            label: 'Last Login',
            field: 'lastlogin',
            sort: 'asc'
          }
        ],
        userTableRows: [
          {
            username: 'Tiger Nixon',
            name: 'System Architect',
            email: 'Edinburgh',
            provider: 'strava',
            role: 'user',
            activities: 5,
            registered: '2011/04/25',
            lastlogin: '2011/04/25'

          }
        ],

        routesTableColumns: [
          {
            label: 'Title',
            field: 'title',
            sort: 'asc'
          },
          {
            label: 'Location',
            field: 'location',
            sort: 'asc'
          },
          {
            label: 'User',
            field: 'user',
            sort: 'asc'
          },
          {
            label: 'Created',
            field: 'created',
            sort: 'asc'
          },
          {
            label: 'GPS Points',
            field: 'gpspoints',
            sort: 'asc'
          },
          {
            label: 'Distance',
            field: 'distance',
            sort: 'asc'
          },
        ],
        routesTableRows: [
          {
            title: 'Lauf',
            location: 'Saarbruecken',
            user: 'admin',
            created: '01/11/1994',
            gpspoints: 45,
            distance: 5,
          }
        ],

        activitiesTableColumns: [
          {
            label: 'Strava ID',
            field: 'stravaid',
            sort: 'asc'
          },
          {
            label: 'GPS Points',
            field: 'gpspoints',
            sort: 'asc'
          },
          {
            label: 'Created',
            field: 'created',
            sort: 'asc'
          },
        ],
        activitiesTableRows: [
          {
            stravaid: '013468438',
            gpspoints: 354,
            created: '01/11/1994',
          }
        ]
      };
    }
  }
</script>

<style scoped>

</style>
