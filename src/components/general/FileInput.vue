<template>
  <div>
    <v-btn large round light class="gradient gradient-green" style="width: 95%; height: 60px; vertical-align: bottom" @click="onPickFile" v-if="!fileUrl">
      {{ selectLabel }}
    </v-btn>
    <v-btn large round light class="error gradient gradient-green" style="width: 95%; height: 60px; vertical-align: bottom"
           @click.prevent="removeFile" v-else>
      {{ removeLabel }}
    </v-btn>
    <input type="file" ref="file" name="file" :accept="accept" @change="onFilePicked">
  </div>

</template>

<script>
  export default {
    name: 'FileInput',
    props: {
      value: {
        type: String
      },
      accept: {
        type: String,
        default: '*'
      },
      selectLabel: {
        type: String,
        default: 'Select a file'
      },
      removeLabel: {
        type: String,
        default: 'Remove'
      }
    },

    data() {
      return {
        fileUrl: ''
      }
    },

    watch: {
      value(v) {
        this.fileUrl = v
      }
    },

    mounted() {
      this.fileUrl = this.value
    },

    methods: {
      onPickFile() {
        this.$refs.file.click()
      },

      onFilePicked(event) {
        const files = event.target.files || event.dataTransfer.files;

        if (files && files[0]) {
          let filename = files[0].name;

          if (filename && filename.lastIndexOf('.') <= 0) {
            return //return alert('Please add a valid file!')
          }

          const fileReader = new FileReader();
          fileReader.addEventListener('load', () => {
            this.fileUrl = fileReader.result
          });
          fileReader.readAsDataURL(files[0]);

          this.$emit('input', files[0])
        }
      },

      removeFile() {
        this.fileUrl = '';
        this.onPickFile();
      }
    }
  }
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
