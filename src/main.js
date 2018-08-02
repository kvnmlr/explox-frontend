/* Material Design Bootstrap imports */
import './assets/css/app.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'
import './assets/css/app.css'

/* Vue imports */
import Vue from 'vue'
import App from './App'
import Router from './router'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  components: { App },
  template: '<App/>'
});
