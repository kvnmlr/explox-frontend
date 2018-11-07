import './assets/css/app.css'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

/* Vue imports */
import Vue from 'vue'
import App from './App'
import Router from './router'
import Meta from 'vue-meta'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import Axios from 'axios'

// import Mapbox from 'mapbox-gl-vue';

Axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.use(Meta);
Vue.use(VueResource);
Vue.use(Vuetify, {
  theme: {
    primary: colors.orange.darken1,
    secondary: colors.orange.darken3,
    accent: colors.grey.darken3,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.lightBlue.accent3,
    success: colors.green.accent4
  }
});

Vue.http.options.credentials = true;
Vue.http.options.xhr = {withCredentials: true};

Router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  components: { App },
  template: '<App/>',
});
