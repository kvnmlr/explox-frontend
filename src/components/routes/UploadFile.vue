<template>
  <v-card class="elevation-5">
    <v-card-title v-if="route" primary class="title">
      <v-icon>cloud_upload</v-icon>&nbsp;Upload Route File
    </v-card-title>
    <v-card-title v-else primary class="title">
      <v-icon>cloud_upload</v-icon>&nbsp;Upload Activity File
    </v-card-title>
    <v-card-text>
      <p>Upload a GPX file from your computer.</p>
      <form @submit.prevent="onSubmit">
        <v-layout row>
          <v-flex xs12>
            <file-input remove-label="Choose new file" select-label="Select a GPX file" accept=".gpx" ref="fileInput"
                        @input="getUploadedFile"></file-input>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-btn dark large round style="width: 95%; height: 100px; vertical-align: bottom"
                   class="gradient gradient-orange" type="submit">
              Save {{file.name}}
            </v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
  import FileInput from '../general/FileInput'
  import {EventBus} from "../../eventBus";
  import apiMixin from '../../mixins/apiMixin'

  export default {
    name: 'UploadFile',
    components: {FileInput},

    data () {
      return {
        file: '',
      }
    },

    props: {
      route: Boolean
    },

    methods: {
      getUploadedFile (file) {
        console.log(file)
        this.file = file
      },
      onSubmit () {
        let formData = new FormData();
        formData.set('file', this.file);
        formData.set('_csrf', this.csrfToken);
        formData.set('format', 'gpx');
        formData.set('type', 'route');

        console.log(formData);

        const request = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        this.POST('routes/import', formData, request, (data, err) => {
          if (!err) {
            EventBus.$emit('flash', {
              type: 'success',
              text: 'Successfully Uploaded!'
            })
          }
        })
      }
    },
    mixins: [apiMixin]
  }
</script>

<style scoped>

</style>
