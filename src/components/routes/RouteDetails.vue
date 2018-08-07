<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm12 md4>
        <h3>{{ name }}</h3>
        <v-chip v-for="tag in route.tags" v-bind:key="tag" tag="a" href="#">{{ tag }}
        </v-chip>
        &nbsp;
        <div class="separator"></div>
        <p>Distance: 1000 km</p>
        <p>Athlete:
          <router-link :to="{path: '/'}">Admin</router-link>
        </p>

        <v-layout row justify-center>
          <v-flex>
            <v-dialog v-model="dialog" persistent max-width="290">
              <v-btn slot="activator" class="primary">Edit</v-btn>
              <v-card>
                <v-card-title class="headline">Update Route Details</v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="route.name"
                      :rules="nameRules"
                      label="Name"
                      required
                    ></v-text-field>
                    <v-textarea
                      v-model="route.speciality"
                      :rules="descriptionRules"
                      label="Description"
                      required
                    ></v-textarea>
                    <v-btn flat color="primary"
                           :disabled="!valid"
                           @click="dialog = false">
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
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-btn flat color="primary"
                           :disabled="!valid"
                           @click="deleteDialog = false">
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
        name: this.$route.params.name,
        dialog: false,
        deleteDialog: false,
        route: {name: 'Ryu', speciality: 'Vue Components', tags: ["running", "trail", "mountain"]}
      }
    },
  }
</script>

<style scoped>

</style>
