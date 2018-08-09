<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm12 md4>
        <h3>{{ route.title }}</h3>
        <v-chip v-for="tag in route.tags" v-bind:key="tag" tag="a" href="#">{{ tag }}
        </v-chip>
        <div class="separator"></div>
        <p>{{ route.body }}</p>
        <p>Distance: {{ route.distance }} km</p>
        <p v-if="route.user">Athlete:
          <router-link :to="{path: '/users/' + route.user._id}">{{ route.user.name}}</router-link>
        </p>

        <v-layout row justify-center>
          <v-flex>
            <v-dialog v-model="dialog" persistent max-width="290">
              <v-btn slot="activator" class="primary">Edit</v-btn>
              <v-card>
                <v-card-title class="headline">Update Route Details</v-card-title>
                <v-card-text>
                  <v-form ref="form" lazy-validation>
                    <v-text-field v-model="updatedRoute.title" label="Name" required
                    ></v-text-field>
                    <v-textarea v-model="updatedRoute.body" label="Description" required
                    ></v-textarea>
                    <v-btn flat color="primary" v-on:click.prevent="update">
                      Update
                    </v-btn>
                    <v-btn flat @click="dialog = false">Cancel</v-btn>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
          <v-flex>
            <v-dialog v-model="deleteDialog" persistent max-width="290">
              <v-btn slot="activator" flat>Delete</v-btn>
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
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md8>
        <simple-map style="margin-top:20px"></simple-map>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import SimpleMap from '../map/Simple'

  export default {
    name: "RouteDetails",
    components: {
      'simple-map': SimpleMap
    },
    data() {
      return {
        id: this.$route.params.id,
        name: '',
        dialog: false,
        deleteDialog: false,
        route: {},
        updatedRoute: {},
      }
    },
    created() {
      this.requestData();
    },
    methods: {
      requestData() {
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
          console.log(error.body);
        });
      },
      async update() {
        const formData = {
          _csrf: this.csrfToken,
          title: this.updatedRoute.title,
          body: this.updatedRoute.body,
          tags: this.updatedRoute.tags
        };
        const requestParams = {
          method: 'PUT',
          responseType: 'text',
          emulateJSON: true
        };
        this.$http.put('http://localhost:3000/routes/' + this.id, formData, requestParams).then(response => {
          console.log(response);
          this.dialog = false;
          this.requestData();
        }, error => {
          console.error(error.body.errors);
          this.dialog = false;
        });
      },

      async deleteRoute() {
        this.$http.delete('http://localhost:3000/routes/' + this.id).then(response => {
          console.log(response);
          this.deleteDialog= false;
          this.$router.push('/');
        }, error => {
          console.error(error.body.errors);
          this.deleteDialog= false;
        });
      }
    },
  }
</script>

<style scoped>

</style>
