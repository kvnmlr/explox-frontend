<template>
  <div>
    <card>
      <card-body>
        <row>
          <column col="4">
            <h3>{{ name }}</h3>
            <badge v-for="tag in route.tags" v-bind:key="tag" tag="a" href="#" color="orange darken-1" style="margin-right: 10px;">{{ tag }}</badge>
            &nbsp;

            <div class="separator"/>
            <p>Distance: 1000 km</p>
            <p>Athlete:
              <router-link :to="{path: '/'}">Admin</router-link>
            </p>

            <btn color="orange" @click.native="showModal = true">Edit</btn>
            <btn color="orange" @click.native="showModal = true">Delete</btn>

          </column>
          <column col="8">
            <simple-map></simple-map>
          </column>
        </row>
      </card-body>
    </card>
    <modal v-if="showModal" @close="showModal = false">
      <modal-header>
        <modal-title>Edit Route</modal-title>
      </modal-header>
      <modal-body>
        <form class="form-horizontal" method="post" enctype="multipart/form-data" role="form">
          <input type="hidden" name="_csrf" value="#{csrf_token}"/>
          <input type="hidden" name="_method" value="PUT"/>
          <div class="form-group">
            <label class="col-sm-2 control-label" for="title">Title</label>
            <div class="col-sm-10">
              <input class="form-control" id="title" type="text" name="title" value="title"
                     placeholder="Enter the title"/>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label" for="desc">Body</label>
            <div class="col-sm-10">
                  <textarea class="form-control" id="desc" rows="5" name="body"
                            placeholder="Enter the article description">asd</textarea>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label" for="tags">Tags</label>
            <div class="col-sm-10">
              <input class="form-control" id="tags" type="text" name="tags" value="tags"
                     placeholder="Enter the tags"/>
            </div>
          </div>
          <div class="form-group">
                  <span>
                    <btn color="orange darken-1" type="submit">Save</btn>
                  &nbsp;
                  <btn outline="orange darken-1" tag="a" href="/routes" title="cancel">Cancel</btn>
                  </span>
          </div>
        </form>
      </modal-body>
    </modal>
  </div>
</template>

<script>
  import {Row, Column, Badge, Card, CardBody, Btn, Modal, ModalHeader, ModalBody, ModalFooter} from 'mdbvue'
  import SimpleMap from '../map/Simple'

  export default {
    name: "RouteDetails",
    components: {
      Row, Column, Badge, Card, CardBody, Btn, Modal, ModalHeader, ModalBody, ModalFooter,
      'simple-map': SimpleMap
    },
    data() {
      return {
        name: this.$route.params.name,
        showModal: false,
        route: {name: 'Ryu', speciality: 'Vue Components', tags: ["running", "trail", "mountain"]}
      }
    },
  }
</script>

<style scoped>

</style>
