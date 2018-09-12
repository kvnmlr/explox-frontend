import axios from 'axios';
import {EventBus} from "../eventBus";

const api = axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 60000,
});

let csrfToken = '';
let self;

api.interceptors.response.use(
  function (response) {
    const data = response.data;
    console.debug('(' + response.config.method.toUpperCase() + ') Api returned data for ' + response.config.url + ': ');
    console.debug(data);

    if (data.csrf_token) {
      csrfToken = data.csrf_token;
    }

    if (data.flash) {
      EventBus.$emit('flash', data.flash);
    }
    return data;
  },
  function (error) {
    console.error('Error occurred during api call: ');
    if (error.response) {
      if (error.response.status === 408) {
        console.error(`Server timed out for ${error.config.url}`)
      }
      const err = error.response.data;
      console.error(err);
      if (err.flash) {
        self.$emit('flash', err.flash);
      }
    }
    else if (error.code === 'ECONNABORTED') {
      console.error(`Axios timeout happened for ${error.config.url}`)
    }
    else {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export default {
  methods: {
    async GET(path, cb) {
      self = this;
      api.get(path)
        .then((data) => {
          cb(data, null);
        })
        .catch((error) => {
          cb(null, error);
        })
    },

    async POST(path, formData, requestParams, cb) {
      self = this;
      api.get('csrf')
        .then(() => {


          requestParams = requestParams || {
            method: 'POST',
            responseType: 'text',
          };
          formData._csrf = csrfToken;

          api.post(path, formData, requestParams)
            .then((data) => {
              cb(data, null);
            })
            .catch((error) => {
              cb(null, error);
            })
        })
        .catch(() => {
          console.error('Could not get csrf token');
        });
    },

    async DELETE(path, cb) {
      self = this;
      api.delete(path)
        .then((data) => {
          cb(data, null);
        })
        .catch((error) => {
          cb(null, error);
        })
    },

    async PUT(path, formData, requestParams, cb) {
      self = this;
      api.get('csrf')
        .then(() => {
          requestParams = requestParams || {
            method: 'PUT',
            responseType: 'text',
          };
          formData._csrf = csrfToken;

          api.put(path, formData, requestParams)
            .then((data) => {
              cb(data, null);
            })
            .catch((error) => {
              cb(null, error);
            })
        })
        .catch(() => {
          console.error('Could not get csrf token');
        });
    },
  },
}
