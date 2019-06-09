import Vue from 'vue'
import Router from 'vue-router'
import About from '../components/general/About'
import Hub from '../components/general/home/Hub'
import Landing from '../components/general/Landing'
import Routes from '../components/routes/List'
import RouteDetails from '../components/routes/RouteDetails'
import ActivityDetails from '../components/activities/ActivityDetails'
import Admin from '../components/profile/admin/Admin'
import Dashboard from '../components/profile/user/Dashboard'
import Public from '../components/profile/Public'
import GetStarted from '../components/general/GetStarted'
import Feedback from '../components/general/Feedback'
import SignUp from '../components/profile/SignUp'
import LogIn from '../components/profile/LogIn'
import ConnectToStrava from '../components/general/home/ConnectToStrava'
import LeafletMap from '../components/map/LeafletMap'
import FullscreenMap from '../components/general/FullscreenRoute'
import Analytics from '../components/analytics/Analytics'
import Creator from '../components/routes/Creator'
import Questionnaire from '../components/profile/admin/Questionnaire'
import PostStudyQuestionnaire from '../components/profile/PostStudyQuestionnaire'

Vue.use(Router);

export default new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  base: process.env.ROUTER_ROOT,
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      meta: {title: 'ExploX'}
    },
    {
      path: '/hub',
      name: 'Hub',
      component: Hub,
      meta: {title: 'ExploX Hub'}

    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {title: 'About ExploX'}

    },
    {
      path: '/guide',
      name: 'GetStarted',
      component: GetStarted,
      meta: {title: 'Get Started'}
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback,
      meta: {title: 'ExploX Feedback'}
    },
    {
      path: '/routes',
      name: 'Routes',
      component: Routes,
      meta: {title: 'ExploX Routes'}
    },
    {
      path: '/route/:id',
      name: 'Route Details',
      component: RouteDetails,
      meta: {title: 'ExploX Route'}
    },
    {
      path: '/activity/:id',
      name: 'Activity Details',
      component: ActivityDetails,
      meta: {title: 'ExploX Activity'}
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: Admin,
      meta: {title: 'ExploX Dashboard'}
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {title: 'ExploX Dashboard'}
    },
    {
      path: '/users/:id',
      name: 'User Profile',
      component: Public,
      meta: {title: 'Strava Profile'}
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: {title: 'Sign Up to ExploX'}
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn,
      meta: {title: 'Log In to ExploX'}
    },
    {
      path: '/strava',
      name: 'Strava',
      component: ConnectToStrava,
      meta: {title: 'ExploX Strava'}
    },
    {
      path: '/map',
      name: 'LeafletMap',
      component: LeafletMap,
      meta: {title: 'ExploX Map'}
    },
    {
      path: '/fs',
      name: 'FullscreenMap',
      component: FullscreenMap,
      meta: {title: 'ExploX Map'}
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics,
      meta: {title: 'ExploX Analytics'}
    },
    {
      path: '/creator',
      name: 'Creator',
      component: Creator,
      meta: {title: 'ExploX Creator'}
    },
    {
      path: '/admin/dashboard/questionnaire',
      name: 'Questionnaire',
      component: Questionnaire,
      meta: {title: 'ExploX Questionnaire'}
    },
    {
      path: '/psq',
      name: 'PostStudyQuestionnaire',
      component: PostStudyQuestionnaire,
      meta: {title: 'ExploX Post Study Questionnaire'}
    },
  ]
})
