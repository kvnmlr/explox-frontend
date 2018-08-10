<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md4 md4>
        <v-layout row wrap>
          <v-flex xs10 sm10 md10>
            <h3>{{ route.title }}</h3>
            <v-chip v-for="tag in route.tags" v-bind:key="tag" tag="a" href="#">{{ tag }}
            </v-chip>
          </v-flex>
          <v-flex xs2 sm2 md2>

            <v-menu transition="slide-y-transition" bottom right>
              <v-btn color="secondary" dark relative fab slot="activator">
                <v-icon>more_horiz</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-on:click="editDialog = true">
                  <v-list-tile-title>Edit</v-list-tile-title>
                  <v-dialog v-model="editDialog" persistent max-width="290">
                    <v-card>
                      <v-card-title class="headline">Update Route Details</v-card-title>
                      <v-card-text>
                        <v-form ref="form" lazy-validation>
                          <v-text-field v-model="updatedRoute.title" label="Name" required></v-text-field>
                          <v-textarea v-model="updatedRoute.body" label="Description" required></v-textarea>
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
                </v-list-tile>
                <v-list-tile v-on:click="deleteDialog = true">
                  <v-list-tile-title>Delete</v-list-tile-title>
                  <v-dialog v-model="deleteDialog" persistent max-width="290">
                    <v-card>
                      <v-card-title class="headline">Delete this Route?</v-card-title>
                      <v-card-text>
                        <v-form ref="form" lazy-validation>
                          <v-btn flat color="primary" v-on:click="deleteRoute">
                            Delete
                          </v-btn>
                          <v-btn flat @click="deleteDialog = false">Cancel</v-btn>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-list-tile>
                <v-list-tile v-on:click="exportDialog = true">
                  <v-list-tile-title>Export/Save</v-list-tile-title>
                  <v-dialog v-model="exportDialog" persistent max-width="290">
                    <v-card>
                      <v-card-title class="headline">Save/Export Route</v-card-title>
                      <v-card-text>
                        <v-form ref="form" lazy-validation>
                          <v-btn flat color="primary" v-on:click="exportRoute">
                            Download GPX File
                          </v-btn>
                          <v-btn flat color="primary" v-on:click="">
                            Save in Strava
                          </v-btn>
                          <v-btn flat @click="exportDialog = false">Cancel</v-btn>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-list-tile>
              </v-list>
            </v-menu>
          </v-flex>
        </v-layout>
        <br>
        <p>{{ route.body }}</p>
        <p>Distance: {{ route.distance }} km</p>
        <p v-if="route.user">Athlete:
          <router-link :to="{path: '/users/' + route.user._id}">{{ route.user.name}}</router-link>
        </p>


      </v-flex>
      <v-flex xs12 sm12 md8>
        <simple-map style="margin-top:20px"></simple-map>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import SimpleMap from '../map/Simple'
  import Axios from 'axios'

  export default {
    name: "RouteDetails",
    components: {
      'simple-map': SimpleMap
    },
    data() {
      return {
        id: this.$route.params.id,
        name: '',
        menu: false,
        editDialog: false,
        deleteDialog: false,
        exportDialog: false,

        route: {},
        updatedRoute: {},
      }
    },
    created() {
      this.requestData();
    },
    methods: {
      async requestData() {
        this.$http.get('http://localhost:3000/routes/' + this.id).then(response => {
          const data = response.body;
          console.log(data);
          this.route = data.route;
          this.updatedRoute = {
            title: this.route.title,
            body: this.route.body,
            tags: this.route.tags
          }
        }, error => {
          console.log(error.response.data.error);
        });
      },
      async update() {
        const formData = {
          _csrf: this.csrfToken,
          title: this.updatedRoute.title,
          body: this.updatedRoute.body,
          tags: JSON.stringify(this.updatedRoute.tags)
        };
        const requestParams = {
          method: 'PUT',
          responseType: 'text',
        };
        Axios.put('http://localhost:3000/routes/' + this.id, formData, requestParams)
          .then(response => {
            console.log(response);
            this.requestData();
          })
          .catch(error => {
            console.error(error.response.data.error);
          })
          .finally(() => this.editDialog = false);
      },

      async deleteRoute() {
        Axios.delete('http://localhost:3000/routes/' + this.id)
          .then(response => {
            console.log(response);
            this.$router.push('/');
          })
          .catch(error => {
            console.error(error.response.data.error);
          })
          .finally(() => this.deleteDialog = false);
      },

      async exportRoute() {
        Axios.get('http://localhost:3000/routes/' + this.id + '/export')
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error.response.data.error);
          })
          .finally(() => this.exportDialog = false)
      }
    },
  }
</script>

<style scoped>

</style>
