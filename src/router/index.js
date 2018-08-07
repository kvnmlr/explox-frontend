import Vue from 'vue'
import Router from 'vue-router'
import About from '../components/general/About'
import Hub from '../components/general/home/Hub'
import Landing from '../components/general/Landing'
import Routes from '../components/routes/list'
import RouteDetails from '../components/routes/RouteDetails'
import Explore from '../components/routes/Explore'
import Admin from '../components/profile/admin/Admin'
import User from '../components/profile/user/User'
import GetStarted from '../components/general/GetStarted'
import Settings from '../components/general/Settings'
import Feedback from '../components/general/Feedback'
import MobileApps from '../components/general/MobileApps'
import SignUp from '../components/profile/SignUp'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/hub',
      name: 'Hub',
      component: Hub
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/guide',
      name: 'GetStarted',
      component: GetStarted
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/apps',
      name: 'MobileApps',
      component: MobileApps
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
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Admin
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
