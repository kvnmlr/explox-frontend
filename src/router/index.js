import Vue from 'vue'
import Router from 'vue-router'
import About from '../components/general/About'
import Hub from '../components/general/home/Hub'
import Landing from '../components/general/Landing'
import Routes from '../components/routes/List'
import RouteDetails from '../components/routes/RouteDetails'
import Admin from '../components/profile/admin/Admin'
import Dashboard from '../components/profile/user/Dashboard'
import GetStarted from '../components/general/GetStarted'
import Feedback from '../components/general/Feedback'
import SignUp from '../components/profile/SignUp'
import LogIn from '../components/profile/LogIn'
import ConnectToStrava from '../components/general/home/ConnectToStrava'
import LeafletMap from '../components/map/LeafletMap'
import FullscreenMap from '../components/general/FullscreenRoute'
import Analytics from '../components/analytics/Analytics'
import Creator from '../components/routes/Creator'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.ROUTER_ROOT,
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
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/routes',
      name: 'Routes',
      component: Routes
    },
    {
      path: '/route/:id',
      name: 'Route Details',
      component: RouteDetails
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: Admin
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/strava',
      name: 'Strava',
      component: ConnectToStrava
    },
    {
      path: '/map',
      name: 'LeafletMap',
      component: LeafletMap
    },
    {
      path: '/fs',
      name: 'FullscreenMap',
      component: FullscreenMap
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics
    },
    {
      path: '/creator',
      name: 'Creator',
      component: Creator
    }
  ]
})
