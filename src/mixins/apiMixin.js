import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 10000,
});

let csrfToken = '';

api.interceptors.response.use(
  config => config,
  (error) => {
    if (error.response) {
      if (error.response.status === 408) {
        console.error(`Server timed out for ${error.config.url}`)
      }
    }
    if (error.code === 'ECONNABORTED') {
      console.error(`Axios timeout happened for ${error.config.url}`)
    }
    return Promise.reject(error);
  },
);

export default {
  methods: {
    async GET(path, cb) {
      api.get(path)
        .then(response => {
          console.log(response);
          const data = response.data;
          console.log("GET: " + path);
          console.log(data);
          if (data.flash) {
            this.$emit('flash', data.flash);
          }
          cb(data, null);
        })
        .catch(error => {
          if (!error.response) {
            console.log("GET: " + path);
            console.log(error);
            return cb(null, error);
          }
          const err = error.response.data;
          console.log("GET: " + path);
          console.log(err);
          if (err.flash) {
            this.$emit('flash', err.flash);
          }
          cb(null, err);
        });
    },

    async POST(path, formData, requestParams, cb) {
      api.get('csrf')
        .then(response => {
          const data = response.data;
          if (data.csrf_token) {
            csrfToken = data.csrf_token;
            console.log("CSRF Token sent" + csrfToken);

            requestParams = requestParams || {
              method: 'POST',
              responseType: 'text',
            };
            formData._csrf = csrfToken;

            api.post(path, formData, requestParams)
              .then(response => {
                const data = response.data;
                console.log("POST: " + path);
                console.log(data);
                if (data.flash) {
                  this.$emit('flash', data.flash);
                }
                cb(data, null);
              })
              .catch(error => {
                if (!error.response) {
                  console.log("POST: " + path);
                  console.log(error);
                  return cb(null, error);
                }
                const err = error.response.data;
                console.log("POST: " + path);
                console.log(err);
                if (err.flash) {
                  this.$emit('flash', err.flash);
                }
                cb(null, err);
              })
          }
        })
        .catch(() => {
          console.error('Could not get csrf token');
        });
    },

    async DELETE(path, cb) {
      api.delete(path)
        .then(response => {
          const data = response.data;
          console.log("DELETE: " + path);
          console.log(data);
          if (data.flash) {
            this.$emit('flash', data.flash);
          }
          cb(data, null);
        })
        .catch(error => {
          if (!error.response) {
            console.log("DELETE: " + path);
            console.log(error);
            return cb(null, error);
          }
          const err = error.response.data;
          console.log("DELETE: " + path);
          console.log(err);
          if (err.flash) {
            this.$emit('flash', err.flash);
          }
          cb(null, err);
        });
    },

    async PUT(path, formData, requestParams, cb) {
      api.get('csrf')
        .then(response => {
          const data = response.data;
          if (data.csrf_token) {
            csrfToken = data.csrf_token;

            console.log("CSRF Token sent" + csrfToken);

            requestParams = requestParams || {
              method: 'PUT',
              responseType: 'text',
            };
            formData._csrf = csrfToken;

            api.put(path, formData, requestParams)
              .then(response => {
                const data = response.data;
                console.log("PUT: " + path);
                console.log(data);
                if (data.flash) {
                  this.$emit('flash', data.flash);
                }
                cb(data, null);
              })
              .catch(error => {
                if (!error.response) {
                  console.log("PUT: " + path);
                  console.log(error);
                  return cb(null, error);
                }
                const err = error.response.data;
                console.log("PUT: " + path);
                console.log(err);
                if (err.flash) {
                  this.$emit('flash', err.flash);
                }
                cb(null, err);
              })
          }
        })
        .catch(() => {
          console.error('Could not get csrf token');
        });
    },
  },
}
