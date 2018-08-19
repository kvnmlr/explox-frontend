import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
});

api.interceptors.response.use(
  config => config,
  (error) => {
    if (error.response) {
      if (error.response.status === 408) {
        console.log(`Server timed out for ${error.config.url}`)
      }
    }

    if (error.code === 'ECONNABORTED') {
      console.log(`Axios timeout happened for ${error.config.url}`)
    }
    return Promise.reject(error);
  },
);

export default {
  methods: {
    async GET(path, cb) {
      api.get(path)
        .then(response => {
          const data = response.data;
          console.log(data);
          if (data.flash) {
            this.$emit('flash', data.flash);
          }
          cb(data, null);
        })
        .catch(error => {
          if (!error.response) {
            console.log(error);
            return cb(null, error);
          }
          const err = error.response.data;
          console.log(err);
          if (err.flash) {
            this.$emit('flash', err.flash);
          }
          cb(null, err);
        });
    },

    async POST(path, formData, requestParams, cb) {
      requestParams = requestParams || {
        method: 'POST',
        responseType: 'text',
      };

      api.post(path, formData, requestParams)
        .then(response => {
          const data = response.data;
          console.log(data);
          if (data.flash) {
            this.$emit('flash', data.flash);
          }
          cb(data, null);
        })
        .catch(error => {
          if (!error.response) {
            console.log(error);
            return cb(null, error);
          }
          const err = error.response.data;
          console.log(err);
          if (err.flash) {
            this.$emit('flash', err.flash);
          }
          cb(null, err);
        })
    },

    async DELETE(path, cb) {
      api.delete(path)
        .then(response => {
          const data = response.data;
          console.log(data);
          if (data.flash) {
            this.$emit('flash', data.flash);
          }
          cb(data, null);
        })
        .catch(error => {
          if (!error.response) {
            console.log(error);
            return cb(null, error);
          }
          const err = error.response.data;
          console.log(err);
          if (err.flash) {
            this.$emit('flash', err.flash);
          }
          cb(null, err);
        });
    },

    async PUT(path, formData, requestParams, cb) {
      requestParams = requestParams || {
        method: 'PUT',
        responseType: 'text',
      };

      api.put(path, formData, requestParams)
        .then(response => {
          const data = response.data;
          console.log(data);
          if (data.flash) {
            this.$emit('flash', data.flash);
          }
          cb(data, null);
        })
        .catch(error => {
          if (!error.response) {
            console.log(error);
            return cb(null, error);
          }
          const err = error.response.data;
          console.log(err);
          if (err.flash) {
            this.$emit('flash', err.flash);
          }
          cb(null, err);
        })
    },
  },
}
