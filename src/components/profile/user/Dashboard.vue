<template>
  <div v-if="user">
    <h1>Dashboard</h1>
    <v-tabs fixed-tabs slot="extension" v-model="currentTab" centered>
      <v-tab :href="`#tab-profile`">
        Profile
      </v-tab>
      <v-tab :href="`#tab-activity-map`">
        Activity Map
      </v-tab>
      <v-tab :href="`#tab-activities`">
        Activities
      </v-tab>
      <v-tab :href="`#tab-routes`">
        Routes
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item :id="`tab-profile`">
        <v-layout row wrap>
          <v-flex xs12 sm12 md6>
            <v-container>
              <h2>{{ user.name.toUpperCase() }}</h2>
              <h3>{{ user.username }}</h3>
              <br>
              <img style="width:100%" src="https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg">
              <br>
              <h3>{{ user.email }}</h3>
              <h3>A member since {{ user.createdAt }}</h3>
              <h3>Routes: {{ user.routes.length }}</h3>
              <h3>Activities: {{ user.activities.length }}</h3>
            </v-container>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-container>
              <v-flex row>
                <v-container>
                  <h2>Feed</h2>
                  <p>No Activity</p>
                  <v-btn flat v-on:click="currentTab='tab-activities'">View All</v-btn>
                </v-container>
              </v-flex>
              <v-flex row>
                <v-container>
                  <h2>Routes</h2>
                  <p>No Routes</p>
                  <v-btn flat v-on:click="currentTab='tab-routes'">View All</v-btn>
                </v-container>
              </v-flex>
            </v-container>

          </v-flex>
        </v-layout>
        <v-divider style="margin: 30px;" horizontal></v-divider>
        <v-btn :to="{path: '/users/'+this.user._id}">View Public Profile</v-btn>
        <v-dialog v-if="updatedUser" v-model="editDialog" persistent max-width="290">
          <v-btn slot="activator">Edit Profile</v-btn>

          <v-card>
            <v-card-title class="headline">Update Route Details</v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field v-model="updatedUser.name" label="Name" required></v-text-field>
                <v-text-field v-model="updatedUser.username" label="Username" required></v-text-field>
                <v-text-field v-model="updatedUser.email" label="E-Mail" required></v-text-field>
                <v-btn flat color="primary" v-on:click.prevent="update">
                  Update
                </v-btn>
                <v-btn flat @click="editDialog = false">Cancel</v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn v-on:click="$emit('logout')">Logout</v-btn>
        <v-btn v-on:click="deleteUser">Delete Account</v-btn>

      </v-tab-item>
      <v-tab-item :id="`tab-activity-map`">
        <p>Activity Map</p>
      </v-tab-item>
      <v-tab-item :id="`tab-activities`">
        <p>Activities</p>

      </v-tab-item>
      <v-tab-item :id="`tab-routes`">
        <p>Routes</p>

      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "User",
    data() {
      return {
        currentTab: 'tab-profile',
        editDialog: false,
        updatedUser: {},
      };
    },
    props: {
      user: Object
    },
    created() {
      console.log("dashboard created");
      this.requestData();
    },
    methods: {
      async requestData() {
        axios.get('http://localhost:3000/dashboard')
          .then(response => {
            const data = response.data;
            console.log("asd");
            console.log(data);
            this.user = data.user;
            if (this.user) {
              if (this.user.role === 'admin') {
                this.$router.push('/admin/dashboard');
                return;
              }
            }
            this.updatedUser = {
              name: this.user.name,
              username: this.user.username,
              email: this.user.email,
            };

          })
          .catch(error => {
            console.log(error.response.data.error);
          });
      },
      async update() {
        const formData = {
          _csrf: this.csrfToken,
          name: this.updatedUser.name,
          username: this.updatedUser.username,
          email: this.updatedUser.email,
        };
        const requestParams = {
          method: 'PUT',
          responseType: 'text',
        };
        axios.put('http://localhost:3000/users/' + this.user._id, formData, requestParams)
          .then(response => {
            console.log(response);
            this.requestData();
          })
          .catch(error => {
            console.error(error.response.data.error);
          })
          .finally(() => this.editDialog = false);
      },

      async deleteUser() {
        axios.delete('http://localhost:3000/users/' + this.user._id)
          .then(response => {
            console.log(response);
            this.$router.push('/');
            this.$emit('logout')
          })
          .catch(error => {
            console.error(error.response.data.error);
          })
          .finally(() => this.deleteDialog = false);
      },
    }
  }
</script>

<style scoped>

</style>
