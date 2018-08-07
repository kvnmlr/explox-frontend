/* Material Design Bootstrap imports */
import './assets/css/app.css'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/es5/util/colors'

/* Vue imports */
import Vue from 'vue'
import App from './App'
import Router from './router'
import Meta from 'vue-meta'
import Vuetify from 'vuetify'

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: colors.orange.darken1,
    secondary: colors.amber.darken2,
    accent: colors.grey.darken2,
    error: colors.red.base,
    warning: colors.yellow.base,
    info: colors.lightBlue.accent3,
    success: colors.green.accent4
  }
});

Vue.use(Meta);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  components: { App },
  template: '<App/>'
});
