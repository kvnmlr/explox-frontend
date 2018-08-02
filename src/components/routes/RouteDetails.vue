<template>
  <div>
    <h2>{{ name }}</h2>
    <btn color="primary" @click.native="showModal = true">Edit</btn>
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
                  <btn outline="oragen darken-1" tag="a" href="/routes" title="cancel">Cancel</btn>
                  </span>
          </div>
        </form>
      </modal-body>
    </modal>
  </div>
</template>

<script>
  import {Btn, Modal, ModalHeader, ModalBody, ModalFooter} from 'mdbvue'

  export default {
    name: "RouteDetails",
    components: {
      Btn, Modal, ModalHeader, ModalBody, ModalFooter
    },
    data() {
      return {
        name: this.$route.params.name,
        showModal: false,
      }
    },
  }
</script>

<style scoped>

</style>
