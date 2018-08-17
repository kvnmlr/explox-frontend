import axios from 'axios';

const apiBase = 'http://localhost:3000/';

export default {
  methods: {
    async GET(path, cb) {
      axios.get(apiBase + path)
        .then(response => {
          const data = response.data;
          console.log(data);
          this.$emit('flash', data.flash);
          cb(data, null);
        })
        .catch(error => {
          const err = error.response.data;
          console.log(err);
          this.$emit('flash', err.flash);
          cb(null, err);
        });
    },

    async POST(path, formData, requestParams, cb) {
      requestParams = requestParams ||  {
        method: 'POST',
        responseType: 'text',
      };

      axios.post(apiBase + path, formData, requestParams)
        .then(response => {
          const data = response.data;
          console.log(data);
          this.$emit('flash', data.flash);
          cb(data, null);
        })
        .catch(error => {
          const err = error.response.data;
          console.log(err);
          this.$emit('flash', err.flash);
          cb(null, err);
        })
    },

    async DELETE(path, cb) {
      axios.delete(apiBase + path)
        .then(response => {
          const data = response.data;
          console.log(data);
          this.$emit('flash', data.flash);
          cb(data, null);
        })
        .catch(error => {
          const err = error.response.data;
          console.log(err);
          this.$emit('flash', err.flash);
          cb(null, err);
        });
    },

    async PUT(path, formData, requestParams, cb) {
      requestParams = requestParams || {
        method: 'PUT',
        responseType: 'text',
      };

      axios.put(apiBase + path, formData, requestParams)
        .then(response => {
          const data = response.data;
          console.log(data);
          this.$emit('flash', data.flash);
          cb(data, null);
        })
        .catch(error => {
          const err = error.response.data;
          console.log(err);
          this.$emit('flash', err.flash);
          cb(null, err);
        })
    },
  },
}
