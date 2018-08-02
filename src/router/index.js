import Vue from 'vue'
import Router from 'vue-router'
import About from '../components/general/About'
import Home from '../components/general/Home'
import Landing from '../components/general/Landing'
import Routes from '../components/routes/list'
import Explore from '../components/routes/Explore'
import RouteDetails from '../components/routes/RouteDetails'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/routes',
      name: 'Routes',
      component: Routes
    },
    {
      path: '/route/:name',
      name: 'Route Details',
      component: RouteDetails
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Explore
    }

  ]
})
