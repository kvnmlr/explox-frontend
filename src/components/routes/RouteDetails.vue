<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md4 md4>
        <v-layout row wrap>
          <v-flex xs10 sm10 md10>
            <h2>{{ route.title }}</h2>
            <v-chip v-for="tag in route.tags" v-bind:key="tag" tag="a" href="#">{{ tag }}
            </v-chip>
          </v-flex>
          <v-flex xs2 sm2 md2>

            <v-menu dark transition="slide-y-transition" bottom right>
              <v-btn color="secondary" dark relative fab right slot="activator">
                <v-icon>more_horiz</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-on:click="editDialog = true">
                  <v-list-tile-title>
                    <v-icon>edit</v-icon>
                    Edit
                  </v-list-tile-title>
                  <v-dialog v-model="editDialog" persistent max-width="290">
                    <v-card dark>
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
                <v-list-tile v-on:click="exportDialog = true">
                  <v-list-tile-title>
                    <v-icon>import_export</v-icon>
                    Export/Save
                  </v-list-tile-title>
                  <v-dialog v-model="exportDialog" persistent max-width="290">
                    <v-card dark>
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
                <v-list-tile v-on:click="deleteDialog = true">
                  <v-list-tile-title>
                    <v-icon>delete</v-icon>
                    Delete
                  </v-list-tile-title>
                  <v-dialog v-model="deleteDialog" persistent max-width="290">
                    <v-card dark>
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

    <v-card class="elevation-5" style="margin-top: 30px;">
      <v-card-text>
        <h2>Comments</h2>
        <v-textarea
          name="comment_input"
          label="Your comment"
          value=""
          :auto-grow="true"
          rows="1"
          v-model="commentText"></v-textarea>
        <v-btn color="primary" v-on:click="addComment">Post Comment</v-btn>

        <v-list two-line style="margin-top: 20px;">
          <template v-for="(comment, index) in route.comments">
            <v-list-tile :key="comment._id" avatar @click="">
              <v-list-tile-action>
                <!-- TODO if this is the users comment -->
                <v-icon>thumb_up</v-icon>
              </v-list-tile-action>
              <v-list-tile-action v-if="comment._id">
                <!-- TODO otherwise -->
                <v-icon color="red" v-on:click="deleteComment(comment._id)">delete</v-icon>
              </v-list-tile-action>
              <br>
              <v-list-tile-content>
                <v-list-tile-title v-html="comment.body"></v-list-tile-title>
                <v-list-tile-sub-title v-html="comment.user.name"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-avatar>
                <img :src="comment.avatar">
              </v-list-tile-avatar>
            </v-list-tile>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>

      </v-card-text>

    </v-card>

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
        commentText: '',
        alert: false,
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
            const data = response.data;
            console.log(response);
            this.requestData();
            if (data.flash) {
              this.$emit('flash', data.flash);
            }
          })
          .catch(error => {
            const data = error.response.data;
            if (data.flash) {
              this.$emit('flash', data.flash);
            }
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
            const data = error.response.data;
            if (data.flash) {
              this.$emit('flash', data.flash);
            }
          })
          .finally(() => this.deleteDialog = false);
      },

      async exportRoute() {
        Axios.get('http://localhost:3000/routes/' + this.id + '/export')
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            const data = error.response.data;
            if (data.flash) {
              this.$emit('flash', data.flash);
            }
          })
          .finally(() => this.exportDialog = false)
      },

      async addComment() {
        const formData = {
          _csrf: this.csrfToken,
          comment: {
            body: this.commentText,
          },
        };
        Axios.post('http://localhost:3000/routes/' + this.id + '/comments', formData)
          .then(response => {
            const data = response.data;
            console.log(data);
            this.route.comments.push({
              body: data.comment.body,
              user: data.comment.user,
            });
            this.commentText = '';
            if (data.flash) {
              this.$emit('flash', data.flash);
            }
          })
          .catch(error => {
            console.error(error.response.data.error);
          })
      },
      async deleteComment(id) {
        Axios.delete('http://localhost:3000/routes/' + this.id + '/comments/' + id)
          .then(response => {
            const data = response.data;
            this.route.comments.forEach((comment, index) => {
              if (comment._id === id) {
                this.route.comments.splice(index, 1);
              }
            });
            if (data.flash) {
              this.$emit('flash', data.flash);
            }
          })
          .catch(error => {
            const data = error.response.data;
            if (data.flash) {
              this.$emit('flash', data.flash);
            }
          })
          .finally(() => this.deleteDialog = false);
      },
    },
  }
</script>

<style scoped>

</style>
